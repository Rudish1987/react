import React, { useState } from 'react';
import { Typography, Box, Grid, Container, Button } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import TextField from '@mui/material/TextField';
import { useFormik, Form, FormikProvider } from 'formik';
import { useTheme } from '@mui/material/styles';
import Country from '../../components/common/CountrySelect';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { ReqDemo } from '../../api/btob/ReqDemo';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab'


export default function RequestDemo() {
	const containerRef = React.useRef(null);
	let navigate = useNavigate();
	const { t } = useTranslation();
	const [demoFlag, setDemoFlag] = useState(0);
	const theme = useTheme();
	const [loading, setLoading] = useState(false)

	const nationality = {
		Country_Code: '',
		Country_Name: '',
		Tel_Country_Code: '',
		ShortCountryName: '',
		Country_Name_AR: '',
	};
	//Validation for request demo page
	const SignupSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, t('Too Short!'))
			.matches(/^[A-Za-z ]*$/, t('Please enter valid name'))
			.max(40)
			.required(t('This field is required!')),
		phone: Yup.string().matches(/^\d+$/, { message: t('This field must be a number.'), excludeEmptyString: false }).required(t('This field is required!')),
		email: Yup.string().email(t('Email must be valid email address')).required(t('This field is required!')),
		nationality: Yup.object({ Country_Code: Yup.string().required(t('This field is required!')) }),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			nationality: nationality,
			email: '',
			phone: ''
		},
		validationSchema: SignupSchema,
		onSubmit: async (values) => {
			setLoading(isSubmitting)
			let countryName = values.nationality.Country_Name;
			const jsonData = {
				name: values.name,
				email: values.email,
				country: countryName.split(')')[1],
				phone: values.phone,
				countryPhoneCode: values.nationality.Tel_Country_Code
			};
			await ReqDemo(jsonData);
			setLoading(false)
			navigate('/request-demo#completed');
			setDemoFlag(1);
		},
	});
	const { errors, touched, getFieldProps, isSubmitting } = formik
	const redirectToHomepage = () => {
		navigate('/');
	}

	const reqDemoAfterSubmit = () => {
		return (
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={formik.handleSubmit} className="formwidth">
					<Grid container sx={{ paddingTop: '32px', paddingBottom: '52px' }}>
						<Grid item md={2} xs={12}></Grid>
						<Grid item md={8} xs={12} display="flex" justifyContent="center">
							<Typography variant='body1' sx={{ width: 413, height: 135, textAlign: 'justify', color: theme.palette.grey[800] }}>
								{t('Our team will contact will get in touch with you to arrange the demonstration. We look forward to showcasing the power and potential of our solution.')}
							</Typography>
						</Grid>
						<Grid item md={2} xs={12}></Grid>
					</Grid>
					<Grid item md={12} xs={12} textAlign="center" paddingBottom="52px">
						<Button variant="contained" size='large' sx={{ width: { xs: 330, lg: 413 } }} startIcon={<ClearTwoToneIcon />} onClick={redirectToHomepage}>
							{t('Close')}</Button>
					</Grid>
				</Form>
			</FormikProvider >
		);
	}

	const requestDemoForm = () => {
		return (
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={formik.handleSubmit} className="formwidth">
					<Grid container sx={{ paddingTop: '32px', paddingBottom: '52px' }}>
						<Grid item md={2} xs={12}></Grid>
						<Grid item md={8} xs={12}>
							<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
								<Grid sm={6} xs={12} item>
									<TextField
										variant="outlined"
										fullWidth
										type='text'
										label={t('Name')}
										{...getFieldProps('name')}
										helperText={touched.name && errors.name}
										error={formik.touched.name && Boolean(formik.errors.name)}
									/>
								</Grid>
								<Grid item sm={6} xs={12}>
									<TextField
										variant="outlined"
										fullWidth
										type='text'
										label={t('E-mail')}
										{...getFieldProps('email')}
										helperText={touched.email && errors.email}
										error={formik.touched.email && Boolean(formik.errors.email)}
									/>
								</Grid>
								<Grid item sm={6} xs={12}>
									<Country
										value={formik.values.nationality}
										onChange={value => formik.setFieldValue('nationality', (value) ? value : '')}
										setLabel={t('Country')}
										setStateValue={value => formik.setFieldValue('nationality', value ? value : '')}
										error={touched.nationality && errors.nationality}
										helperText={touched.nationality && errors.nationality && errors.nationality.Country_Code}
									/>
								</Grid>
								<Grid item sm={6} xs={12}>
									<TextField
										variant="outlined"
										fullWidth
										type='text'
										label={t('Phone')}
										InputProps={{
											startAdornment: formik.values.nationality.Tel_Country_Code && <InputAdornment position="start">{'(+' + formik.values.nationality.Tel_Country_Code + ')'}</InputAdornment>,
										}}
										{...getFieldProps('phone')}
										helperText={touched.phone && errors.phone}
										error={formik.touched.phone && Boolean(formik.errors.phone)}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item md={2} xs={12}></Grid>
						<Grid item md={12} xs={12} textAlign="center" paddingTop="24px!important">
							<LoadingButton variant="contained" size='large' fullWidth sx={{ width: { xs: 330, lg: 413, md: 413 } }} type='submit' endIcon={<ArrowForwardOutlinedIcon />} loading={loading} loadingPosition="end">
								{t('Send')}</LoadingButton>
						</Grid>
					</Grid>
				</Form >
			</FormikProvider >
		);
	}

	const closeBtn = () => {
		return (<>
			<Grid sx={{ float: 'right', marginTop: '14px' }}>
				<Button variant='text' onClick={redirectToHomepage} sx={{ color: 'grey.900', position: { xs: 'relative' }, bottom: { xs: '23px', lg: '7px' } }}>
					<CloseIcon />
				</Button>
			</Grid>
		</>);
	}

	return (
		<>
			<Box className="box-body-flex" sx={{ paddingTop: '32px!important' }}>
				<Container className="landingLogo body-container-margin" ref={containerRef}>
					<Grid container>
						<Grid item xs={10}>
							<Typography variant='h3' color='#3b3b3b'>
								{t('Request a free demo')}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							{closeBtn()}
						</Grid>
					</Grid>
					<Typography variant='body1' color='#3b3b3b'>
						{demoFlag === 0 ? t('Share details, our team get you to personalised demo.') : t('Thank you for your interest in our Point of sale!')}
					</Typography>
					<Grid container display='flex' justifyContent='center'>
						{(demoFlag == 0) ? requestDemoForm() : reqDemoAfterSubmit()}
					</Grid>
				</Container>
			</Box>
		</>
	);
}
