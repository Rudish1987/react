import { Button, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useStoreState } from 'easy-peasy';
import { useSaveVisaPassnger } from '../../context/visa/hooks'
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useLocale } from '../../context/LocaleContext';
import { useTheme } from '@mui/material/styles';
import Constants from '../../helpers/constants';
import SafaCountrySelect from './SafaCountrySelect';
import moment from 'moment/moment';

const PassportFormSection = ({ onBackButton, onError }) => {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const navigate = useNavigate();
	const theme = useTheme();
	const passportData = useStoreState(s => s.btob.visa.passportData);
	let countryList = useStoreState(s => s.btob.visa.safaCountry);
	let passengerId = useStoreState(s => s.btob.visa.passengerId);
	const isValidItinerary = useStoreState(s => s.btob.visa.isValidItinerary);
	countryList = countryList !== undefined ? countryList : [];
	const salutation = useStoreState(s => s.btob.safaSalutation);
	const { saveVisaPassnger, isLoading } = useSaveVisaPassnger();
	const getNationality = passportData.nationality ? passportData.nationality : '';
	const [paxNationality, setPaxNationality] = React.useState(getNationality);
	const today = new Date();
	today.setHours(0, 0, 0, 0)

	const PassportFormSchema = Yup.object().shape({
		arrivalDate: Yup.date().nullable().typeError(t('Arrival date is required')).required(t('Arrival Date is required')).min(today, t('Date cannot be in the past')).max(today.getFullYear() + 1, t('Arrival date cannot be that far')),
		returnDate: Yup.date().nullable().typeError(t('Return date is required!')).required(t('Return Date is required!'))
			.when('arrivalDate', (arrivalDate, schema) => {
				if (arrivalDate) {
					const minDate = new Date(arrivalDate.getTime());
					return schema.min(minDate, t('Return date can\'t be same or before arrival date'));
				}
				return schema;
			}).when('arrivalDate', (arrivalDate, schema) => {
				if (arrivalDate) {
					const dateArrival = moment(arrivalDate)
					const maxDate = moment(dateArrival).add(30, 'days')
					return schema.max(maxDate, t('Return date should be within 30 days'));
				}
				return schema;
			}),
		nationality: Yup.string().required(t('Nationality is required!')),
		title: Yup.string().required(t('Title is required!')),
		firstName: Yup.string().min(2, t('Too Short!'))
			.matches(/^[A-Za-z ]*$/, t('Accept only english character'))
			.max(40).required(t('First Name is required!')),
		lastName: Yup.string().nullable().min(2, t('Too Short!'))
			.matches(/^[A-Za-z ]*$/, t('Accept only english character'))
			.max(40).required(t('Last Name is required!')),
		fatherName: Yup.string().matches(/^[A-Za-z ]*$/, t('Accept only english character')).notRequired(),
		gFatherName: Yup.string().matches(/^[A-Za-z ]*$/, t('Accept only english character')).notRequired(),
		gender: Yup.string().nullable().required(t('Gender is required!')),
		birthCountry: Yup.object({ 'natCode': Yup.string().required(t('Birth country is required!')) }),
		birthPlace: Yup.string().required(t('Birth place is required!')),
		expiryDate: Yup.date().nullable().typeError(t('Passport Expiry Date is required')).required(t('Passport Expiry Date is required')),
	});
	const PassportFormSafaSchema = Yup.object().shape({
		passportType: Yup.string().required(t('Passport Type is required!')),
		passportNumber: Yup.string().required(t('Passport Number is required!')),
		nationality: Yup.string().required(t('Nationality is required!')),
		residenceCountry: Yup.object({ natCode: Yup.string().required(t('Residence Country is required!')) }),
		issueCountry: Yup.object({ natCode: Yup.string().required(t('Passport Issue Country is required!')) }),
		issuePlace: Yup.string().required(t('Passport Issue Place is required!')),
		issueDate: Yup.date().nullable().typeError(t('Passport Issue Date is required')).required(t('Passport Issue Date is required')),
		expiryDate: Yup.date().nullable().typeError(t('Passport Expiry Date is required')).required(t('Passport Expiry Date is required')),
		gender: Yup.string().nullable().required(t('Gender is required!')),
		title: Yup.string().required(t('Title is required!')),
		firstName: Yup.string().min(2, t('Too Short!'))
			.matches(/^[A-Za-z ]*$/, t('Accept only english character'))
			.max(40).required(t('First Name is required!')),
		lastName: Yup.string().nullable().min(2, t('Too Short!'))
			.matches(/^[A-Za-z ]*$/, t('Accept only english character'))
			.max(40).required(t('Last Name is required!')),
		fatherName: Yup.string().matches(/^[A-Za-z ]*$/, t('Accept only english character')).notRequired(),
		gFatherName: Yup.string().matches(/^[A-Za-z ]*$/, t('Accept only english character')).notRequired(),
		arrivalDate: Yup.date().nullable().typeError(t('Arrival date is required')).required(t('Arrival Date is required')).min(today, t('Date cannot be in the past')).max(today.getFullYear() + 1, t('Arrival date cannot be that far')),
		returnDate: Yup.date().nullable().typeError(t('Return date is required!')).required(t('Return Date is required!'))
			.when('arrivalDate', (arrivalDate, schema) => {
				if (arrivalDate) {
					const minDate = new Date(arrivalDate.getTime());
					return schema.min(minDate, t('Return date can\'t be same or before arrival date'));
				}
				return schema;
			}).when('arrivalDate', (arrivalDate, schema) => {
				if (arrivalDate) {
					const dateArrival = moment(arrivalDate)
					const maxDate = moment(dateArrival).add(30, 'days')
					return schema.max(maxDate, t('Return date should be within 30 days'));
				}
				return schema;
			}),
		birthCountry: Yup.object({ 'natCode': Yup.string().required(t('Birth country is required!')) }),
		birthPlace: Yup.string().required(t('Birth place is required!')),
		birthDate: Yup.date().nullable().typeError(t('Birth Date is required')).required(t('Birth Date is required')),
	});
	const PassportFormSafaSASchema = Yup.object().shape({
		passportType: Yup.string().required(t('Passport Type is required!')),
		passportNumber: Yup.string().required(t('Passport Number is required!')),
		nationality: Yup.string().required(t('Nationality is required!')),
		residenceCountry: Yup.object({ natCode: Yup.string().required(t('Residence Country is required!')) }),
		issueCountry: Yup.object({ natCode: Yup.string().required(t('Passport Issue Country is required!')) }),
		issuePlace: Yup.string().required(t('Passport Issue Place is required!')),
		issueDate: Yup.date().nullable().typeError(t('Passport Issue Date is required')).required(t('Passport Issue Date is required')),
		expiryDate: Yup.date().nullable().typeError(t('Passport Expiry Date is required')).required(t('Passport Expiry Date is required')),
		gender: Yup.string().nullable().required(t('Gender is required!')),
		title: Yup.string().required(t('Title is required!')),
		firstName: Yup.string().required(t('First Name is required!')),
		lastName: Yup.string().nullable().required(t('Last Name is required!')),
		arFirstName: Yup.string().nullable().required(t('Arabic First Name is required for SA nationality!')),
		arLastName: Yup.string().nullable().required(t('Arabic Last Name is required SA nationality!')),
		arrivalDate: Yup.date().nullable().typeError(t('Arrival date is required')).required(t('Arrival date is required')).min(today, t('Date cannot be in the past')).max(today.getFullYear() + 1, t('Arrival date cannot be that far')),
		returnDate: Yup.date().nullable().typeError(t('Return date is required!')).required(t('Return Date is required!'))
			.when('arrivalDate', (arrivalDate, schema) => {
				if (arrivalDate) {
					const minDate = new Date(arrivalDate.getTime());
					return schema.min(minDate, t('Return date can\'t be same or before arrival date'));
				}
				return schema;
			}).when('arrivalDate', (arrivalDate, schema) => {
				if (arrivalDate) {
					const dateArrival = moment(arrivalDate)
					const maxDate = moment(dateArrival).add(30, 'days')
					return schema.max(maxDate, t('Return date should be within 30 days'));
				}
				return schema;
			}),
		birthCountry: Yup.object({ natCode: Yup.string().required(t('Birth country is required!')) }),
		birthPlace: Yup.string().required(t('Birth place is required!')),
		birthDate: Yup.date().nullable().typeError(t('Birth Date is required')).required(t('Birth Date is required')),
	});
	const validField = [
		'passportType', 'passportNumber', 'nationality', 'residenceCountry', 'issueCountry', 'issuePlace', 'issueDate', 'expiryDate', 'birthDate', 'gender', 'birthCountry', 'birthPlace', 'firstName', 'lastName', 'nationalID', 'arrivalDate', 'returnDate', 'medinaDate', 'title', 'maritalStatus', 'education', 'fatherName', 'gFatherName', 'mrz', 'faceImageUrl', 'passportImageUrl', 'safaFaceImage', 'safaPassportImage'
	];
	const validSAField = [
		'passportType', 'passportNumber', 'nationality', 'residenceCountry', 'issueCountry', 'issuePlace', 'issueDate', 'expiryDate', 'birthDate', 'gender', 'birthCountry', 'birthPlace', 'firstName', 'lastName', 'nationalID', 'arrivalDate', 'returnDate', 'medinaDate', 'title', 'maritalStatus', 'education', 'arFirstName', 'arLastName', 'fatherName', 'gFatherName', 'arFatherName', 'arGFatherName', 'mrz', 'faceImageUrl', 'passportImageUrl', 'safaFaceImage', 'safaPassportImage'
	]
	const returnValidationSchema = () => {
		if (paxNationality == 'SAR') {
			return PassportFormSafaSASchema;
		}
		if (passportData.passportNumber) {
			return PassportFormSafaSchema;
		} else {
			return PassportFormSchema;
		}
	}
	const checkFormIsValid = (formikValues) => {
		let valid = 1;
		if (paxNationality == 'SAR') {
			validSAField.map((field) => {
				if (formikValues[field] == '' || formikValues[field] == null) {
					valid = 0;
				}
			})
		} else {
			validField.map((field) => {
				if (formikValues[field] == '' || formikValues[field] == null) {
					valid = 0;
				}
			})
		}

		return valid;
	}
	const formik = useFormik({
		initialValues: passportData,
		validateOnBlur: false,
		validationSchema: returnValidationSchema(),
		enableReinitialize: true,
		onSubmit: async (values) => {
			formik.values.status = checkFormIsValid(values);
			const saveResponse = await saveVisaPassnger(values);

			if (saveResponse.status) {
				if (saveResponse.data.package && saveResponse.data.package.type == Constants.VISA_SAFA_STATUS_BOTH) {
					saveResponse.data.package.displayType = Constants.VISA_SAFA_STATUS_SAVE
				} else {
					saveResponse.data.package.displayType = saveResponse.data.package.type
				}
				navigate('/visa/traveler-list/' + saveResponse.data.returnedCode, { state: { itineraryDetails: saveResponse.data.package } });
			} else {
				onError(saveResponse.message);
			}
		},
	});

	const { errors, handleSubmit, getFieldProps, touched } = formik

	const handleNationalityChange = (value) => {
		formik.setFieldValue('nationality', (value) ? value : passportData.nationality);
		setPaxNationality(value);
	}

	const disableSaveTravelerButton = () => {
		if (passportData.visaStatus && [Constants.B2B_VISA_STATUS_PAID, Constants.B2B_VISA_STATUS_APPROVED, Constants.B2B_VISA_STATUS_REJECTED].includes(passportData.visaStatus)) {
			return true;
		}
		return false;
	}

	return (
		<>
			<Grid item xs={12} sm={8}>
				<Typography variant='body2' color='grey.900'>
					{t('Passport')}
				</Typography>
				<FormikProvider value={formik}>
					<Form id="form-visa" autoComplete="off" noValidate onSubmit={handleSubmit}>
						<Grid container spacing={2} paddingTop='10px'>
							<Grid sm={3} xs={12} item>
								<TextField
									disabled
									fullWidth
									label={t('Passport type')}
									{...getFieldProps('passportType')}
									type="text"
									helperText={touched.passportType && errors.passportType}
									error={formik.touched.passportType && Boolean(formik.errors.passportType)}
								/>
							</Grid>
							<Grid sm={3} xs={12} item>
								<TextField
									disabled
									fullWidth
									label={t('Passport Number')}
									{...getFieldProps('passportNumber')}
									type="text"
									helperText={touched.passportNumber && errors.passportNumber}
									error={formik.touched.passportNumber && Boolean(formik.errors.passportNumber)}
								/>
							</Grid>
							<Grid sm={3} xs={12} item>
								<TextField
									fullWidth
									label={t('National ID')}
									type="text"
									{...getFieldProps('nationalID')}
									value={formik.values.nationalID}
									onChange={formik.handleChange}
									sx={passportData.passportType != '' && !formik.values.nationalID && passengerId > 0 ? { border: `1px solid ${theme.palette.warning.dark} !important`, borderRadius: '4px', } : {}}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} paddingTop='20px'>
							<Grid sm={3} xs={12} item>
								<FormControl
									sx={{
										width: '100%'
									}} disabled>
									<InputLabel id="nationality">{t('Nationality')}</InputLabel>
									<Select
										fullWidth
										labelId="select-label"
										id="nationality"
										label={t('Nationality')}
										value={paxNationality}
										{...getFieldProps('nationality')}
										onChange={(e) => handleNationalityChange(e.target.value)}
										error={formik.touched.nationality && Boolean(formik.errors.nationality)}
									>
										{countryList.map(function (item, i) {
											return (<MenuItem key={i} value={item.natCode}>{t(item.name)}</MenuItem>)
										})}
									</Select>
									{formik.touched.nationality && formik.errors.nationality ? (
										<FormHelperText sx={{ color: (theme) => theme.palette.primary.main }} >
											{formik.touched.nationality && formik.errors.nationality}
										</FormHelperText>
									) : null}
								</FormControl>
							</Grid>
							<Grid sm={4} xs={12} item>
								<SafaCountrySelect
									value={formik.values.residenceCountry}
									setLabel={t('Residence Country')}
									setStateValue={value => formik.setFieldValue('residenceCountry', value ? value : '')}
									errorMsg={formik.touched.residenceCountry && Boolean(formik.errors.residenceCountry)}
									helperTextMsg={touched.residenceCountry && errors.residenceCountry && errors.residenceCountry.natCode}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} paddingTop='20px'>
							<Grid sm={5} xs={12} item>
								<SafaCountrySelect
									value={formik.values.issueCountry}
									setLabel={t('Issue Country')}
									setStateValue={value => formik.setFieldValue('issueCountry', value ? value : '')}
									errorMsg={formik.touched.issueCountry && Boolean(formik.errors.issueCountry)}
									helperTextMsg={touched.issueCountry && errors.issueCountry && errors.issueCountry.natCode}
								/>
							</Grid>
							<Grid sm={5} xs={12} item>
								<TextField
									fullWidth
									id="Issue place"
									label={t('Issue Place')}
									type="text"
									{...getFieldProps('issuePlace')}
									helperText={touched.issuePlace && errors.issuePlace}
									error={formik.touched.issuePlace && Boolean(formik.errors.issuePlace)}
								/>
							</Grid>
							<Grid sm={5} xs={12} item>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										PopperProps={{
											sx: {
												...(locale.value === 'ar' && {
													'& .muiltr-i4bv87-MuiSvgIcon-root': {
														transform: 'rotate(180deg) !important',
													},
												}),
											}
										}}
										fullWidth
										label={t('Issue Date')}
										value={formik.values.issueDate}
										onChange={(newValue) => { formik.setFieldValue('issueDate', (newValue) ? newValue : '') }}
										renderInput={(params) => (<TextField {...params} sx={{
											...(locale.value === Constants.LANGUAGES_AR && {
												'& .muiltr-1vu5cr0-MuiFormLabel-root-MuiInputLabel-root': {
													left: '20%'
												}
											}),
											width: '100%'
										}} {...getFieldProps('issueDate')} helperText={touched.issueDate && errors.issueDate} error={formik.touched.issueDate && Boolean(formik.errors.issueDate)}
										/>)}
										inputFormat={'dd/MM/yyyy'}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid sm={5} xs={12} item>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										fullWidth
										PopperProps={{
											sx: {
												...(locale.value === 'ar' && {
													'& .muiltr-i4bv87-MuiSvgIcon-root': {
														transform: 'rotate(180deg) !important',
													},
												}),
											}
										}}
										label={t('Expiry Date')}
										value={formik.values.expiryDate}
										onChange={(newValue) => { formik.setFieldValue('expiryDate', (newValue) ? newValue : '') }}
										renderInput={(params) => (<TextField {...params} sx={{
											...(locale.value === Constants.LANGUAGES_AR && {
												'& .muiltr-1vu5cr0-MuiFormLabel-root-MuiInputLabel-root': {
													left: '20%'
												}
											}),
											width: '100%'
										}} {...getFieldProps('expiryDate')} helperText={touched.expiryDate && errors.expiryDate} error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
										/>)}
										inputFormat={'dd/MM/yyyy'}
										minDate={new Date()}
									/>
								</LocalizationProvider>
							</Grid>
						</Grid>
						<Typography variant='body2' color='grey.900' paddingTop='15px'>
							{t('English name')}
						</Typography>
						<Grid container spacing={2} paddingTop='20px'>
							<Grid sm={3} xs={12} item>
								<FormControl
									sx={{
										width: '100%'
									}}>
									<InputLabel id="select-label">{t('Gender')}</InputLabel>
									<Select
										label={t('Gender')}
										labelId="select-label"
										value={passportData ? passportData.gender : ''}
										{...getFieldProps('gender')}
										onChange={(newValue) => {
											formik.setFieldValue('gender', (newValue) ? newValue.target.value : '')
										}}
										error={formik.touched.gender && Boolean(formik.errors.gender)}
									>
										<MenuItem value={'Male'}>{t('Male')}</MenuItem>
										<MenuItem value={'Female'}>{t('Female')}</MenuItem>
									</Select>
									{formik.touched.gender && formik.errors.gender ? (
										<FormHelperText sx={{ color: (theme) => theme.palette.primary.main }} >
											{formik.touched.gender && formik.errors.gender}
										</FormHelperText>
									) : null}
								</FormControl>
							</Grid>
							<Grid sm={3} xs={12} item>
								<FormControl
									sx={{
										width: '100%'
									}}>
									<InputLabel id="select-label">{t('Title')}</InputLabel>
									<Select
										label={t('Salutation')}
										labelId="select-label"
										value={passportData ? passportData.title : ''}
										{...getFieldProps('title')}
										onChange={(newValue) => {
											formik.setFieldValue('title', (newValue) ? newValue.target.value : '')
										}}
										error={formik.touched.title && Boolean(formik.errors.title)}
									>
										{salutation.map(function (item, i) {
											// console.log(item.locale.valueitem.locale.value)
											return (<MenuItem key={i} value={item.id}>{t(locale.value === Constants.LANGUAGES_AR ? item.DescriptionAr : item.Description)}</MenuItem>)
										})}
									</Select>
									{formik.touched.title && formik.errors.title ? (
										<FormHelperText sx={{ color: (theme) => theme.palette.primary.main }} >
											{formik.touched.title && formik.errors.title}
										</FormHelperText>
									) : null}
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={2} paddingTop='20px'>
							<Grid sm={3} xs={12} item>
								<TextField
									fullWidth
									label={t('First Name')}
									{...getFieldProps('firstName')}
									type="text"
									//value={passportData ? passportData.firstName : ''}
									helperText={touched.firstName && errors.firstName}
									error={formik.touched.firstName && Boolean(formik.errors.firstName)}
								//InputLabelProps={{ shrink: !!passportData.firstName }}
								/>
							</Grid>
							<Grid sm={3} xs={12} item>
								<TextField
									fullWidth
									label={t('Last Name')}
									{...getFieldProps('lastName')}
									type="text"
									//value={passportData ? passportData.lastName : ''}
									helperText={touched.lastName && errors.lastName}
									error={formik.touched.lastName && Boolean(formik.errors.lastName)}
								/>
							</Grid>
							<Grid sm={3} xs={12} item>
								<TextField
									fullWidth
									label={t('Father Name')}
									type="text"
									{...getFieldProps('fatherName')}
									value={formik.values.fatherName}
									onChange={formik.handleChange}
									sx={passportData.passportType != '' && !formik.values.fatherName && passengerId > 0 ? { border: `1px solid ${theme.palette.warning.dark} !important`, borderRadius: '4px', } : {}}
								/>
							</Grid>
							<Grid sm={3} xs={12} item>
								<TextField
									fullWidth
									label={t('Grandfather Name')}
									type="text"
									{...getFieldProps('gFatherName')}
									value={formik.values.gFatherName}
									onChange={formik.handleChange}
									sx={passportData.passportType != '' && !formik.values.gFatherName && passengerId > 0 ? { border: `1px solid ${theme.palette.warning.dark} !important`, borderRadius: '4px', } : {}}
								/>
							</Grid>
						</Grid>
						{paxNationality == 'SAR' ?
							<>
								<Typography variant='body2' color='grey.900' paddingTop='15px'>
									{t('Arabic Name')}
									<Typography component='span' fontSize='12px' color='grey.900' paddingLeft='15px'>
										{t('Only for Arabic Nationalities')}
									</Typography>
								</Typography>

								<Grid container spacing={2} paddingTop='20px'>
									<Grid sm={3} xs={12} item>
										<TextField
											fullWidth
											label={t('First Name')}
											{...getFieldProps('arFirstName')}
											type="text"
											helperText={touched.arFirstName && errors.arFirstName}
											error={formik.touched.arFirstName && Boolean(formik.errors.arFirstName)}
										/>
									</Grid>
									<Grid sm={3} xs={12} item>
										<TextField
											fullWidth
											label={t('Last Name')}
											{...getFieldProps('arLastName')}
											type="text"
											helperText={touched.arLastName && errors.arLastName}
											error={formik.touched.arLastName && Boolean(formik.errors.arLastName)}
										/>
									</Grid>
									<Grid sm={3} xs={12} item>
										<TextField
											fullWidth
											label={t('Father Name')}
											{...getFieldProps('arFatherName')}
											type="text"
											value={formik.values.arFatherName}
											onChange={formik.handleChange}
											sx={passportData.passportType != '' && !formik.values.arFatherName && passengerId > 0 ? { border: `1px solid ${theme.palette.warning.dark} !important`, borderRadius: '4px', } : {}}
										/>
									</Grid>
									<Grid sm={3} xs={12} item>
										<TextField
											fullWidth
											label={t('Grandfather Name')}
											{...getFieldProps('arGFatherName')}
											type="text"
											value={formik.values.arGFatherName}
											onChange={formik.handleChange}
											sx={passportData.passportType != '' && !formik.values.arGFatherName && passengerId > 0 ? { border: `1px solid ${theme.palette.warning.dark} !important`, borderRadius: '4px', } : {}}
										/>
									</Grid>
								</Grid>
							</>
							: null
						}
						<Typography variant='body2' color='grey.900' paddingTop='15px'>
							{t('Other Details')}
						</Typography>
						<Grid container spacing={2} paddingTop='20px'>
							<Grid sm={3} xs={12} item>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										fullWidth
										PopperProps={{
											sx: {
												...(locale.value === 'ar' && {
													'& .muiltr-i4bv87-MuiSvgIcon-root': {
														transform: 'rotate(180deg) !important',
													},
												}),
											}
										}}
										label={t('Arrival Date')}
										value={formik.values.arrivalDate}
										onChange={(newValue) => { formik.setFieldValue('arrivalDate', (newValue) ? newValue : '') }}
										renderInput={(params) => (<TextField {...params} sx={{
											...(locale.value === Constants.LANGUAGES_AR && {
												'& .muiltr-1vu5cr0-MuiFormLabel-root-MuiInputLabel-root': {
													left: '20%'
												}
											}),
											width: '100%'
										}} {...getFieldProps('arrivalDate')} helperText={touched.arrivalDate && errors.arrivalDate} error={formik.touched.arrivalDate && Boolean(formik.errors.arrivalDate)} />)}
										InputProps={{ readOnly: true }}
										inputFormat={'dd/MM/yyyy'}
										minDate={new Date().setDate(new Date().getDate() + 7)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid sm={3} xs={12} item>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										fullWidth
										PopperProps={{
											sx: {
												...(locale.value === 'ar' && {
													'& .muiltr-i4bv87-MuiSvgIcon-root': {
														transform: 'rotate(180deg) !important',
													},
												}),
											}
										}}
										label={t('Return Date')}
										value={formik.values.returnDate}
										onChange={(newValue) => { formik.setFieldValue('returnDate', (newValue) ? newValue : '') }}
										renderInput={(params) => (<TextField {...params} sx={{
											...(locale.value === Constants.LANGUAGES_AR && {
												'& .muiltr-1vu5cr0-MuiFormLabel-root-MuiInputLabel-root': {
													left: '20%'
												}
											}),
											width: '100%'
										}}  {...getFieldProps('returnDate')} helperText={touched.returnDate && errors.returnDate} error={formik.touched.returnDate && Boolean(formik.errors.returnDate)}
										/>)}
										inputFormat={'dd/MM/yyyy'}
										InputProps={{ readOnly: true }}
										minDate={new Date(formik.values.arrivalDate)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid sm={6} xs={12} item>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										fullWidth
										PopperProps={{
											sx: {
												...(locale.value === 'ar' && {
													'& .muiltr-i4bv87-MuiSvgIcon-root': {
														transform: 'rotate(180deg) !important',
													},
												}),
											}
										}}
										label={t('Madina Rawda Date')}
										value={formik.values.medinaDate}
										onChange={(newValue) => { formik.setFieldValue('medinaDate', (newValue) ? newValue : '') }}
										renderInput={(params) => (<TextField {...params} {...getFieldProps('medinaDate')}
											sx={{
												...(locale.value === Constants.LANGUAGES_AR && {
													'& .muiltr-1vu5cr0-MuiFormLabel-root-MuiInputLabel-root': { left: '20%' }
												}), width: '100%', ...(passportData.passportType != '' && !formik.values.medinaDate && passengerId > 0 ? { border: `1px solid ${theme.palette.warning.dark} !important`, borderRadius: '4px' } : {})
											}}

										/>)}
										inputFormat={'dd/MM/yyyy'}
										InputProps={{ readOnly: true }}
										minDate={new Date(formik.values.arrivalDate)}
										maxDate={new Date(formik.values.returnDate)}
									/>
								</LocalizationProvider>
							</Grid>
						</Grid>
						<Grid container spacing={2} paddingTop='20px'>
							<Grid sm={4} xs={12} item>
								<SafaCountrySelect
									value={formik.values.birthCountry}
									setLabel={t('Birth Country')}
									setStateValue={value => formik.setFieldValue('birthCountry', value ? value : '')}
									errorMsg={formik.touched.birthCountry && Boolean(formik.errors.birthCountry)}
									helperTextMsg={touched.birthCountry && errors.birthCountry && errors.birthCountry.natCode}
								/>
							</Grid>
							<Grid sm={4} xs={12} item>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										fullWidth
										PopperProps={{
											sx: {
												...(locale.value === 'ar' && {
													'& .muiltr-i4bv87-MuiSvgIcon-root': {
														transform: 'rotate(180deg) !important',
													},
												}),
											}
										}}
										label={t('Birthday')}
										value={formik.values.birthDate}
										onChange={(newValue) => { formik.setFieldValue('birthDate', (newValue) ? newValue : '') }}
										renderInput={(params) => (<TextField {...params} sx={{
											...(locale.value === Constants.LANGUAGES_AR && {
												'& .muiltr-1vu5cr0-MuiFormLabel-root-MuiInputLabel-root': {
													left: '20%'
												}
											}),
											width: '100%'
										}}  {...getFieldProps('birthDate')} helperText={touched.birthDate && errors.birthDate} error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
										/>)}
										inputFormat={'dd/MM/yyyy'}
										InputProps={{ readOnly: true }}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid sm={4} xs={12} item>
								<TextField
									fullWidth
									label={t('Birth Place')}
									{...getFieldProps('birthPlace')}
									type="text"
									helperText={touched.birthPlace && errors.birthPlace}
									error={formik.touched.birthPlace && Boolean(formik.errors.birthPlace)}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} paddingTop='20px'>
							<Grid sm={4} xs={12} item>
								<TextField
									fullWidth
									id="Job"
									label={t('Job')}
									type="text"
									{...getFieldProps('job')}
									value={formik.values.job}
									onChange={formik.handleChange}
									sx={passportData.passportType != '' && !formik.values.job && passengerId > 0 ? { border: `1px solid ${theme.palette.warning.dark} !important`, borderRadius: '4px', } : {}}
								/>
							</Grid>
							<Grid sm={4} xs={12} item>
								<FormControl
									sx={{
										width: '100%'
									}}>
									<InputLabel id="select-label">{t('Marital Status')}</InputLabel>
									<Select
										labelId="select-label"
										id="simple-select"
										label={t('Marital Status')}
										{...getFieldProps('maritalStatus')}
										value={formik.values.maritalStatus}
										onChange={formik.handleChange}
										sx={passportData.passportType != '' && !formik.values.maritalStatus && passengerId > 0 ? { border: `1px solid ${theme.palette.warning.dark} !important`, borderRadius: '4px', } : {}}
									>
										<MenuItem value={'Single'}>{t('Single')}</MenuItem>
										<MenuItem value={'Married'}>{t('Married')}</MenuItem>
										<MenuItem value={'Divorced'}>{t('Divorced')}</MenuItem>
										<MenuItem value={'Widowed'}>{t('Widowed')}</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid sm={4} xs={12} item>
								<FormControl
									sx={{
										width: '100%'
									}}>
									<InputLabel id="select-label">{t('Education Level')}</InputLabel>
									<Select
										labelId="select-label"
										id="simple-select"
										label={t('Education Level')}
										{...getFieldProps('education')}
										value={formik.values.education}
										onChange={formik.handleChange}
										sx={passportData.passportType != '' && !formik.values.education && passengerId > 0 ? { border: `1px solid ${theme.palette.warning.dark} !important`, borderRadius: '4px', } : {}}
									>
										<MenuItem value={'No Education'}>{t('No Education')}</MenuItem>
										<MenuItem value={'Primary School'}>{t('Primary School')}</MenuItem>
										<MenuItem value={'High School'}>{t('High School')}</MenuItem>
										<MenuItem value={'Higher Education'}>{t('Higher Education')}</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						{isValidItinerary && <Grid container spacing={2} paddingTop='20px'>
							<Grid sm={12} xs={12} item display='flex' justifyContent='right'
								sx={{
									...(locale.value === Constants.LANGUAGES_AR && {
										justifyContent: 'left'
									})
								}}
							>
								<Button
									variant="outlinedSecondary"
									fullWidth
									size='large'
									sx={{ marginRight: '20px', marginLeft: '20px', width: { xs: 220, lg: 200 } }}
									onClick={onBackButton}
									disabled={isLoading}
								>
									{t('Cancel')}
								</Button>

								<LoadingButton
									variant="contained"
									fullWidth
									size='large'
									type='submit'
									sx={{ width: { xs: 220 } }}
									endIcon={<ArrowForwardOutlinedIcon
										sx={{
											...(locale.value === Constants.LANGUAGES_AR && {
												marginRight: '3px'
											})
										}}
									/>}
									loading={isLoading}
									loadingPosition="end"
									disabled={disableSaveTravelerButton()}
								>
									{t('Save Traveller')}
								</LoadingButton>
							</Grid>
						</Grid>}
					</Form>
				</FormikProvider>
			</Grid>
		</>
	)
}

export default PassportFormSection;