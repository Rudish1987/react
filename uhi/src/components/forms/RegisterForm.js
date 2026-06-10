import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material'
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useTranslation } from 'react-i18next';
import { RegisterApi } from '../../api/RegisterApi';
import { useNavigate } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import Country from '../../components/hotel/SearchForm/country';
import '../../css/registerForm.css';
import DeleteIteneraryButton from '../common/DeleteIteneraryButton'

const RegisterForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [registrationError, setRegistrationError] = useState('');
	const nationality = useStoreState(s => s.btoc.filters.nationality);

	const RegisterSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('First name is required'),
		lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
		email: Yup.string().email('Email must be a valid email address').required('Email is required'),
		country: Yup.object({
			Country_Code: Yup.string().required('Country is required'),
		}),
		mobile: Yup.string()
			.min(10, 'Too Short!')
			.max(10, 'Too long!')
			.required('Mobile number is required'),
		password: Yup.string().min(6, 'Too Short!').required('Password is required'),
		confirmpassword: Yup.string().required(t('Confirm Password is required'))
			.when('password', (password, schema) => {
				if (password != '') return schema.oneOf([Yup.ref('password')], 'Confirm password must match with Password');
			}),
	});

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			country: nationality,
			mobile: '',
			username: '',
			password: '',
			confirmpassword: ''
		},
		validationSchema: RegisterSchema,
		onSubmit: async (values) => {
			const getdata = await RegisterApi(values)
			if(getdata.token) {
				navigate('/package/confirmation/verification', { state: { token: getdata.token, uniqueOtpId: getdata.uniqueOtpId } })
			} else {
				setRegistrationError(getdata)
			}
		}
	});

	const { errors, touched, handleSubmit, getFieldProps } = formik;

	return (

		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Grid container direction='column' spacing={2}>
					<Grid item>
						<Typography variant="h5">{t('Hello, please register to confirm your booking')}</Typography>

						<Typography className="theme-font" variant="body">{t('Already have an account?')} </Typography>
						<Button onClick={() => {navigate('/package/confirmation/login')}} className="theme-font button-hover" color='primary'>{t('LOGIN')}</Button>
						{registrationError.length > 0 && <Typography variant='h6' color='primary'> {registrationError} </Typography>}
					</Grid>
					<Grid container item sm spacing={2} direction="row" sx={{mt:1}}>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item>
								<TextField
									fullWidth
									label={t('First Name')}
									{...getFieldProps('firstName')}
									helperText={t(touched.firstName && errors.firstName)}
								/>
							</Grid>

							<Grid item>
								<TextField
									fullWidth
									label={t('Last name')}
									{...getFieldProps('lastName')}
									helperText={t(touched.lastName && errors.lastName)}
								/>
							</Grid>

							<Grid item xs sm container direction="row" spacing={2}>
								<Grid item xs={6}>
									<Country
										value={formik.values.country}
										onChange={value => formik.setFieldValue('country', (value) ? value : '')}
										setLabel="Country"
										setStateValue={value => formik.setFieldValue('country', (value) ? value : '')}
									/>
									{formik.errors.country ? <Typography className='errorMsg'> {t(formik.errors.country.Country_Code)} </Typography> : ''}
								</Grid>

								<Grid item xs={6}>
									<TextField
										label={t('Mobile number')}
										fullWidth
										type='number'
										{...getFieldProps('mobile')}
										helperText={t(touched.mobile && errors.mobile)}
									/>
								</Grid>
							</Grid>

						</Grid>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item>
								<TextField
									fullWidth
									autoComplete="username"
									type={t('Email')}
									label={t('Email')}
									{...getFieldProps('email')}
									helperText={t(touched.email && errors.email)}
								/>
							</Grid>
							<Grid item>
								<TextField
									fullWidth
									autoComplete="current-password"
									type={showPassword ? 'text' : 'password'}
									label={t('Password')}
									{...getFieldProps('password')}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
													<Icon icon={showPassword ? eyeFill : eyeOffFill} />
												</IconButton>
											</InputAdornment>
										)
									}}
									helperText={t(touched.password && errors.password)}
								/>
							</Grid>

							<Grid item>
								<TextField
									fullWidth
									type='password'
									label={t('Repeat Password')}
									{...getFieldProps('confirmpassword')}
									helperText={t(touched.password && errors.confirmpassword)}
								/>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs sm container direction="row" spacing={2} justifyContent='end'>
						<Grid item>
							<DeleteIteneraryButton></DeleteIteneraryButton>
						</Grid>
						<Grid item>
							<Button variant="contained" size='large' type='submit'>{t('Register')}</Button>
						</Grid>
					</Grid>
				</Grid>
			</Form>
		</FormikProvider>
	)
}

export default RegisterForm
