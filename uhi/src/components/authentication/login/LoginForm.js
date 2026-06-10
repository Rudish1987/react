import * as Yup from 'yup';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

import { useTranslation } from 'react-i18next'
// material
import {
	Link,
	Stack,
	Checkbox,
	TextField,
	IconButton,
	InputAdornment,
	FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function LoginForm() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

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
		onSubmit: () => {
			navigate('/dashboard', { replace: true });
		}
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

	const handleShowPassword = () => {
		setShowPassword((show) => !show);
	};

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<TextField
						className="validation-cls"
						fullWidth
						autoComplete="username"
						type="text"
						label={t('Username')}
						{...getFieldProps('username')}
						error={Boolean(touched.username && errors.username)}
						helperText={touched.username && errors.username}
					/>

					<TextField
						className="validation-cls"
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
						error={Boolean(touched.password && errors.password)}
						helperText={touched.password && errors.password}
					/>
				</Stack>

				<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
					<FormControlLabel
						control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
						label={t('Remember me')}
					/>

					<Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
					</Link>
				</Stack>

				<LoadingButton
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					loading={isSubmitting}
				>{t('Login')}</LoadingButton>
			</Form>
		</FormikProvider>
	);
}
