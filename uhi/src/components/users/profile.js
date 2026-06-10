import React,{useEffect,useState} from 'react'
import { Box, Grid, Typography,TextField,Button} from '@mui/material'
import { useTranslation } from 'react-i18next';
import '../../css/myBookings.css';
import { useFormik,FormikProvider,Form} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ProfileApi, ProfileApiUpdate } from '../../api/User';
import { useStoreState, useStoreActions } from 'easy-peasy';
import StaticContentPageSkeleton from '../../components/skeleton/StaticContentPageSkeleton'

const Profile = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const nationality = useStoreState(s => s.btoc.filters.nationality);
	const [details, setDetails] = useState([]);
	const setUser = useStoreActions(s => s.btoc.setUser);

	useEffect(() => {
		const fetchProfile = async () => {
			const getdata=await ProfileApi()
			setDetails(getdata)
		}
		fetchProfile()
	}, [])

	const ProfileSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required(t('First name is required')),
		lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(t('Last name required')),
		email: Yup.string().email(t('Email must be a valid email address')).required(t('Email is required')),
		country: Yup.object({
			Country_Code: Yup.string().required(t('Country is required')),
		}),
		mobile: Yup.string()
			.required(t('Mobile number is required')),
		password: Yup.string().required(t('Password is required')),
	});

	const initialvalues=() => {
		var userEmail = details.email;
		if(typeof(userEmail) !== 'undefined'){
			if(userEmail.indexOf(';') !== -1){
				userEmail = userEmail.split(';');
				userEmail = userEmail[0];
			}
		}
		let formikValue={
			firstName:details.first_name?details.first_name:'',
			lastName: details.last_name?details.last_name:'',
			email: userEmail?userEmail:'',
			country: nationality,
			mobile: details.mobile?details.mobile:'',
			username: details.userName?details.user_name:'',
			password: '',
		}
		return formikValue
	}

	const formik = useFormik({
		initialValues: initialvalues(),
		validationSchema: ProfileSchema,
		onSubmit: async (values) => {
			const getdata = await ProfileApiUpdate(values)
			if(getdata.token) {
				setUser(getdata)
			}
		},
		enableReinitialize: true,
	});

	const { errors, touched,handleSubmit, getFieldProps } = formik;
	const country = formik.values.country.Country_Name;

	if( Object.keys(details).length == 0 ){
		return (
			<StaticContentPageSkeleton />
		)
	}

	return (
		<>
			<Typography className="page-Header-text">{t('Profile')}</Typography>
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Grid className="bookingContainer" container justifyContent='center'>
						<Box className="width-84">
							<Grid container item sm spacing={2} direction="row">
								<Grid item xs container direction="column" spacing={2}>
									<Grid item>
										<TextField
											fullWidth
											label={t('First Name')}
											value={formik.values.firstName}
											onChange={(newValue) => {
												formik.setFieldValue('firstName', (newValue) ? newValue.target.value : '')
											}}
											InputProps={{
												readOnly: true,
											}}
											{...getFieldProps('firstName')}
											helperText={touched.firstName && errors.firstName}
										/>
									</Grid>

									<Grid item>
										<TextField
											fullWidth
											label={t('Last name')}
											InputProps={{
												readOnly: true,
											}}
											{...getFieldProps('lastName')}
											helperText={touched.lastName && errors.lastName}
										/>
									</Grid>

								</Grid>
								<Grid item xs container direction="column" spacing={2}>
									<Grid item>
										<TextField
											fullWidth
											autoComplete="username"
											type={t('Email')}
											label={t('Email')}
											InputProps={{
												readOnly: true,
											}}
											{...getFieldProps('email')}
											helperText={touched.email && errors.email}
										/>
									</Grid>
									<Grid item xs sm container direction="row" spacing={2}>
										<Grid item xs={6}>
											<TextField
												fullWidth
												autoComplete="country"
												type={t('country')}
												label={t('Country')}
												InputProps={{
													readOnly: true,
												}}
												value={country}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												label={t('Mobile number')}
												fullWidth
												{...getFieldProps('mobile')}
												InputProps={{
													readOnly: true,
												}}
												helperText={touched.mobile && errors.mobile}
											/>
										</Grid>
									</Grid>

								</Grid>

							</Grid>
							<Grid className='buttons' item xs sm container direction='row' justifyContent='end' spacing={2}>
								<Grid item className='button1'>
									<Button className='changedetails' type='submit' disabled variant='contained'>{t('CHANGE DETAILS')}</Button>
								</Grid>
								<Grid item>
									<Button className='changepassword' onClick={() => {navigate('/users/change-password')}} variant="outlined">{t('CHANGE PASSWORD')}</Button>
								</Grid>
							</Grid >

						</Box>
					</Grid>
				</Form>
			</FormikProvider>

		</>
	)

}

export default Profile