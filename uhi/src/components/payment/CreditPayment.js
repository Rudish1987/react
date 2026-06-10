import React, { useState, useEffect } from 'react';
import { Typography, Grid, Checkbox, Button } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import TermsandConditions from '../visa/TermsandConditions'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useNavigate } from 'react-router-dom';
import { useConfirmBooking } from '../../context/payment/hooks';
import Constants from '../../helpers/constants'
import { useLocale } from '../../context/LocaleContext';

export default function CreditPayment({ visaTotalFee, goBackToTravelerList, onApiError }) {
	const { t } = useTranslation();
	const navigate = useNavigate()
	const { locale } = useLocale();
	const [openModal, setTandCModal] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const { getConfirmBooking } = useConfirmBooking();

	const [buttonDisabled, setButtonDisabled] = React.useState(false);
	const loggedinUser = useStoreState(s => s.user)
	const conversionRate = useStoreState(s => s.btob.visa.conversionRate);
	const itineraryDetails = useStoreState(s => s.btob.visa.itineraryDetails)
	const setConfirmMsg = useStoreActions(actions => actions.btob.visa.setConfirmMsg)

	useEffect(() => {
		const checkCreditLimit = () => {
			if (conversionRate == 0 && loggedinUser.isCLApplicable == true) {
				onApiError(t('Currency conversion number is not valid'));
				setButtonDisabled(true);
				return;
			} else {
				setButtonDisabled(false);
			}
		}
		checkCreditLimit();
	}, [conversionRate]);

	let availableCreditLimit = (Number(loggedinUser.user.credit_limit.AvailableCredit) * Number(conversionRate)).toFixed(2);
	const visaTotalFeeDecimal = visaTotalFee.toFixed(2);
	const handleOpen = () => {
		setTandCModal(true)
	}
	const handleModalClose = () => {
		setTandCModal(false)
	}

	const RegisterSchema = Yup.object().shape({
		termsAndConditions: Yup.boolean().oneOf([true], t('You must accept the terms and conditions'))
	})
	const formik = useFormik({
		initialValues: {
			termsAndConditions: false
		},
		validationSchema: RegisterSchema,
		onSubmit: async () => {
			setIsLoading(isSubmitting);
			let requestData = {
				'itineraryId': 0,
				'bookedItnNumber': 0
			}
			if (Object.keys(itineraryDetails).length > 0) {
				if (itineraryDetails.type == Constants.VISA_SAFA_STATUS_SAVE) {
					requestData.itineraryId = itineraryDetails.itineraryId
				}
				if (itineraryDetails.type == Constants.VISA_SAFA_STATUS_BOTH) {
					requestData.itineraryId = itineraryDetails.saveParentId
					requestData.bookedItnNumber = itineraryDetails.itineraryId
				}
			}

			const responseData = await getConfirmBooking(requestData);
			if (responseData.status) {
				let resp = {
					'status': responseData.status,
					'description': responseData.message,
					'type': 'success'
				}
				setConfirmMsg(resp)
				if (responseData.data.package && responseData.data.package.type == Constants.VISA_SAFA_STATUS_BOTH) {
					responseData.data.package.displayType = Constants.VISA_SAFA_STATUS_SAVE
				} else {
					responseData.data.package.displayType = responseData.data.package.type
				}
				navigate('/visa/traveler-list/' + responseData.data.returnedCode, { state: { itineraryDetails: responseData.data.package } });
			} else {
				onApiError(t(responseData.message))
				setIsLoading(false);
			}
		}
	});

	const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

	return (
		<>
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit} id="creditPaymentForm">
					<Typography variant='h6' color='grey.900'>
						{t('Payment Details')}
					</Typography>
					<Typography variant='body2' color='grey.900'>
						{t('The Amount of ')} {visaTotalFeeDecimal} SAR {t('will be deducted from your available credit and invoiced to your Account')}:
					</Typography>
					<Grid container className="margin-20">
						{loggedinUser.isCLApplicable == true &&<><Grid item xs={5}><Typography variant='body2' color='grey.900'>{t('Available Credit Balance')}:</Typography></Grid>
							<Grid item xs={3} textAlign='right'><Typography variant='body2' color='grey.900'>{Number(conversionRate) > 0 ? availableCreditLimit : 0} SAR</Typography></Grid>
							<Grid item xs={5} className="margin-5"><Typography variant='body2' color='grey.900'>{t('Payment')}:</Typography></Grid>
							<Grid item xs={3} textAlign='right'><Typography variant='body2' color='grey.900'>{Number(conversionRate) > 0 ? visaTotalFeeDecimal : 0} SAR</Typography></Grid>
							<Grid item xs={8} className="margin-5">
								<Divider color='grey.900' />
							</Grid>
							<Grid item xs={5}><Typography variant='body2' color='grey.900' fontWeight='600'>{t('Remaining Credit After Payment')}:</Typography></Grid>
							<Grid item xs={3} textAlign='right'><Typography variant='body2' color='grey.900' fontWeight='600'>{Number(conversionRate) > 0 ? availableCreditLimit - visaTotalFeeDecimal : 0} SAR</Typography></Grid>
						</>}
						<Grid item xs={12} sx={{ marginTop: '20px' }}>
							<Typography variant='body2' color='grey.900'><Checkbox sx={{ paddingLeft: '0px' }} {...getFieldProps('termsAndConditions')}
								className={'form-check-input ' + (errors.termsAndConditions && touched.termsAndConditions ? ' is-invalid' : '')} />{t('I have read and accept the booking')} <Button onClick={handleOpen} variant='text'>{t('Terms and Conditions')}</Button></Typography>
							{errors.termsAndConditions && <Typography paragraph={true}>{errors.termsAndConditions}</Typography>}
						</Grid>
					</Grid>
					<Grid container spacing={2} paddingTop='20px'>
						<Grid sm={12} xs={12} item display='flex' justifyContent='right'>
							<Button
								variant="outlinedSecondary"
								size='large'
								sx={{ marginRight: '20px', width: { xs: 220, lg: 200 } }}
								onClick={goBackToTravelerList}
								disabled={isLoading}
							>
								{t('Cancel')}
							</Button>
							<LoadingButton
								type='submit'
								size='large'
								variant="contained"
								endIcon={<ArrowForwardOutlinedIcon sx={{
									...(locale.value === 'ar' && {
										marginRight: '5px'
									})
								}} />}
								loading={isLoading}
								loadingPosition="end"
								disabled={buttonDisabled}
								sx={{
									...(locale.value === 'ar' && {
										marginRight: '20px'
									})
								}}
							>
								<span>{t('Confirm Payment')}</span>
							</LoadingButton>
						</Grid>
					</Grid>
				</Form>
			</FormikProvider>
			<TermsandConditions openModal={openModal} handleModalClose={handleModalClose}></TermsandConditions>
		</>
	);
}