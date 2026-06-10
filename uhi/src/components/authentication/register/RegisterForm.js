import * as Yup from 'yup';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { RegisterApi } from '../../../api/RegisterApi'
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
	const { t } = useTranslation();
	const [showPassword, setShowPassword] = useState(false);

	const RegisterSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required(t('First name is required')),
		lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(t('Last name required')),
		email: Yup.string().email(t('Email must be a valid email address')).required(t('Email is required')),
		confirmemail: Yup.string()
			.email('Confirm Email must be a valid email address')
			.required('Confirm Email is required')
			.when('email', (email, schema) => {
				if (email != '') return schema.oneOf([Yup.ref('email')], 'Confirm Email must match with Email');
			}),
		username: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required(t('Username is required')),
		password: Yup.string().required(t('Password is required')),
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
			confirmemail: '',
			username: '',
			password: '',
			confirmpassword: ''
		},
		validationSchema: RegisterSchema,
		onSubmit: async (values) => {
			await RegisterApi(values)
		}
	});

	const { errors, touched, handleSubmit, getFieldProps } = formik;


	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
						<TextField
							fullWidth
							label={t('First name')}
							{...getFieldProps('firstName')}
							error={Boolean(touched.firstName && errors.firstName)}
							helperText={touched.firstName && errors.firstName}
						/>

						<TextField
							fullWidth
							label={t('Last name')}
							{...getFieldProps('lastName')}
							error={Boolean(touched.lastName && errors.lastName)}
							helperText={touched.lastName && errors.lastName}
						/>
					</Stack>

					<TextField
						fullWidth
						autoComplete="username"
						type="email"
						label="Email address"
						{...getFieldProps('email')}
						error={Boolean(touched.email && errors.email)}
						helperText={touched.email && errors.email}
					/>
					<TextField
						fullWidth
						type="email"
						label="Confirm Email address"
						{...getFieldProps('confirmemail')}
						error={Boolean(touched.confirmemail && errors.confirmemail)}
						helperText={touched.confirmemail && errors.confirmemail}
					/>
					<TextField
						fullWidth
						label="Username"
						{...getFieldProps('username')}
						error={Boolean(touched.username && errors.username)}
						helperText={touched.username && errors.username}
					/>
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
						error={Boolean(touched.password && errors.password)}
						helperText={touched.password && errors.password}
					/>
					<TextField
						fullWidth
						type='password'
						label="Confirm Password"
						{...getFieldProps('confirmpassword')}
						error={Boolean(touched.password && errors.confirmpassword)}
						helperText={touched.password && errors.confirmpassword}
					/>

					<LoadingButton
						fullWidth
						size="large"
						type="submit"
						variant="contained"

					>
            Register
					</LoadingButton>
				</Stack>
			</Form>
		</FormikProvider>
	);
}
