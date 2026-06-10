import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import { useTranslation } from 'react-i18next';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField, Grid, Autocomplete } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import '../../css/passengerDetails.css';
import { useFlightBody } from '../../api/useFlightBody';
import { useAmendFlight } from '../../context/booking/hooks';
import { useStoreActions, useStoreState } from 'easy-peasy';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useLocale } from '../../context/LocaleContext';


export default function FlightDetails({ onConfirm }) {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [expanded, setExpanded] = React.useState('panelFlight');
	const [isConfirmed, setConfirm] = React.useState(false);
	const airports = useStoreState(s => s.btoc.cityArport);

	const afterBookingPackage = useStoreState(s => s.btoc.afterBookingpackagedetails);
	const flightInfo = useStoreState(actions => actions.btoc.itineraryDetails.flight);
	const setFlightResult = useStoreActions(actions => actions.btoc.itineraryDetails.setFlightResult);
	let arrivalAirport = useStoreState(actions => actions.btoc.itineraryDetails.arrivalAirport);
	let depatureAirport = useStoreState(actions => actions.btoc.itineraryDetails.depatureAirport);
	const setArrivalAirport = useStoreActions(actions => actions.btoc.itineraryDetails.setArrivalAirport);
	const selectAirInit = {
		Cod: '',
		AirportName: t('Select'),
		CityCode: '',
		CityName: '',
		AirportNameAR: t('Select'),
		CityNameAR: ''
	}
	if (Object.keys(arrivalAirport).length < 1) {
		arrivalAirport = selectAirInit;
	}
	let defaultArrivalAirport = {};
	let defaultDepatureAirport = {};
	if (Object.keys(afterBookingPackage).length > 0) {
		if (Object.keys(flightInfo).length > 0) {
			airports.map((data) => {
				if (data.Cod == flightInfo.arrivalFrom) {
					defaultArrivalAirport = data;
				}
				if (data.Cod == flightInfo.departedTo) {
					defaultDepatureAirport = data;
				}
			});
		} else {
			arrivalAirport = depatureAirport = selectAirInit;
		}
	}
	let arriveData = (Object.keys(flightInfo).length > 0) ? defaultArrivalAirport : arrivalAirport;
	const [defautlArrivalName, setDefautlArrivalName] = useState(arriveData);
	const setDepatureAirport = useStoreActions(actions => actions.btoc.itineraryDetails.setDepatureAirport);
	if (Object.keys(depatureAirport).length == 0) {
		depatureAirport = selectAirInit;
	}

	let depatureData = (Object.keys(flightInfo).length > 0) ? defaultDepatureAirport : depatureAirport;

	const [defautlDepatureName, setDefautlDepatureName] = useState(depatureData);
	const arrival =
		Object.keys(flightInfo).length > 0 ? flightInfo.arrivalFrom : '';
	const arrivalFlightNumber =
		Object.keys(flightInfo).length > 0 ? flightInfo.arrivalFlight : '';
	const departure =
		Object.keys(flightInfo).length > 0 ? flightInfo.departedTo : '';
	const departureFlightNumber =
		Object.keys(flightInfo).length > 0 ? flightInfo.departedFlight : '';


	const arrivalDateValue =
		Object.keys(flightInfo).length > 0
			? moment(flightInfo.arrivalDate).format('YYYY-MM-DD')
			: null;
	const arrivalTimeValue =
		Object.keys(flightInfo).length > 0
			? moment(flightInfo.arrivalDate).format('YYYY-MM-DD HH:mm:ss')
			: null;
	const departureDateValue =
		Object.keys(flightInfo).length > 0
			? moment(flightInfo.departedDate).format('YYYY-MM-DD')
			: null;
	const departureTimeValue =
		Object.keys(flightInfo).length > 0
			? moment(flightInfo.departedDate).format('YYYY-MM-DD HH:mm:ss')
			: null;
	const flightAutoId =
		Object.keys(flightInfo).length > 0 ? flightInfo.flightAutoId : 0;

	const { prepareFlightDetails } = useFlightBody();
	const { amendFlight, isLoading } = useAmendFlight();
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const today = new Date();
	today.setHours(0, 0, 0, 0)

	const FlightSchema = Yup.object().shape({
		arrival: Yup.string().required(t('Arrival is required')).matches(/^[a-zA-Z0-9@ ]+$/, t('This field cannot contain special character')),
		arrivalFlightNumber: Yup.string().required(t('Flight number is required')).matches(/^[a-zA-Z0-9@ ]+$/, t('This field cannot contain special character')).max(8, 'Too long'),
		departure: Yup.string().required(t('Departure is required')).matches(/^[a-zA-Z0-9@ ]+$/, t('This field cannot contain special character')),
		departureFlightNumber: Yup.string().required(t('Flight number is required')).matches(/^[a-zA-Z0-9@ ]+$/, t('This field cannot contain special character')).max(8, 'Too long'),
		arrivalDate: Yup.date().nullable().typeError(t('Arrival date is required')).required(t('Arrival Date is required')).min(today, 'Date cannot be in the past').max(today.getFullYear() + 2, 'Arrival date can\'t be that far'),
		arrivalTime: Yup.date().nullable().required(t('Arrival time is required')),
		departureDate: Yup.date().nullable().typeError(t('Departure date is required')).required(t('Departure Date is required'))
			.max(today.getFullYear() + 2, 'Departure date can\'t be that far').when('arrivalDate', (arrivalDate, schema) => {
				if (arrivalDate) {
					const dayAfter = new Date(arrivalDate.getTime() + 86400000);
					return schema.min(dayAfter, 'Departure date can\'t be same or before arrival date');
				}
				return schema;
			}),
		departureTime: Yup.date().nullable().typeError(t('Departure time is required')).required(t('Departure time is required')).when(['arrivalDate', 'departureDate'], {
			is: (arrivalDate, departureDate) => (arrivalDate) && (departureDate) && arrivalDate.toDateString() === departureDate.toDateString(),
			then: Yup.date().min(Yup.ref('arrivalTime'), 'Departure time can\'t be before arrival time'),
			otherwise: ''
		}),
	});

	const formik = useFormik({
		initialValues: {
			id: flightAutoId,
			flightAutoId: flightAutoId,
			arrival: arrival ? arrival : '',
			arrivalFlightNumber: arrivalFlightNumber ? arrivalFlightNumber : '',
			departure: departure ? departure : '',
			departureFlightNumber: departureFlightNumber ? departureFlightNumber : '',
			arrivalDate: arrivalDateValue ? arrivalDateValue : afterBookingPackage.groundService.dateFrom,
			arrivalTime: arrivalTimeValue,
			departureDate: departureDateValue ? departureDateValue : afterBookingPackage.groundService.dateTo,
			departureTime: departureTimeValue
		},
		validationSchema: FlightSchema,
		onSubmit: async (values) => {
			const flightDetails = await prepareFlightDetails(values);
			const getdata = await amendFlight(flightDetails)
			if (getdata.id) {

				setFlightResult(flightDetails)
				setConfirm(true);
				setExpanded(false)
				onConfirm();
			} else {
				console.log('error')
			}
		},
		enableReinitialize: true,
	});
	const { errors, touched, handleSubmit, getFieldProps } = formik;

	useEffect(() => {
		setConfirm(false);
		if (Object.keys(flightInfo).length > 0) {
			setConfirm(true);
			onConfirm();
		}
		setArrivalAirport(arriveData);
		setDepatureAirport(depatureData);
		setDefautlDepatureName(arriveData);
		setDefautlArrivalName(depatureData);

	}, [flightInfo])

	useEffect(() => {
		//If airport detail does not have select option
		if (Object.keys(afterBookingPackage).length > 0) {
			if (Object.keys(flightInfo).length == 0) {
				if (airports.filter(e => e.Cod === '').length == 0) {
					airports.unshift(selectAirInit);
				}
			}
		}
		//To set select option with language base
		for (let j = 0; j < airports.length; j++) {
			if (airports[j].Cod == '') {
				airports[j] = selectAirInit;
			}
		}

		setArrivalAirport(selectAirInit);
		setDepatureAirport(selectAirInit);
		defaultDepatureAirport = selectAirInit;
		defaultArrivalAirport = selectAirInit;
	}, [airports]);

	return (
		<>
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Grid container direction="column">
						<Accordion sx={{ border: 1, borderColor: '#E0E0E0' }} expanded={expanded === 'panelFlight'} onChange={handleChange('panelFlight')} >
							<AccordionSummary
								sx={{ width: '100%', backgroundColor: '#F5F5F5' }}
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								{isConfirmed && <CheckCircleRoundedIcon sx={{ color: '#00B760', mx: 1 }} />}
								<Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 600, fontFamily: 'Montserrat' }}>
									{t('Flight')}
								</Typography>
							</AccordionSummary>
							<AccordionDetails sx={{ pt: 3 }}>
								<Grid container item xs={12} spacing={6} sx={{ px: 2 }} direction="row">
									<Grid container item xs={12} md={6} spacing={2} direction="row">
										<Grid container item xs={12}>
											<Typography><FlightLandIcon /></Typography>
											<Typography sx={{ fontWeight: 500 }}> &nbsp;{t('Arrival from')}</Typography>
										</Grid>
										<Grid item xs={12} md={6} container direction="row" sx={{ height: '75px' }}>
											<TextField
												name="id"
												value={formik.values.id}
												hidden
												sx={{ display: 'none' }}
											/>
											<Autocomplete
												fullWidth
												onChange={(event, newValue) => {
													formik.setFieldValue('arrival', (newValue.Cod) ? newValue.Cod : '')
												}}
												options={airports}
												defaultValue={defautlArrivalName}
												getOptionLabel={(option) => (locale.value == 'ar') ? (option.AirportNameAR + ' ' + option.CityNameAR + ' ' + option.CityCode) : (option.AirportName + ' ' + option.CityName + ' ' + option.CityCode)}
												renderInput={(params) => (<TextField className="validation-cls" helperText={touched.arrival && errors.arrival} {...getFieldProps('arrival')} {...params} label={t('Arrival to')} InputProps={{ ...params.InputProps, autoComplete: 'off' }}
												/>)}
												renderOption={(props, option, { inputValue }) => {
													const matches = match((locale.value == 'ar') ? (option.AirportNameAR + ' ' + option.CityNameAR + ' ' + option.CityCode) : (option.AirportName + ' ' + option.CityName + ' ' + option.CityCode), inputValue, { insideWords: true });
													const parts = parse((locale.value == 'ar') ? (option.AirportNameAR + ' ' + option.CityNameAR + ' ' + option.CityCode) : (option.AirportName + ' ' + option.CityName + ' ' + option.CityCode), matches);
													return (
														<li {...props}>
															<div>
																{parts.map((part, index) => (
																	<span
																		key={index}
																		style={{
																			fontWeight: part.highlight ? 700 : 400,
																		}}>{part.text}
																	</span>
																))}
															</div>
														</li>
													);
												}}
											/>
										</Grid>

										<Grid item xs={12} md={6} container direction="row" sx={{ height: '75px' }}>
											<TextField
												fullWidth
												label={t('Flight Number')}
												{...getFieldProps('arrivalFlightNumber')}
												helperText={touched.arrivalFlightNumber && errors.arrivalFlightNumber}
												onChange={(newValue) => {
													formik.setFieldValue('arrivalFlightNumber', (newValue) ? newValue.target.value : '')
												}}
												inputProps={{ maxLength: 8 }}
												className="validation-cls"
											/>
										</Grid>
										<Grid item xs={12} md={6} container direction="row" sx={{ height: '75px' }}>
											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<DatePicker
													fullWidth
													label={t('Date')}
													value={formik.values.arrivalDate}
													onChange={(newValue) => {
														formik.setFieldValue('arrivalDate', (newValue) ? newValue : '')
													}}
													renderInput={(params) => (<TextField className="validation-cls" {...params} sx={{ width: '100%' }} {...getFieldProps('arrivalDate')} helperText={touched.arrivalDate && errors.arrivalDate}
													/>)}
													inputFormat={'dd/MM/yyyy'}
													minDate={new Date()}
												/>
											</LocalizationProvider>
										</Grid>
										<Grid item xs={12} md={6} container direction="row" sx={{ height: '75px' }}>
											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<TimePicker
													label={t('Time')}
													InputProps={{ readOnly: true, maxLength: 5 }}
													value={formik.values.arrivalTime}
													onChange={(newValue) => {
														formik.setFieldValue('arrivalTime', (newValue) ? newValue : '')
													}}
													renderInput={(params) => (<TextField className="validation-cls" {...params} sx={{ width: '100%' }} {...getFieldProps('arrivalTime')} helperText={touched.arrivalTime && errors.arrivalTime} />)}
													fullWidth
													// clearable
													ampm={false}
												/>
											</LocalizationProvider>
										</Grid>
									</Grid>

									<Grid container item xs={12} md={6} spacing={2} direction="row">
										<Grid container item xs={12}>
											<Typography><FlightTakeoffIcon /></Typography>
											<Typography sx={{ pb: 1, fontWeight: 500 }}> &nbsp;{t('Destination from')}</Typography>
										</Grid>
										<Grid item xs={12} md={6} container direction="row">
											<Autocomplete
												fullWidth
												onChange={(event, newValue) => {
													formik.setFieldValue('departure', (newValue.Cod) ? newValue.Cod : '')
												}}
												options={airports}
												defaultValue={defautlDepatureName}
												getOptionLabel={(option) => (locale.value == 'ar') ? (option.AirportNameAR + ' ' + option.CityNameAR + ' ' + option.CityCode) : (option.AirportName + ' ' + option.CityName + ' ' + option.CityCode)}
												renderInput={(params) => (<TextField className="validation-cls" helperText={touched.departure && errors.departure} {...getFieldProps('departure')} {...params} label={t('Departure from')} InputProps={{ ...params.InputProps, autoComplete: 'off', }} />)}
												renderOption={(props, option, { inputValue }) => {
													const matches = match((locale.value == 'ar') ? (option.AirportNameAR + ' ' + option.CityNameAR + ' ' + option.CityCode) : (option.AirportName + ' ' + option.CityName + ' ' + option.CityCode), inputValue, { insideWords: true });
													const parts = parse((locale.value == 'ar') ? (option.AirportNameAR + ' ' + option.CityNameAR + ' ' + option.CityCode) : (option.AirportName + ' ' + option.CityName + ' ' + option.CityCode), matches);
													return (
														<li {...props}>
															<div>
																{parts.map((part, index) => (
																	<span
																		key={index}
																		style={{
																			fontWeight: part.highlight ? 700 : 400,
																		}}>{part.text}
																	</span>
																))}
															</div>
														</li>
													);
												}}
											/>
										</Grid>

										<Grid item xs={12} md={6} container direction="row" sx={{ height: '75px' }}>
											<TextField
												className="validation-cls"
												fullWidth
												label={t('Flight Number')}
												{...getFieldProps('departureFlightNumber')}
												helperText={touched.departureFlightNumber && errors.departureFlightNumber}
												onChange={(newValue) => {
													formik.setFieldValue('departureFlightNumber', (newValue) ? newValue.target.value : '')
												}}
												inputProps={{ maxLength: 8 }}
											/>
										</Grid>
										<Grid item xs={12} md={6} container direction="row" sx={{ height: '75px' }}>
											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<DatePicker
													fullWidth
													label={t('Date')}
													value={formik.values.departureDate}
													onChange={(newValue) => {
														formik.setFieldValue('departureDate', (newValue) ? newValue : '')
													}}
													renderInput={(params) => (<TextField className="validation-cls" {...params} sx={{ width: '100%' }} {...getFieldProps('departureDate')} helperText={touched.departureDate && t(errors.departureDate)}
													/>)}
													inputFormat={'dd/MM/yyyy'}
													minDate={new Date()}
												/>

											</LocalizationProvider>
										</Grid>
										<Grid item xs={12} md={6} container direction="row" sx={{ height: '75px' }}>
											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<TimePicker
													fullWidth
													label={t('Time')}
													value={formik.values.departureTime}
													onChange={(newValue) => {
														formik.setFieldValue('departureTime', (newValue) ? newValue : '')
													}}
													renderInput={(params) => (<TextField className="validation-cls" {...params} sx={{ width: '100%' }} {...getFieldProps('departureTime')} helperText={t(touched.departureTime && errors.departureTime)} />)}
													clearable
													ampm={false}
												/>
											</LocalizationProvider>
										</Grid>
									</Grid>
									<Grid item xs container direction="row" spacing={1} sx={{ justifyContent: 'center', pt: '50px !important' }}>
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
