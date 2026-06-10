import React from 'react'
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Link, Button } from '@mui/material';
import OtpInput from '../common/OtpInput';
import '../../css/verificationForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateOtpApi, resendOtpApi } from '../../api/OtpApi';
import Constants from '../../helpers/constants'
import { useLogin } from '../../context/authHook'

const VerficationForm = () => {
	const { t } = useTranslation();
	const { login } = useLogin();
	const { state } = useLocation();
	const { token, uniqueOtpId } = state;
	const [uniqueOtp, setUniqueOtp] = React.useState(uniqueOtpId);
	const navigate = useNavigate();
	const [verificationMsg, setVerificationMsg] = React.useState('');

	const [verificationOtp, setVerificationOtp] = React.useState('');
	const handleVerifyButton = async () => {
		const requestValidateOtp = {
			'token': token,
			'uniqueId': uniqueOtp,
			'otp': verificationOtp,
		}
		const getdata = await validateOtpApi(requestValidateOtp)
		if(getdata.token) {
			const updatedUser = await login(getdata)
			if (updatedUser) {
				navigate(Constants.USER_PASSENGER_URL)
			} else {
				navigate('/')
			}
		} else {
			setVerificationMsg(getdata)
		}
		
	}

	const handleVerficationOtp = (otp) => {
		setVerificationOtp(otp.join(''))
	}

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

	return (
		<Grid container direction='column' spacing={2}>
			<Grid item container direction='column'>
				<Grid item>
					<Typography variant='h5'>{t('Verification')}</Typography>
				</Grid>
				<Grid item>
					<Typography variant='body'>{t('Enter the verification code we just sent on your email.')}</Typography>
				</Grid>
				<Grid item>
					<Typography variant='body'>{t('I don’t recieve a code, ')}</Typography><Link component="button" underline='none' color='primary' onClick={handleResendCode}>{t('RESEND')}</Link>
					{verificationMsg.length > 0 && <Typography variant='h6' color='primary'> {verificationMsg} </Typography>}
				</Grid>
			</Grid>
			<Grid container item xs sm spacing={3} direction='column' alignContent='center' className='otp-grid'>
				<Grid>
					<OtpInput fieldLength={4} setStateValue={handleVerficationOtp} />
				</Grid>
				<Grid item className='verifyGrid'>
					<Button fullWidth variant='contained' size='large' onClick={handleVerifyButton}>{t('VERIFY')}</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default VerficationForm