import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useTranslation } from 'react-i18next';
import { LoginApi } from '../../api/AuthApi';
import DeleteIteneraryButton from '../common/DeleteIteneraryButton';
// material
import {
	Typography,
	Grid,
	Stack,
	TextField,
	IconButton,
	InputAdornment,
	Button
} from '@mui/material';
import '../../css/registerForm.css';
import { LoadingButton } from '@mui/lab';
import Constants from '../../helpers/constants'
import { useLogin } from '../../context/authHook'

// ----------------------------------------------------------------------

export default function LoginForm() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { login } = useLogin();
	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState('');
	const [loading, setLoading] = useState(false)


	const LoginSchema = Yup.object().shape({
		username: Yup.string().required(t('Username is required')),
		password: Yup.string().required(t('Password is required'))
	});

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
			remember: true
		},
		validationSchema: LoginSchema,
		onSubmit: async (values) => {
			setLoading(isSubmitting)
			const getdata = await LoginApi(values)
			if (getdata.token) {
				const updatedUser = await login(getdata)
				if (updatedUser) {
					navigate(Constants.USER_PASSENGER_URL)
				} else {
					navigate('/')
				}
			} else {
				setLoginError(getdata)
				setLoading(false)
			}
		}
	});

	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

	const handleShowPassword = () => {
		setShowPassword((show) => !show);
	};

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Grid container direction='column' spacing={3}>
					<Grid item>
						<Typography variant="h5">{t('Welcome back! Please login to confirm your booking')}</Typography>
						{/* <Typography className="theme-font" variant="body">{t('I dont have an account? ')} </Typography>
						<Button onClick={() => { navigate('/package/confirmation/register') }} className="theme-font button-hover" color='primary'>{t('REGISTER')}</Button> */}
						{loginError.length > 0 && <Typography variant='h6' color='primary'> {loginError} </Typography>}
					</Grid>
					<Grid container item sm spacing={2} direction="row" sx={{ mt: 1 }}>
						<Grid item xs={6} container direction="row" spacing={1}>
							<TextField
								fullWidth
								autoComplete="username"
								type="text"
								label={t('Login')}
								{...getFieldProps('username')}
								helperText={touched.username && errors.username}
								className="validation-cls"
							/>

						</Grid>
						<Grid item xs={6} container direction="row" spacing={1}>
							<TextField
								fullWidth
								autoComplete="current-password"
								type={showPassword ? 'text' : 'password'}
								label={t('Password')}
								{...getFieldProps('password')}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={handleShowPassword} edge="end">
												<Icon icon={showPassword ? eyeFill : eyeOffFill} />
											</IconButton>
										</InputAdornment>
									)
								}}
								helperText={touched.password && errors.password}
								className="validation-cls"
							/>
						</Grid>
						<Button onClick={() => {navigate('/package/reset-password')}} className="forgotPasswordalign" color='primary'>{t('I forgot my password')}</Button>
					</Grid>
					
					<Grid item xs sm container direction="row" spacing={2} justifyContent='end'>
						<Grid item>
							<DeleteIteneraryButton></DeleteIteneraryButton>
						</Grid>
						<Grid item>
							<LoadingButton
								fullWidth
								size="large"
								type="submit"
								variant="contained"
								loading={loading}
								loadingIndicator={t('Login..')}
							>
								{t('Login')}
							</LoadingButton>
						</Grid>
					</Grid>
				</Grid>

				<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

				</Stack>
			</Form>
		</FormikProvider>
	);
}
