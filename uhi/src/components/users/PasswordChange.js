import React, { useState } from 'react'
import { Grid, Button, TextField, IconButton, InputAdornment, Link, Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import '../../css/PasswordChange.css';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';
import { useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordApi, ForgotPasswordApi } from '../../api/User'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const PasswordChange = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const user = useStoreState(s => s.user);
	const email = user.user.Login;
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);

	const handleClick = async () => {
		const getdata = await ForgotPasswordApi(email)
		if (getdata) {
			navigate('/users/forgot-password', { state: { unique_id: getdata.uniqueOtpId } })
		}
	};

	const handleShowCurrentPassword = () => {
		setShowCurrentPassword((show) => !show);
	};

	const handleShowNewPassword = () => {
		setShowNewPassword((show) => !show);
	};
	const handleShowRepeatNewPassword = () => {
		setShowRepeatNewPassword((show) => !show);
	};

	const PasswordSchema = Yup.object().shape({
		currentPassword: Yup.string().required('Current Password is required'),
		newPassword: Yup.string().min(6, 'Too Short!').required(t('New Password is required')),
		repeatNewPassword: Yup.string().required('Repeat new Password is required').when('newPassword', (newPassword, schema) => { if (newPassword != '') return schema.oneOf([Yup.ref('newPassword')], 'Confirm password must match with Password'); }),
	});

	const formik = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			repeatNewPassword: '',
			remember: true
		},
		validationSchema: PasswordSchema,
		onSubmit: async (values) => {
			const getdata = await ChangePasswordApi(values)
			if (getdata.length === 0) {
				alert('password changed successfully');
				navigate('/users/profile');
			}

		}
	});

	const breadcrumbs = [
		<Link underline="hover" key="1" className='breadcrums-link' href="#">
			{t('Profile')}
		</Link>,

		<Typography key="3" className='breadcrums-link-active'>
			{t('Change Your Password')}
		</Typography>,
	];

	const { errors, touched, handleSubmit, getFieldProps } = formik;

	return (
		<>
			<Box sx={{ backgroundColor: '#FFFFFF', p: 0 }}>
				{/* <Typography className="page-Header-text">{t('Profile')} <NavigateNextIcon fontSize="small" /> {t('Change your password')}</Typography> */}
				<Grid className="breadcrums-sec" spacing={2}>
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize="small" />}
						aria-label="breadcrumb"
					>
						{breadcrumbs}
					</Breadcrumbs>

				</Grid>
				<FormikProvider value={formik}>
					<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
						<Grid container item sm spacing={2} direction="column" alignItems='center'>
							<Grid className='currentPassword' item xs container direction="row" spacing={1}>
								<TextField
									className="validation-cls"
									fullWidth
									autoComplete="current-password"
									type={showCurrentPassword ? 'text' : 'password'}
									label={t('Current Password')}
									InputLabelProps={{ shrink: true }}
									{...getFieldProps('currentPassword')}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={handleShowCurrentPassword} edge="end">
													<Icon icon={showCurrentPassword ? eyeFill : eyeOffFill} />
												</IconButton>
											</InputAdornment>
										)
									}}
									helperText={t(touched.currentPassword && errors.currentPassword)}
								/>
							</Grid>
							<Grid className='password' item xs container direction="row" spacing={1}>
								<TextField
									className="validation-cls"
									fullWidth
									autoComplete="current-password"
									type={showNewPassword ? 'text' : 'password'}
									label={t('New Password')}
									InputLabelProps={{ shrink: true }}
									{...getFieldProps('newPassword')}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={handleShowNewPassword} edge="end">
													<Icon icon={showNewPassword ? eyeFill : eyeOffFill} />
												</IconButton>
											</InputAdornment>
										)
									}}
									helperText={touched.newPassword && errors.newPassword}
								/>
							</Grid>
							<Grid className='reenterpassword' item xs container direction="row" spacing={1}>
								<TextField
									className="validation-cls"
									fullWidth
									autoComplete="current-password"
									type={showRepeatNewPassword ? 'text' : 'password'}
									label={t('Repeat New Password')}
									InputLabelProps={{ shrink: true }}
									{...getFieldProps('repeatNewPassword')}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={handleShowRepeatNewPassword} edge="end">
													<Icon icon={showRepeatNewPassword ? eyeFill : eyeOffFill} />
												</IconButton>
											</InputAdornment>
										)
									}}
									helperText={t(touched.repeatNewPassword && errors.repeatNewPassword)}
								/>
							</Grid>
						</Grid>
						<Grid item xs sm container direction='row' spacing={2}>
							<Grid item sx={{ position: 'relative', left: '55%' }}>
								<Link className='forgotPassword' onClick={handleClick}>{t('I forgot my password')}</Link>
							</Grid>
						</Grid>
						<Grid className='buttons' item xs sm container direction='row' justifyContent='center' spacing={2}>
							<Grid item>
								<Button className='cancelButton' onClick={() => { navigate('/users/profile') }} variant="outlined">{t('CANCEL')}</Button>
							</Grid>
							<Grid item>
								<Button className='changeButton' type='submit' variant='contained'>{t('CHANGE')}</Button>
							</Grid>
						</Grid >
					</Form>
				</FormikProvider>
			</Box>
		</>
	)
}

export default PasswordChange
