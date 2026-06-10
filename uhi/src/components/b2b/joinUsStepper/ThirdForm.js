import React, { useState } from 'react';
import { TextField, Grid, Typography, FormHelperText, Link } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import '../../../css/payment.css';
import { useTheme } from '@mui/material/styles';
//import { fetchTermsOfUse } from '../../../api/TermOfUseApi';
import TermsOfUse from '../../common/TermsofUse';

function ThirdForm({ errors, verifyCallback, getFieldProps, touched, formik }) {
	const { t } = useTranslation();
	const theme = useTheme();
	

	const handleReCaptcha = (value) => {
		formik.setFieldValue('ReCapcha', value ? value : false)
		verifyCallback()
	}
	const [openModal, setOpen] = useState(false);
	const termAndCondition = () => {
		const handleOpen = () => setOpen(true);
		const handleModalClose = () => setOpen(false);
		return (
			<Grid sx={{
				textAlign: 'left'
			}}>
				<Typography sx={{
					color: theme.palette.grey[800]
				}}>{t('I have read and accept the')}</Typography>
				<Link underline="none" onClick={handleOpen} id='terms-button' sx={{
					color: theme.palette.grey[900], marginTop: { xl: '6px', lg: '6px' }, fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightBold,
				}} size='small'>{t('Terms of use')}</Link>
				<TermsOfUse
					openModal={openModal}
					handleModalClose={handleModalClose}></TermsOfUse>
			</Grid>
		)
	}
	return (
		<>
			<Grid item md={12} xs={12}>
				<TextField
					variant="outlined"
					fullWidth
					type='text'
					label={t('Login ID')}
					{...getFieldProps('loginId')}
					helperText={touched.loginId && errors.loginId}
					error={formik.touched.loginId && Boolean(formik.errors.loginId)}
				/>
			</Grid>
			<Grid item sm={6} xs={12}>
				<TextField
					variant="outlined"
					fullWidth
					type='password'
					label={t('Password')}
					{...getFieldProps('password')}
					helperText={touched.password && errors.password}
					error={formik.touched.password && Boolean(formik.errors.password)}
				/>
			</Grid>
			<Grid item sm={6} xs={12}>
				<TextField
					variant="outlined"
					fullWidth
					type='password'
					label={t('Confirm Password')}
					{...getFieldProps('password_confirmation')}
					helperText={touched.password_confirmation && errors.password_confirmation}
					error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
				/>
			</Grid>
			<Grid item sm={6} xs={12}>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox className='checkboxbg'
							required={true} />}
						label={termAndCondition()}
						{...getFieldProps('TermsOfUse')}
					/>
					{formik.touched.TermsOfUse && formik.errors.TermsOfUse ? (
						<FormHelperText sx={{ color: (theme) => theme.palette.primary.main }} >
							{formik.touched.TermsOfUse && formik.errors.TermsOfUse}
						</FormHelperText>
					) : null}
				</FormGroup>
			</Grid>
			<Grid item sm={6} xs={12}>
				<ReCAPTCHA
					sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
					required={true}
					onChange={handleReCaptcha}
				/>
				{formik.touched.ReCapcha && formik.errors.ReCapcha ? (
					<FormHelperText sx={{ color: (theme) => theme.palette.primary.main }} >
						{formik.touched.ReCapcha && formik.errors.ReCapcha}
					</FormHelperText>
				) : null}
			</Grid>
		</>

	);

}


export default ThirdForm;