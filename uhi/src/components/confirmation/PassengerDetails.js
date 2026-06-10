import React, { useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import { useTranslation } from 'react-i18next';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import '../../css/passengerDetails.css';
import { usePassengerBody } from '../../api/usePassengerBody';
import { useAmendPassenger } from '../../context/booking/hooks';
import { LoadingButton } from '@mui/lab';

export default function PassengerDetails({ passengerNum, isChecked, onConfirm, isFirstForm, lastSubmitterForm, passengerInfo }) {
	const [expanded, setExpanded] = React.useState(false);
	const { t } = useTranslation();
	const { preparePassengerDetails } = usePassengerBody();
	const { amendPassenger, isLoading } = useAmendPassenger();
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	}

	const formikInitialValues = () => {
		let formikValue = passengerInfo
		return formikValue;
	}
	const PassengerSchema = Yup.object().shape({
		gender: Yup.string().required(t('Gender is required')),
		givenName: Yup.string().required(t('Given name is required')).matches(/^[a-zA-Z0-9@ ]+$/, t('This field cannot contain special character')),
		surname: Yup.string().required(t('Surname is required')).matches(/^[a-zA-Z0-9@ ]+$/, t('This field cannot contain special character')),
		dateOfBirth: Yup.date().nullable().typeError(t('Date of birth is required')).required(t('Date of birth is required')).max(new Date(), 'Date cannot be in the future'),
		passport: Yup.string().required(t('Passport number is required')).matches(/^[a-zA-Z0-9@ ]+$/, t('This field cannot contain special character')),
		passportExpiry: Yup.date().nullable().typeError(t('Expiry date is required')).required(t('Expiry Date is required')).min(new Date(), 'Date cannot be in the past'),
		muramNumber: Yup.string().nullable()
			.when('gender', {
				is: 'F',
				then: Yup.string().required(t('Mahram Passport Number is required'))
			})
	});
	const formik = useFormik({
		initialValues: formikInitialValues(),
		validationSchema: PassengerSchema,
		onSubmit: async (values) => {
			await preparePassengerDetails(values)
			await amendPassenger()
			setExpanded(false)
			onConfirm();
		},
		enableReinitialize: true,
	});
	const { errors, touched, handleSubmit } = formik;

	useEffect(() => {
		// setExpanded('panel1')
		if (formik.values.isAlreadyConfirmed == 'saved' && formik.values.passport != '') {
			onConfirm();
		}
	}, [formik.values])
	let tomorrow = new Date();
	let yesterday = new Date()

	tomorrow.setDate(tomorrow.getDate() + 1);
	yesterday.setDate(yesterday.getDate() - 1);

	return (
		<>
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Grid sx={{ pt: 4 }}>
						<Accordion sx={{ border: 1, borderColor: '#E0E0E0' }} expanded={passengerNum == lastSubmitterForm || expanded === 'panel1'} onChange={handleChange('panel1')} disabled={isFirstForm}>
							<AccordionSummary
								sx={{ width: '100%', backgroundColor: '#F5F5F5' }}
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								{isChecked && <CheckCircleRoundedIcon sx={{ color: '#00B760', mx: 1 }} />}
								<Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 600, fontFamily: 'Montserrat' }}>
									{t('Adult')} {passengerNum} {formik.values.givenName && '- ' + formik.values.givenName + ' ' + formik.values.surname}
								</Typography>
							</AccordionSummary>
							<AccordionDetails sx={{ pt: 3 }}>
								<Grid container item xs={12} spacing={8} sx={{ px: 2 }} direction="row">
									<Grid container item xs={12} md={6} spacing={2} direction="row">
										<Grid item xs={12} container className='pad-botm-85' direction="row">
											<FormControl sx={{ width: '33%' }}>
												<TextField
													name="leading"
													value={formik.values.leading}
													hidden
													sx={{ display: 'none' }}
												/>
												<InputLabel id="demo-simple-select-label">{t('Gender')}</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													label={t('Gender')}
													value={formik.values.gender}
													onChange={(newValue) => {
														formik.setFieldValue('gender', (newValue) ? newValue.target.value : '')
													}}
												>
													<MenuItem value={'M'}>{t('Male')}</MenuItem>
													<MenuItem value={'F'}>{t('Female')}</MenuItem>
												</Select>
												{formik.errors.gender ? <Typography className='errorMsg'> {formik.errors.gender} </Typography> : ''}
											</FormControl>
										</Grid>
										<Grid item xs={12} md={6} container className='passengerGrid' direction="row">
											<TextField
												className="validation-cls"
												fullWidth
												label={t('Given Name')}
												value={formik.values.givenName}
												onChange={(newValue) => {
													formik.setFieldValue('givenName', (newValue) ? newValue.target.value : '')
												}}
												helperText={touched.givenName && errors.givenName}
											/>
										</Grid>
										<Grid item xs={12} md={6} container className='passengerGrid' direction="row">
											<TextField
												className="validation-cls"
												fullWidth
												label={t('Surname')}
												value={formik.values.surname}
												onChange={(newValue) => {
													formik.setFieldValue('surname', (newValue) ? newValue.target.value : '')
												}}
												helperText={touched.surname && errors.surname}
											/>
										</Grid>
										<Grid item xs={12} md={6} container className='passengerGrid' direction="row">
											<TextField
												fullWidth
												label={t('Nationality')}
												value={formik.values.nationalityName}
												helperText={touched.nationalityName && errors.nationalityName}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Grid>

										<Grid item xs={12} md={6} container className='passengerGrid' direction="row">
											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<DatePicker
													fullWidth
													label={t('Date of Birth')}
													value={formik.values.dateOfBirth}
													onChange={(newValue) => {
														formik.setFieldValue('dateOfBirth', (newValue) ? newValue : '')
													}}
													renderInput={(params) => (<TextField className="validation-cls" {...params} sx={{ width: '100%' }} helperText={touched.dateOfBirth && errors.dateOfBirth}
													/>)}
													inputFormat={'dd/MM/yyyy'}
													maxDate={yesterday}
												/>
											</LocalizationProvider>
										</Grid>

									</Grid>

									<Grid container item xs={12} md={6} spacing={2} direction="row">
										<Grid item xs={12} container className="pad-botm-73" direction="row">
											<Typography sx={{ pt: '10px' }}><ReceiptOutlinedIcon /></Typography>
											<Typography sx={{ pl: 1, pt: '10px' }}>{t('Passport')}</Typography>
										</Grid>
										<Grid item xs={12} md={6} container className='passengerGrid' direction="row">
											<TextField
												className="validation-cls"
												fullWidth
												label={t('Passport Number')}
												value={formik.values.passport}
												onChange={(newValue) => {
													formik.setFieldValue('passport', (newValue) ? newValue.target.value : '')
												}}
												inputProps={{ maxLength: 10 }}
												helperText={touched.passport && errors.passport}
											/>

										</Grid>
										<Grid item xs={12} md={6} container className='passengerGrid' direction="row">
											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<DatePicker
													fullWidth
													label={t('Expiry')}
													value={formik.values.passportExpiry}
													onChange={(newValue) => {
														formik.setFieldValue('passportExpiry', (newValue) ? newValue : '')
													}}
													renderInput={(params) => (<TextField className="validation-cls" {...params} sx={{ width: '100%' }} helperText={touched.passportExpiry && errors.passportExpiry}
													/>)}
													inputFormat={'dd/MM/yyyy'}
													minDate={tomorrow}
												/>
											</LocalizationProvider>
										</Grid>

										<Grid item xs={12} md={6} container className='passengerGrid' direction="row">
											{formik.values.gender == 'F' && <TextField
												className="validation-cls"
												fullWidth
												label={t('Mahram Passport Number')}
												value={formik.values.muramNumber}
												onChange={(newValue) => {
													formik.setFieldValue('muramNumber', (newValue) ? newValue.target.value : '')
												}}
												helperText={touched.muramNumber && errors.muramNumber}
											/>}
											{formik.values.gender !== 'F' && <> &nbsp; </>}
										</Grid>
										<Grid item xs={12} md={6} container className='passengerGrid' direction="row">
											&nbsp;
										</Grid>
									</Grid>
									<Grid item xs={12} container direction="row" sx={{ justifyContent: 'center', pt: '24px !important' }}>
										<LoadingButton
											size="large"
											type='submit'
											variant="outlined"
											loading={isLoading}
											loadingIndicator={t('Confirming..')}
											sx={{ color: (theme) => theme.palette.primary.main, border: `1px solid ${(theme) => theme.palette.primary.main}` }}
										>
											{t('CONFIRM')}
										</LoadingButton>
									</Grid>
								</Grid>
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Form>
			</FormikProvider>
		</>
	);
}
