import React from 'react'
import {Grid,Button,TextField,Box} from '@mui/material'
import { useTranslation } from 'react-i18next';
import '../../css/PasswordChange.css';
import { useFormik,FormikProvider,Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { StepperHeader } from '../CommonHeaders/StepperHeader';
import Constants from '../../helpers/constants'
import { Summary } from '../CommonHeaders/Summary';
import {ForgotPasswordApiWL} from '../../api/User'
import { PackageItemsListForLogin } from '../myPackage/PackageItemsListForLogin';

const ResetPassword = () => {
	const navigate = useNavigate();
	const {t} = useTranslation();
	const currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)
	const totalItineraryAmount = useStoreState(s => s.btoc.itineraryDetails.itineraryAmount)
	const PasswordSchema = Yup.object().shape({
		userName: Yup.string().required(t('Username is required')),
	});

	const formik = useFormik({
		initialValues: {
			userName: '',
			remember: true
		},
		validationSchema: PasswordSchema,
		onSubmit: async (values) => {
			const getdata = await ForgotPasswordApiWL(values.userName)
			if(getdata.uniqueOtpId)
				navigate('/package/forgot-password', { state: { userName: values,unique_id: getdata.uniqueOtpId } })
		}
	});

	const {errors, touched,handleSubmit,getFieldProps} = formik;

	return (
		<>
			<Box sx={{ backgroundColor: '#F5F5F5', p: 0 }}>
				<Grid container spacing={2} sx={{ bgcolor: '#fff', pl: 6, pt: 1, pb: 1, borderBottom: '2px solid #EEEEEE' }}>
					<Grid item xs={12} lg={7}>
						<Summary />
					</Grid>
				</Grid>
				<StepperHeader stepLevel={Constants.STEP_CONFIRMATION} />
				<Grid sx={{ p: 2, backgroundColor: 'white' }} container justifyContent='center' spacing={2}>
					<Grid item xs={10}>
						<PackageItemsListForLogin totalItineraryAmount={totalItineraryAmount} passCurrency={currency} isExpandedPanel='false' />
					</Grid>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Grid container item sm spacing={2} direction="column" alignItems='center'>
								<Grid className='username' item xs container direction="row" spacing={1}>
									<TextField
										className="validation-cls"
										fullWidth
										autoComplete="current-password"
										type='text'
										label={t('Login')}
										{...getFieldProps('userName')}
										helperText={touched.userName && errors.userName}
									/>
								</Grid>
							</Grid>
							<Grid className='buttons' item xs sm container direction='row' justifyContent='center' spacing={2}>
								<Grid item>
									<Button className='cancelButton' onClick={() => {navigate('/package/confirmation/login')}} variant="outlined">{t('CANCEL')}</Button>
								</Grid>
								<Grid item>
									<Button className='changeButton' type='submit' variant='contained'>{t('SEND OTP')}</Button>
								</Grid>
							</Grid >
						</Form>
					</FormikProvider>
				</Grid>
			</Box>
		</>
	)
}

export default ResetPassword
