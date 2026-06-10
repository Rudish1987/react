import React, { useState, useEffect } from 'react';
// import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useFormik, FormikProvider, Form } from 'formik';
import { Button, Typography, Box, Container, Grid } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import StepperJoinUs from '../../components/b2b/includes/StepperJoinUs';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import FirstForm from '../../components/b2b/joinUsStepper/FirstForm';
import SecondForm from '../../components/b2b/joinUsStepper/SecondForm';
import ThirdForm from '../../components/b2b/joinUsStepper/ThirdForm';
import { joinUsData } from '../../api/btob/JoinUs';
import { CustomerTypeApi } from '../../api/btob/Customer';/* This is the api tahat will receive customer payment type */
import SnackbarComponent from '../../components/common/Snackbar';
import Constants from '../../helpers/constants';
import { LoadingButton } from '@mui/lab'

function MultiStepForm() {

	const { headOfficeId } = useParams();

	const [activeStep, setActiveStep] = useState(0);
	const [showSuccess, setShowSuccess] = useState(false);
	const [reCaptchaResponse, setReCaptchaResponse] = useState('')

	const verifyCallback = function (response) {
		setReCaptchaResponse(response);
	};
	const [snackAlertOpen, setSnackAlertOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [typeOfMessage, settypeOfMessage] = React.useState('');

	const [defaultPaymentType, setPaymentType] = React.useState(Constants.CUSTOMER_PAYMENT_TYPE_CREDIT_CARD);
	const containerRef = React.useRef(null);

	const [loading, setLoading] = useState(false)

	let navigate = useNavigate();
	const { t } = useTranslation();
	const redirectToHomepage = () => {
		navigate('/');
	}

	const country = {
		Country_Code: '',
		Country_Name: '',
		Tel_Country_Code: '',
		ShortCountryName: '',
		Country_Name_AR: '',
	};

	const city = {
		CityCode: '',
		CityName: '',
		CityShortCode: ''
	};

	let headId = headOfficeId;
	if (!headId) {
		headId = '';
	}
	useEffect(() => {
		if (headId != '') {
			CustomerTypeApi(headId).then((res) => {
				if (res.status === true && res.data.customer != null) {
					setPaymentType(res.data.customer.paymentType);
				}
			});
		}

	}, [])

	let JoinUsSchema = [
		Yup.object().shape({
			companyName: Yup.string().required(t('This field is required!')),
			companyAddress: Yup.string().required(t('This field is required!')),
			companyZipCode: Yup.string().required(t('This field is required!')),
			companyCountry: Yup.object({ Country_Code: Yup.string().required(t('This field is required!')) }),
			companyCity: Yup.object().shape({ CityCode: Yup.string().required(t('This field is required!')) }),
			Tel: Yup.string().matches(/^\d+$/, { message: t('This field must be a number.'), excludeEmptyString: false }).required(t('This field is required!')),
		}),
		Yup.object().shape({
			title: Yup.string().required(t('This field is required!')),
			firstName: Yup.string().required(t('This field is required!')),
			lastName: Yup.string().required(t('This field is required!')),
			emailAddress: Yup.string().email(t('Email Address must be a valid email address.')).required(t('This field is required!')),
			emailAddress_confirmation: Yup.string().email(t('Email Address must be a valid email address.')).required(t('This field is required!')).oneOf([Yup.ref('emailAddress'), null], t('Email Confirmation must the same as Email Address.')),
		}),
		Yup.object().shape({
			loginId: Yup.string().required(t('This field is required!')),
			password: Yup.string().required(t('This field is required!')).matches(/\w*[a-z]\w*/, t('Password must have a small letter'))
				.matches(/\w*[A-Z]\w*/, t('Password must have a capital letter'))
				.matches(/\d/, t('Password must have a number'))
				.matches(/[!+@#$%^&*()\-_"=+{}; :,<.>]/, t('Password must have a special character'))
				.min(8, t('Password must be at least 8 characters')),
			password_confirmation: Yup.string().required(t('This field is required!')).oneOf([Yup.ref('password'), null], t('Password Confirmation must be the same as Password.')),
			TermsOfUse: Yup.boolean().oneOf([true], t('Please accept the Terms of use to continue with the registration.')),
			ReCapcha: Yup.string().required(t('This field is required!')),
		})
	]

	const formik = useFormik({
		initialValues: {
			companyAddress: '',
			companyName: '',
			companyZipCode: '',
			companyCountry: country,
			companyCity: city,
			Tel: '',
			maqamIban: '',
			title: '',
			firstName: '',
			lastName: '',
			emailAddress: '',
			emailAddress_confirmation: '',
			loginId: '',
			password: '',
			password_confirmation: '',
			terms_confirmation: '1',
			grossCommissionType: Constants.GROSS_COMMISSION_TYPE,
			invoiceOn: 'gross',
			grossCommissionValue: Constants.GROSS_COMMISSION_VALUE,
			CFDEmail: '',
			directDebit: Constants.DIRECT_DEBIT,
			VATRegNo: '',
			paymentType: defaultPaymentType,
			currencyCreditCard: Constants.CURRENCY_CREDIT_CARD,
			currencyCreditGross: Constants.CURRENCY_CREDIT_GROSS,
			PrefTel: '',
			headofficeId: headId,
			TermsOfUse: false,
			ReCapcha: '',
		},
		validateOnBlur: false,
		validationSchema: JoinUsSchema[activeStep],
		onSubmit: async (values, { setSubmitting, setTouched }) => {
			setLoading(true);
			if (activeStep == steps.length - 1 && reCaptchaResponse !== '') {
				const getdata = await joinUsData(values);
				if (getdata.status) {
					setShowSuccess(true);
					if (headId) {
						window.history.pushState('', t('join-us'), `/join-us/${headId}#completed`);
					} else {
						window.history.pushState('', t('join-us'), '/join-us#completed');
					}
					setActiveStep((prevStep) => prevStep + 1);
				} else {
					setSnackbarMessage(getdata.message);
					setSnackAlertOpen(true);
					settypeOfMessage('error');
				}
			}
			else {
				if (activeStep == steps.length - 3) {
					if (headId) {
						window.history.pushState('', t('join-us'), `/join-us/${headId}#Contact-Person`);
					} else {
						window.history.pushState('', t('join-us'), '/join-us#Contact-Person');
					}
				} else if (activeStep == steps.length - 2) {
					if (headId) {
						window.history.pushState('', t('join-us'), `/join-us/${headId}#login-details`);
					} else {
						window.history.pushState('', t('join-us'), '/join-us#login-details');
					}
				}
				setActiveStep((prevStep) => prevStep + 1);
			}
			setLoading(false);
			setSubmitting(false);
			setTouched({})
		},
		enableReinitialize: true,
	});

	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik

	const closeBtn = () => {
		return (<>
			<Grid sx={{ float: 'right', marginTop: '14px' }}>
				<Button variant='text' onClick={redirectToHomepage} sx={{ color: 'grey.900' }}>
					<CloseIcon />
				</Button>
			</Grid>
		</>);
	}

	const handleBack = () => {
		if (activeStep == steps.length - 2) {
			if (headId) {
				window.history.pushState('', t('join-us'), `/join-us/${headId}#Company-Info`);
			} else {
				window.history.pushState('', t('join-us'), '/join-us#Company-Info');
			}
		} else if (activeStep == steps.length - 1) {
			if (headId) {
				window.history.pushState('', t('join-us'), `/join-us/${headId}#Contact-Person`);
			} else {
				window.history.pushState('', t('join-us'), '/join-us#Contact-Person');
			}
			formik.setFieldValue('TermsOfUse', false)
			formik.setFieldValue('ReCapcha', '')
		}
		setActiveStep((prevStep) => prevStep - 1);
	};

	const steps = ['Step 1', 'Step 2', 'Step 3'];

	const getStepContent = (step, errors, getFieldProps, touched, formik) => {
		switch (step) {
		case 0:
			return (
				<FirstForm
					errors={errors}
					getFieldProps={getFieldProps}
					touched={touched}
					formik={formik}
					city={city}
				/>
			);
		case 1:
			return (
				<SecondForm
					errors={errors}
					getFieldProps={getFieldProps}
					touched={touched}
					formik={formik}
				/>
			);
		case 2:
			return (
				<ThirdForm
					errors={errors}
					verifyCallback={verifyCallback}
					getFieldProps={getFieldProps}
					touched={touched}
					formik={formik}
				/>
			);
		default:
			return 'Unknown step';
		}

	};

	return (
		<>
			<Box className="box-body-flex" paddingTop='32px'>
				<Container className="landingLogo body-container-margin" ref={containerRef} >
					<Grid container>
						<Grid item xs={10}>
							<Typography variant='h3' color='grey.900'>
								{t('Join us')}
							</Typography>
						</Grid>
						<Grid item xs={2} sx={{
							position: 'relative', bottom: { xs: '27px', lg: '7px' }, right: { xs: '13px', lg: '0px' }
						}}>
							<Typography variant='h3' color='grey.900'>
								{closeBtn()}
							</Typography>
						</Grid>
					</Grid>

					{!showSuccess ? (
						<Typography variant='body1' color='grey.900' sx={{ marginBottom: '32px' }}>
							{t('Partner UHI travel and access exclusive travel deals. Fill registration form now!.')}
						</Typography>) : (<Typography variant='body1' color='grey.900' sx={{ marginBottom: '32px' }}>
						{t('Thank you for submitting your membership request!.')}
					</Typography>
					)}

					<FormikProvider value={formik}>
						<Form id="form-step" autoComplete="off" noValidate onSubmit={handleSubmit} className="Joinformwidth">
							<Grid item xs={12}>
								{snackAlertOpen && <SnackbarComponent open={snackAlertOpen} onClose={() => setSnackAlertOpen(false)} message={snackbarMessage} typeOfMessage={typeOfMessage} />}
							</Grid>

							<Grid item md={8} xs={12} className="stepperfield">
								<StepperJoinUs activeStep={activeStep} />
							</Grid>

							{!showSuccess && (
								<>
									<Grid className="joinus" container sx={{ paddingTop: '32px', paddingBottom: '32px' }}>
										<Grid item md={2} xs={12}></Grid>
										<Grid item md={8} xs={12}>
											<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
												{getStepContent(activeStep, errors, getFieldProps, touched, formik)}

												<Grid item md={12} xs={12} textAlign="center" >
													{activeStep !== 0 && (
														<Grid item xs={12} display='inline-block' marginRight="16%">
															<Button onClick={handleBack} size='large'>
																{t('Back')}
															</Button>
														</Grid>
													)}

													{activeStep < steps.length - 1 && (
														<Grid item xs={12} display='inline-block'>
															<LoadingButton
																variant="contained"
																fullWidth
																size='large'
																sx={{ width: { xs: 150, lg: 190 } }}
																type='submit'
																endIcon={<ArrowForwardOutlinedIcon />}
																loading={loading}
																disabled={isSubmitting}
															>
																{t('Continue')}
															</LoadingButton>
														</Grid>
													)}

													{activeStep === steps.length - 1 && (
														<Grid item xs={12} display='inline-block'>
															<Button
																type="submit"
																size='large'
																variant="contained"
																sx={{ width: { xs: 150, lg: 190 } }}
																disabled={isSubmitting}
															>
																{t('Register')}
															</Button>
														</Grid>
													)}
												</Grid>
											</Grid>
										</Grid>
										<Grid item md={2} xs={12}></Grid>
									</Grid>
								</>
							)}
						</Form>
					</FormikProvider>
					{showSuccess && (
						<Grid container display='block' textAlign='center' sx={{ marginLeft: { xs: '-19px' } }} padding={4}>
							<Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
								<Typography variant='body1' sx={{ width: 413, height: 135, textAlign: 'justify' }} color='grey.900'>
									{t('We appreciate your interest in join UHI. You will receive a E-mail notification as soon as your account is activated.Welcome aboard and happy travels!.')}
								</Typography>
							</Grid>
							<Grid item >
								<Button variant="contained" size='large' sx={{ width: { xs: 330, lg: 413 } }} onClick={redirectToHomepage}>
									<CloseIcon />{t('Close')}</Button>
							</Grid>
						</Grid>
					)}
				</Container>

			</Box>

		</>

	);

}

export default MultiStepForm;