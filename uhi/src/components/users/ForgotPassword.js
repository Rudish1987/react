import React,{useState,useEffect} from 'react'
import {Grid,Button,TextField,IconButton,InputAdornment,Typography,Link,Box} from '@mui/material'
import { useTranslation } from 'react-i18next';
import '../../css/PasswordChange.css';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import OtpInput from '../common/OtpInput';
import { useFormik,FormikProvider,Form } from 'formik';
import * as Yup from 'yup';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { StepperHeader } from '../CommonHeaders/StepperHeader';
import Constants from '../../helpers/constants'
import { useLocation, useNavigate} from 'react-router-dom';
import { Summary } from '../CommonHeaders/Summary';
import { PackageItemsListForLogin } from '../myPackage/PackageItemsListForLogin';
import {ResetPasswordApi} from '../../api/User';
import { resendOtpApi } from '../../api/OtpApi';
import { LogoutApi } from '../../api/AuthApi';

const ForgotPassword = () => {
	const {t} = useTranslation();
	const navigate = useNavigate();
	const currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)
	const totalItineraryAmount = useStoreState(s => s.btoc.itineraryDetails.itineraryAmount)
	const isAuth = useStoreState(s => s.isAuth);
	const user = useStoreState(s => s.user);
	const { state } = useLocation();
	const { unique_id } = state;
	const {userName}=state;
	const [verificationOtp, setVerificationOtp] = React.useState('');
	const [verificationMsg, setVerificationMsg] = React.useState('');
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
	const [uniqueOtp, setUniqueOtp] = React.useState(unique_id);
	const setUser = useStoreActions(s => s.btoc.setUser);

	useEffect(() => {
		if(isAuth) setEmail(user.user.Email);
		else setEmail(userName.userName);
	}, [])

	const handleVerficationOtp = (otp) => {
		setVerificationOtp(otp.join(''))
	}

	const handleShowNewPassword = () => {
		setShowNewPassword((show) => !show);
	};

	const handleShowRepeatNewPassword = () => {
		setShowRepeatNewPassword((show) => !show);
	};

	const handleResendCode = async () => {
		const requestResendOtp = {
			'uniqueId': uniqueOtp,
		}
		const getdata = await resendOtpApi(requestResendOtp)
		if(getdata.uniqueOtpId) {
			setUniqueOtp(getdata.uniqueOtpId)
			setVerificationMsg('OTP send successfully')
		} else {
			setVerificationMsg(getdata)
		}
	}

	const PasswordSchema = Yup.object().shape({
		newPassword: Yup.string().min(6, 'Too Short!').required(t('New Password is required')),
		repeatNewPassword: Yup.string().required('Repeat new Password is required').when('newPassword', (newPassword, schema) => {if (newPassword != '') return schema.oneOf([Yup.ref('newPassword')], 'Confirm password must match with Password');}),
	});

	const formik = useFormik({
		initialValues: {
			newPassword: '',
			repeatNewPassword:'',
			remember: true
		},
		validationSchema: PasswordSchema,
		onSubmit: async (values) => {
			const requestValidateOtp = {
				'unique_id': unique_id,
				'otp': verificationOtp,
				'user_name': email,
				'password': values.newPassword,
				'password_confirmation': values.repeatNewPassword,
			}
			
			var res = await ResetPasswordApi(requestValidateOtp);
			if(res.Status)
			{
				if(isAuth)
				{
					await LogoutApi(user);
					setUser({});
					navigate('/');
				}
				else
				{
					navigate(Constants.PACKAGE_LOGIN_URL)
				}
			}
		}
	});

	const {errors, touched,handleSubmit,getFieldProps} = formik;

	return (
		<>
			<Box sx={{ backgroundColor: '#F5F5F5', p: 0 }}>
				{!isAuth &&<Grid container spacing={2} sx={{ bgcolor: '#fff', pl: 6, pt: 1, pb: 1, borderBottom: '2px solid #EEEEEE' }}>
					<Grid item xs={12} lg={7}>
						<Summary />
					</Grid>
				</Grid>}
				{!isAuth &&<StepperHeader stepLevel={Constants.STEP_CONFIRMATION} />}
				{isAuth &&<Typography className="page-Header-text">{t('Profile')} {'>'} {t('Change your password')}</Typography>}
				<Grid sx={{ p: 2, backgroundColor: 'white' }} container justifyContent='center' spacing={2}>
					{!isAuth &&<Grid item xs={10}>
						<PackageItemsListForLogin totalItineraryAmount={totalItineraryAmount} passCurrency={currency} isExpandedPanel='false' />
					</Grid>}
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Grid container item sm spacing={2} direction="column" alignItems='center'>
								<Grid className='otp'>
									<OtpInput fieldLength={4} setStateValue={handleVerficationOtp} />
								</Grid>
								<Grid>
									<Typography className='typography1'>{t('Enter the verification code we just sent on your email.')}</Typography>
									<Typography className='typography2'>{t('I don’t recieve a code,')} <Link className='resend' onClick={handleResendCode}>{t('RESEND')}</Link></Typography>
									{verificationMsg.length > 0 && <Typography variant='h6' color='primary'> {verificationMsg} </Typography>}
								</Grid>
								<Grid className='password' item xs container direction="row" spacing={1}>
									<TextField
										className="validation-cls"
										fullWidth
										autoComplete="current-password"
										type={showNewPassword ? 'text' : 'password'}
										label={t('New Password')}
										InputLabelProps={{shrink: true}}
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
										InputLabelProps={{shrink: true}}
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
							<Grid className='buttons' item xs sm container direction='row' justifyContent='center' spacing={2}>
								{!isAuth&&<Grid item>
									<Button className='cancelButton' onClick={() => {navigate('/package/reset-password')}} variant="outlined">{t('CANCEL')}</Button>
								</Grid>}
								{isAuth&&<Grid item>
									<Button className='cancelButton' onClick={() => {navigate('/users/change-password')}} variant="outlined">{t('CANCEL')}</Button>
								</Grid>}
								<Grid item>
									<Button className='changeButton' type='submit' variant='contained'>{t('CHANGE')}</Button>
								</Grid>
							</Grid >
						</Form>
					</FormikProvider>
				</Grid>
			</Box>
		</>
	)
}

export default ForgotPassword