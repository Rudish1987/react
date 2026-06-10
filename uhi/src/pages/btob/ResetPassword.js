import React, { useEffect } from 'react';
import { Typography, Box, Grid, Container, Button } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import TextField from '@mui/material/TextField';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikProvider, Form } from 'formik';
import { UpdatePassword } from '../../api/btob/ForgotAndResetPassApi';
import SnackbarComponent from '../../components/common/Snackbar';
import { LoadingButton } from '@mui/lab';
import { useLocale } from '../../context/LocaleContext';

export default function ResetPassword() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { locale } = useLocale();
	const PasswordSchema = Yup.object().shape({
		user_name: Yup.string().required(t('Username is required')),
		password: Yup.string().required(t('Password is required'))
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!+@#$%^&*()\-_"=+{}; :,<.>])[A-Za-z\d!+@#$%^&*()\-_"=+{}; :,<.>]{8,}$/,t('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.')),
		password_confirmation: Yup.string().required(t('Password Confirmation is required')).oneOf([Yup.ref('password'), null], t('Passwords must match')),
	});
	const [show, setshow] = React.useState(false);
	const [snackAlertOpen, setSnackAlertOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const searchParams = new URLSearchParams(window.location.search);
	const token = searchParams.get('_token');
	useEffect(() => {
		if(!token) {
			navigate('/');
		}
	},[]);
	const formik = useFormik({
		initialValues: {
			user_name: '',
			password: '',
			password_confirmation: '',
			token: token,
			remember: true
		},
		validateOnBlur: false,
		validationSchema: PasswordSchema,
		onSubmit: async (values) => {
			setLoading(isSubmitting);
			const getdata = await UpdatePassword(values);
			if (getdata.status) {
				setshow(true);
				window.history.pushState('', t('Reset Password'), '/reset-password#completed')
			} else {
				setSnackbarMessage(getdata.message);
				setSnackAlertOpen(true);
			}
			setLoading(false);
		}
	});
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
	const { isSubmitting, getFieldProps } = formik;
	return (
		<>
			<Box className="box-body-flex" paddingTop='32px'>
				<Container className="landingLogo body-container-margin" >
					<Grid container sm spacing={2} direction="column">
						<Grid item xs={12}>
							{snackAlertOpen && <SnackbarComponent open={snackAlertOpen} onClose={() => setSnackAlertOpen(false)} message={snackbarMessage} typeOfMessage='error' />}
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h3' color='grey.900'>
								{t('Reset password')}
								{closeBtn()}
							</Typography>
						</Grid>
						{!show &&
							<>
								<Grid item xs={12}>
									<Typography variant='body1' color='grey.900'>
										{t('Complete requested fields and you will receive a process success confirmation E-mail.')}
									</Typography>
								</Grid>
								<Grid container spacing={2} direction="column" sx={{my: 4}}>
									<FormikProvider value={formik}>
										<Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
											<Grid item xs={6} className="forgotpassword" sx={{mx: 'auto', my: 2}}>
												<TextField
													fullWidth
													type='text'
													label={t('Login ID')}
													name='user_name'
													{...getFieldProps('user_name')}
													variant='outlined'
													helperText={formik.touched.user_name && formik.errors.user_name}
													error={formik.touched.user_name && Boolean(formik.errors.user_name)}
												/>
											</Grid>
											<Grid item xs={6} className="forgotpassword" sx={{mx: 'auto', my: 2}}>
												<TextField
													fullWidth
													type='password'
													label={t('Password')}
													name='password'
													{...getFieldProps('password')}
													variant='outlined'
													helperText={formik.touched.password && formik.errors.password}
													error={formik.touched.password && Boolean(formik.errors.password)}
												/>
											</Grid>
											<Grid item xs={6} className="forgotpassword" sx={{mx: 'auto', my: 2}}>
												<TextField
													fullWidth
													type='password'
													label={t('Confirm Password')}
													name='password_confirmation'
													{...getFieldProps('password_confirmation')}
													variant='outlined'
													helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
													error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
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
						{show &&
							<>
								<Grid container spacing={2} direction="column" sx={{my: 4}}>
									<Grid item xs={6} className="forgotpassword" sx={{mx: 'auto', my: 2}}>
										<Typography variant='body1' color='grey.900' sx={{ alignItems: 'left!important' }}>
											{t('Your passwords was successfully processed. Please login with your new password.')}
										</Typography>
									</Grid>
									<Grid item xs={6} spacing={1} sx={{mx: 'auto', my: 2}}>
										<Button variant="contained" fullWidth size='large' type='submit' onClick={redirectToHomepage}>
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
