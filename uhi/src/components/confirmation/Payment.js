import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography, Paper, Button, Divider, Checkbox, InputLabel, MenuItem, Select, FormControl, Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PaymentTerms from './PaymentTerms';
import '../../css/payment.css';
import '../../css/passengerDetails.css';
import { useStore, useStoreState, useStoreActions } from 'easy-peasy';
import Constants from '../../helpers/constants';
import { useFormik, Form, FormikProvider } from 'formik';
import {usePaymentAuthToken, usePaymentAuthorize3ds, useConfirmBooking} from '../../context/hotel/hooks';
// import {usePaymentAuthToken, useConfirmBooking} from '../../context/hotel/hooks';
import { range, FormatNumber } from '../../helpers/utils'
import Country from '../hotel/SearchForm/country';
import { LoadingButton } from '@mui/lab';

import { useNavigate } from 'react-router-dom';
import { useSendUOMail } from '../../context/booking/hooks';
import moment from 'moment';

const Payment = ({isSaved, passCurrency}) => {
	const { t } = useTranslation();
	const store = useStore();
	const navigate = useNavigate()
	const { getPaymentAuthToken, isLoading: getPaymentAuthTokenLoading } = usePaymentAuthToken();
	const { getPaymentAuthorize3ds, isLoading: getPaymentAuthorize3dsLoading } = usePaymentAuthorize3ds();
	const { getConfirmBooking} = useConfirmBooking();
	const webbeds = window.webbeds;

	const [displayPackage, setDisplayPackage] = useState(false);
	const [isSubmitting, setConfirmBooking] = useState(false);
	const [openModal, setTandCModal] = useState();
	const [open3dsModal, set3dsModal] = useState(false);
	const country = {
		Country_Code: '',
		Country_Name: '',
		Tel_Country_Code: '',
		ShortCountryName: '',
		Country_Name_AR: '',
	};

	const bookingCode = store.getState().btoc.itineraryDetails.bookingCode;
	const totalItineraryAmount = useStoreState(s => s.btoc.itineraryDetails.itineraryAmount);
	const user = useStoreState(s => s.user);
	const isAuth = useStoreState(s => s.isAuth);
	const parentItineraryId = useStoreState(actions => actions.btoc.itineraryDetails.itineraryid);
	const setBillingCustomer = useStoreActions(actions => actions.btoc.itineraryDetails.setBillingCustomer);
	const resetPaymentAuthToken = useStoreActions(actions => actions.btoc.itineraryDetails.resetPaymentAuthToken);
	const resetStatePackage = useStoreActions(actions => actions.btoc.itineraryDetails.resetState)
	const afterBookingItineraryAmount = useStoreState(actions => actions.btoc.itineraryAmountAfterBooking)
	const afterBookingpackagedetails = useStoreState(actions => actions.btoc.afterBookingpackagedetails)
	const defaulturrency = useStoreState(actions => actions.btoc.defaultCurrency)
	
	let Currency;
	let ItineraryAmount = 0;
	if (isAuth && isSaved == true && totalItineraryAmount === 0) {
		Currency = defaulturrency
		ItineraryAmount = Number(afterBookingItineraryAmount) + Number(afterBookingpackagedetails.visa.VisaFeesAmount * afterBookingpackagedetails.groundService.paxCount)
	} else {
		Currency = passCurrency
		ItineraryAmount = totalItineraryAmount;
	}
	const { getUOMail } = useSendUOMail();
	
	const handleOpen = () => {
		setTandCModal(true);
	};
	const handleModalClose = () => {
		setTandCModal(false);
	};

	const handle3dsModalOpen = () => {
		set3dsModal(true);
	};
	const handle3dsModalClose = (event, reason) => {
		if (reason && reason == 'backdropClick')
			return;
		set3dsModal(false);
	};

	useEffect(() => {
		if (bookingCode > 0) {
			//reset required not to call cancel-ininirary API
			getUOMail(bookingCode)
			resetStatePackage()
			navigate(Constants.USER_BOOKING_CONFIRMATION, { state: { mainParentBookingCode: bookingCode } });
		} else {
			setConfirmBooking(false)
		}
		!displayPackage && setDisplayPackage(false);
	}, [displayPackage, bookingCode]);

	const RegisterSchema = Yup.object().shape({
		card_holders_name: Yup.string().required(t('Card holder name is required')),
		credit_card_number: Yup.string().min(16, t('To Short!')).max(19, 'To Long!').required(t('Card number is required')),
		expiry_month: Yup.string().required(t('Expire month is required')),
		expiry_year: Yup.string().required(t('Expire year is required')),
		security_number: Yup.string().required(t('Security number is required')),
		first_name: Yup.string().min(2, t('Too Short!')).max(50, t('Too Long!')).required(t('First name is required')),
		last_name: Yup.string().min(2, t('Too Short!')).max(50, t('Too Long!')).required(t('Last name required')),
		address: Yup.string().required(t('Address is required')),
		postcode: Yup.string().required(t('Postcode is required')),
		country: Yup.object({ Country_Code: Yup.string().required(t('Country is required')) }),
		city: Yup.string().required(t('City is required')),
		termsAndConditions: Yup.boolean().oneOf([true], t('You must accept the terms and conditions')),
	});

	const formik = useFormik({
		initialValues: {
			card_holders_name: '',
			credit_card_number: '',
			expiry_month: '',
			expiry_year: '',
			security_number: '',
			first_name: '',
			last_name: '',
			address: '',
			postcode: '',
			country: country,
			city: '',
			termsAndConditions: false,
		},
		validationSchema: RegisterSchema,
		onSubmit: async values => {
			const customer = {
				first_name: values.first_name,
				last_name: values.last_name,
				address_line1: values.address,
				address_line2: values.address,
				address_state: '',
				address_country: values.country.ShortCountryName,
				address_city: values.city,
				address_postcode: values.postcode,
			};
			setConfirmBooking(true)
			setBillingCustomer(customer);
			tokenize(values);
		},
		enableReinitialize: true,
	});

	const tokenize = async params => {
		webbeds.tokenize(params.card_holders_name, params.credit_card_number, params.expiry_month, params.expiry_year, params.security_number)
			.then(token => {
				chargeWithToken(token);
			})
			.catch(error => {
				console.error(error)
				setConfirmBooking(false)
			});
	}

	const chargeWithToken = async token => {
		const billingCustomerDetails = store.getState().btoc.itineraryDetails.billingCustomerDetails;

		let payload = {
			ccTotalCost: FormatNumber(ItineraryAmount, 2),
			ccChargeFromCard: FormatNumber(ItineraryAmount, 2),
			ccChargeFromCardCurrency: Currency,
			ccFirstName: billingCustomerDetails.first_name,
			ccLastName: billingCustomerDetails.last_name,
			ccAddress: billingCustomerDetails.address_line1 + ' ' + billingCustomerDetails.address_line2,
			ccZipCode: parseInt(billingCustomerDetails.address_postcode),
			ccCountry: billingCustomerDetails.address_country,
			ccCity: billingCustomerDetails.address_city,
		};

		resetPaymentAuthToken();
		payload.token = token;
		payload.itineraryId = parentItineraryId;

		//API call for Payment Auth Token
		let dataPaymentAuthToken = await getPaymentAuthToken(payload);

		if (!getPaymentAuthTokenLoading) {
			if (dataPaymentAuthToken.status == false) {
				setConfirmBooking(false)
			} else {
				await process3dsToken(dataPaymentAuthToken.booking, payload)
			}
		}
	};

	const process3dsToken = async (booking, payload) => {
		/*
			CHALLENGE_PENDING 			- EMS awaits browser details;
			ADDITIONAL_DATA_PENDING 	- EMS awaits the challenge flow to be completed;
			CHALLENGE_COMPLETE 			- the challenge flow is completed;
			COMPLETE 					- EMS approved the transaction without a challenge flow.
			NON_3DS 					- Non-3DS transaction
		*/
		
		const success = async () => {
			// need to call Authorize3ds API
			await chargeWith3dsChargeId(booking, payload);
		}

		const failure = () => {
			setConfirmBooking(false)
			console.error('3DS error:');
		}

		switch (booking.ThreeDSStatus) {
		case 'ADDITIONAL_DATA_PENDING':
		case 'CHALLENGE_PENDING':
			await initiate3ds(booking.ThreeDSToken, success, failure);
			break;
		case 'CHALLENGE_COMPLETE':
			await confirmBooking(booking, payload)
			break;
		case 'COMPLETE':
		case 'NON_3DS':
			await confirmBooking(booking, payload)
			break;
		case null:
		case undefined:
			console.log('successCallback')
			break;
		default:
			console.log('errorCallback')
			break;
		}
	}

	// 3ds popup
	const initiate3ds = async (token, cbSuccess, cbFailure) => {
		handle3dsModalOpen()

		webbeds.initiate3dsAuth('widget3ds2', token)
			.then(cbSuccess, cbFailure)
			.catch(function (error) { console.error(error); cbFailure(); })
			.finally(() => handle3dsModalClose());
	}

	// API call for Authorize3ds
	const chargeWith3dsChargeId = async (booking, payload) => {
		payload.token && delete payload.token;
		payload.orderCode = booking.OrderCode;
		payload.ccAuthorizationId = booking.AuthorizationId;
		let dataPaymentAuth3ds = await getPaymentAuthorize3ds(payload);
		
		if (!getPaymentAuthorize3dsLoading) {
			if (dataPaymentAuth3ds.status == false) {
				setConfirmBooking(false)
			} else {
				await process3dsToken(dataPaymentAuth3ds.booking, payload)
			}
		}
	}

	// API Call for booking confirmation
	const confirmBooking = async (booking, payload) => {
		payload.token && delete payload.token;
		payload.orderCode = booking.OrderCode;
		payload.ccAuthorizationId = booking.AuthorizationId;
		payload.customerId = user.user.Cod;
		payload.ccAccept = 1;
		payload.ccEmail = user.user.Email;
		payload.ccPhone = user.user.Tel;

		await getConfirmBooking(payload);
	}

	const { errors, touched, handleSubmit, getFieldProps } = formik;

	return (
		<Grid item xs={10}>
			<FormikProvider value={formik}>
				<Form autoComplete='off' noValidate onSubmit={handleSubmit} id='ccPaymentForm'>
					<Grid className='payment-sec'>
						<Paper>
							<Typography className='payment-heading'>
								{t('Payment Details')}
							</Typography>

							<Box noValidate autoComplete='off'>
								<Grid container item sm spacing={2} direction='row' className='mar-top-bot'>
									<Grid item xs container direction='row' spacing={1}>
										<TextField
											fullWidth
											type='text'
											label={t('Card holders name')}
											{...getFieldProps('card_holders_name')}
											helperText={
												touched.card_holders_name &&
												errors.card_holders_name
											}
										/>
									</Grid>
								</Grid>
								<Grid container item sm spacing={2} direction='row' className='mar-top-bot'>
									<Grid item xs container direction='row' spacing={1}>
										<TextField
											fullWidth
											type='number'
											label={t('Credit card number')}
											max={19}
											{...getFieldProps('credit_card_number')}
											helperText={
												touched.credit_card_number &&
												errors.credit_card_number
											}
										/>
									</Grid>
								</Grid>
								<Grid container item sm spacing={2} direction='row' className='mar-top-bot'>
									<Grid item xs container direction='row' spacing={1}>
										<FormControl sx={{ width: '33%' }}>
											<InputLabel id="simple-select-autowidth-label">{t('Month')}</InputLabel>
											<Select
												fullWidth
												labelId="simple-select-autowidth-label"
												id="simple-select-autowidth"
												label={t('Month')}
												value={formik.values.expiry_month}
												onChange={(newValue) => {
													formik.setFieldValue('expiry_month', (newValue) ? newValue.target.value : '')
												}}
											>
												{range(1, 12).map((x,i) =>
													<MenuItem key={i} value={x}>{x}</MenuItem>
												)}
											</Select>
											{formik.errors.expiry_month && touched.expiry_month ? <Typography className='errorMsg'> {formik.errors.expiry_month} </Typography> : ''}
										</FormControl>
										<FormControl sx={{ width: '66%', margin: '0px 2px' }}>
											<InputLabel id="simple-select-autowidth-label">{t('Year')}</InputLabel>
											<Select
												fullWidth
												labelId="simple-select-autowidth-label"
												id="simple-select-autowidth"
												label={t('Year')}
												value={formik.values.expiry_year}
												onChange={(newValue) => {
													formik.setFieldValue('expiry_year', (newValue) ? newValue.target.value : '')
												}}
											>
												{range(moment().year(), moment().add(12, 'years').year()).map((x,i) =>
													<MenuItem key={i} value={x}>{x}</MenuItem>
												)}
											</Select>
											{formik.errors.expiry_year && touched.expiry_year ? <Typography className='errorMsg'> {formik.errors.expiry_year} </Typography> : ''}
										</FormControl>
									</Grid>
									<Grid item xs container direction='row' spacing={1}>
										<TextField
											fullWidth
											type='password'
											label={t('Security number')}
											{...getFieldProps('security_number')}
											helperText={
												touched.security_number &&
												errors.security_number
											}
										/>
									</Grid>
								</Grid>
							</Box>
							<Box>
								<Typography
									className='address-heading'
									variant='span'
									component='span'
								>
									{t('Address Verification System')}
								</Typography>
								<Divider />
								<Grid
									container
									item
									sm
									spacing={2}
									direction='row'
									className='mar-top-bot'
								>
									<Grid
										item
										xs
										container
										direction='row'
										spacing={1}
									>
										<TextField
											fullWidth
											type='text'
											label={t('First Name')}
											{...getFieldProps('first_name')}
											//error={Boolean(touched.first_name && errors.first_name)}
											helperText={t(touched.first_name && errors.first_name)}
										/>
									</Grid>
									<Grid
										item
										xs
										container
										direction='row'
										spacing={1}
									>
										<TextField
											fullWidth
											type='text'
											label={t('Last Name')}
											{...getFieldProps('last_name')}
											//error={Boolean(touched.last_name && errors.last_name)}
											helperText={t(touched.last_name && errors.last_name)}
										/>
									</Grid>
								</Grid>
								<Grid
									container
									item
									sm
									spacing={2}
									direction='row'
									className='margin-bottom-16'
								>
									<Grid
										item
										xs
										container
										direction='row'
										spacing={1}
									>
										<TextField
											fullWidth
											type='text'
											label={t('Address')}
											{...getFieldProps('address')}
											//error={Boolean(touched.address && errors.address)}
											helperText={t(touched.address && errors.address)}
										/>
									</Grid>
								</Grid>
								<Grid
									container
									item
									sm
									spacing={2}
									direction='row'
									className='margin-bottom-16'
								>
									<Grid
										item
										xs
										container
										direction='row'
										spacing={1}
									>
										<TextField
											type='text'
											label={t('Zip Code')}
											{...getFieldProps('postcode')}
											//error={Boolean(touched.postcode && errors.postcode)}
											helperText={ t(touched.postcode && errors.postcode) }
										/>
									</Grid>
								</Grid>
								<Grid
									container
									item
									sm
									spacing={2}
									direction='row'
									className='margin-bottom-16'
								>
									<Grid
										item
										xs
										container
										direction='row'
										spacing={1}
									>
										<Country
											value={formik.values.country}
											onChange={value =>
												formik.setFieldValue(
													'country',
													value ? value : ''
												)
											}
											setLabel='Country'
											setStateValue={value =>
												formik.setFieldValue(
													'country',
													value ? value : ''
												)
											}
										/>

										{formik.errors.country && touched.country ? (
											<Typography className='errorMsg'>
												{t(formik.errors.country.Country_Code)}
											</Typography>
										) : (
											''
										)}
									</Grid>
									<Grid
										item
										xs
										container
										direction='row'
										spacing={1}
									>
										<TextField
											fullWidth
											type='text'
											label={t('City')}
											{...getFieldProps('city')}
											//error={Boolean(touched.city && errors.city)}
											helperText={t(touched.city && errors.city)}
										/>
									</Grid>
								</Grid>
							</Box>
							<PaymentTerms />

							<Grid>
								<Typography className='terms-text'>
									<Checkbox
										{...getFieldProps('termsAndConditions')}
										className={
											'form-check-input ' +
											(errors.termsAndConditions &&
												touched.termsAndConditions
												? ' is-invalid'
												: '')
										}
									/>
									{t('I have read and accept the booking')}{' '}
									<Button
										onClick={handleOpen}
										className='terms-cond'
									>
										{t('Terms and Conditions')}
									</Button>
								</Typography>
								{errors.termsAndConditions && touched.termsAndConditions && (
									<Typography
										paragraph={true}
										className='error-message'
									>
										{t(errors.termsAndConditions)}
									</Typography>
								)}
							</Grid>

							<Grid
								item
								xs
								sm
								container
								direction='row'
								className='pad-top-24'
								spacing={2}
								justifyContent='end'
							>
								<Grid item>
									<Button
										variant='outlined'
										size='large'
										className='cancel-button'
										disabled={isSubmitting}
									>
										{t('CANCEL')}
									</Button>
								</Grid>
								<Grid item>
									<LoadingButton
										fullWidth
										size='large'
										type='submit'
										variant='contained'
										loading={isSubmitting}
									>
										{t('COMPLETE PAYMENT')}
									</LoadingButton>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Form>
			</FormikProvider>
			<PaymentTerms
				openModal={openModal}
				handleModalClose={handleModalClose}
			></PaymentTerms>
			<Modal
				open={open3dsModal}
				onClose={handle3dsModalClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="modal-bg"
			>
				<Box className="modal-box-3ds" id='widget3ds2'></Box>
			</Modal>
		</Grid>
	);
};

export default Payment;
