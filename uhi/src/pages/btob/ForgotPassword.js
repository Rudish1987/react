import React, { useState } from 'react';
import { Typography, Box, Grid, Container, Button } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import TextField from '@mui/material/TextField';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';
import { ForgotPasswordApi } from '../../api/btob/ForgotAndResetPassApi';
import SnackbarComponent from '../../components/common/Snackbar'
import { LoadingButton } from '@mui/lab'
import { useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext';

export default function ForgotPassword() {


	const [success, setSuccess] = useState(false)
	const [snackAlertOpen, setSnackAlertOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [loading, setLoading] = useState(false)
	const isWhiteLabel = useStoreState(s => s.whitelabel.isWhiteLabel)

	const { t } = useTranslation();
	const navigate = useNavigate();
	const { locale } = useLocale();

	const CustomerSchema = Yup.object().shape({
		loginId: Yup.string().required(t('Login ID is required'))
	})

	const formik = useFormik({
		initialValues: {
			loginId: '',
			remember: true
		},
		validateOnBlur: false,
		validationSchema: CustomerSchema,
		onSubmit: async (values) => {
			setLoading(isSubmitting)
			const getdata = await ForgotPasswordApi(values.loginId, isWhiteLabel)

			if (getdata.status == false) {
				setSnackAlertOpen(true)
				setSnackbarMessage(getdata.message)
			}
			else {
				if (getdata.data.messageId != 0) {
					setSuccess(true)
					setSnackAlertOpen(false)
					setSnackbarMessage('')
					window.history.pushState('', t('Forgot Password'), '/forgot-password#completed')//append completed text to url
				} else {
					setSnackAlertOpen(true)
					setSnackbarMessage(getdata.message)
				}
			}
			setLoading(false)
		}
	})
	const redirectToHomepage = () => {
		navigate('/');
	}

	const closeBtn = () => {
		return (<>
			<Grid sx={{ ...(locale.value === 'ar' && { float: 'left' }), ...(locale.value === 'en' && { float: 'right' }), marginTop: '14px' }}>
				<Button variant='text' onClick={redirectToHomepage} sx={{ color: 'grey.900', position: { xs: 'relative' }, bottom: { xs: '23px', lg: '7px' }, ...(locale.value === 'ar' && { position: { xs: 'relative' }, bottom: { xs: '23px', lg: '18px' } }) }}>
					<CloseIcon />
				</Button>
			</Grid>
		</>);
	}

	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik

	return (
		<>
			<Box className="box-body-flex">
				<Container className="landingLogo body-container-margin paddingTop40 paddingBottom40">
					<Grid container sm spacing={2} direction="column">
						<Grid item xs={12}>
							{snackAlertOpen && <SnackbarComponent open={snackAlertOpen} onClose={() => setSnackAlertOpen(false)} message={snackbarMessage} typeOfMessage='error' />}
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h3' color='grey.900'>
								{t('Forgot password')}
								{closeBtn()}
							</Typography>
						</Grid>
						{!success &&
							<>
								<Grid item xs={12}>
									<Typography variant='body1' color='grey.900'>
										{t('Provide your Login ID and you will get instruction in your E-mail to reset your password.')}
									</Typography>
								</Grid>
								<Grid container spacing={2} direction="column" sx={{my: 4}}>
									<FormikProvider value={formik}>
										<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
											<Grid item xs={6} className="forgotpassword" sx={{mx: 'auto', my: 2}}>
												<TextField
													variant="outlined"
													fullWidth
													type='text'
													label={t('LOGIN ID')}
													{...getFieldProps('loginId')}
													helperText={touched.loginId && errors.loginId}
													error={formik.touched.loginId && Boolean(formik.errors.loginId)}
												/>
											</Grid>
											<Grid item xs={6} spacing={1} sx={{mx: 'auto', my: 2}}>
												<LoadingButton variant="contained" fullWidth size='large' type='submit' endIcon={<ArrowForwardOutlinedIcon />} loading={loading} loadingPosition="end">
													{t('Send')}
												</LoadingButton>
											</Grid>
										</Form>
									</FormikProvider>
								</Grid>
							</>
						}
						{success &&
							<>
								<Grid container spacing={2} direction="column" sx={{my: 4}}>
									<Grid item xs={6} className="forgotpassword" sx={{mx: 'auto', my: 2}}>
										<Typography variant='body1' color='grey.900' sx={{ alignItems: 'left!important' }}>
											{t('Reset password request was successfully processed. Please check your email inbox for further instruction')}
										</Typography>
									</Grid>
									<Grid item xs={6} spacing={1} sx={{mx: 'auto', my: 2}}>
										<Button variant="contained" fullWidth onClick={redirectToHomepage} size='large' type='submit'>
											<CloseIcon />{t('Close')}
										</Button>
									</Grid>
								</Grid>
							</>
						}
					</Grid>
				</Container>
			</Box>
		</>
	);
}
