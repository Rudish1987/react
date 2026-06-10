import * as Yup from 'yup';
import React, { useState } from 'react';
import * as framebus from 'framebus';
import { Box, Modal, Grid, TextField, Typography, Button, Divider, Checkbox} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TermsandConditions from '../visa/TermsandConditions';
import '../../css/payment.css';
import '../../css/passengerDetails.css';
import { useStore, useStoreActions } from 'easy-peasy';
import { useFormik, Form, FormikProvider } from 'formik';
import { usePaymentAuthToken, usePaymentAuthorize3ds, useConfirmBooking } from '../../context/payment/hooks';
import { FormatNumber } from '../../helpers/utils'
import CountrySelect from '../common/CountrySelect';
import { LoadingButton } from '@mui/lab';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useNavigate } from 'react-router-dom';
import Constants from '../../helpers/constants';
import { useLocale } from '../../context/LocaleContext';
import CreditCardIframe from '../payment/CreditCardIframe';

export default function Payment({ visaTotalFee, goBackToTravelerList, onApiError }) {
	const { t } = useTranslation();
	const store = useStore();
	const navigate = useNavigate();
	const { locale } = useLocale();
	const { getPaymentAuthToken, isLoading: getPaymentAuthTokenLoading } = usePaymentAuthToken();
	const { getPaymentAuthorize3ds, isLoading: getPaymentAuthorize3dsLoading } = usePaymentAuthorize3ds();
	const { getConfirmBooking } = useConfirmBooking();
	const webbeds = window.webbeds;
	const [isSubmitting, setConfirmBooking] = useState(false);
	const [openModal, setTandCModal] = useState();
	const [open3dsModal, set3dsModal] = useState(false);
	const country = store.getState().btob.defaultCountry;
	const user = store.getState().user;
	const parentItineraryId = store.getState().btob.visa.itineraryDetails.itineraryId;
	const setBillingCreditCardCustomer = store.getActions().btob.payment.setBillingCreditCardCustomer;
	const itineraryDetails = store.getState().btob.visa.itineraryDetails
	const setConfirmMsg = useStoreActions(actions => actions.btob.visa.setConfirmMsg)

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
	const FramebusEvents =
		{
			targetUrl: process.env.NODE_ENV == 'development' ? Constants.CREDIT_CARD_TARGET_URL_DEV : Constants.CREDIT_CARD_TARGET_URL_PROD,
			tokeniserUrl: process.env.NODE_ENV == 'development' ? Constants.CREDIT_CARD_TOKENIZE_URL_DEV : Constants.CREDIT_CARD_TOKENIZE_URL_PROD,
			returnUrl: process.env.NODE_ENV == 'development' ? Constants.CREDIT_CARD_RETURN_URL_DEV : Constants.CREDIT_CARD_RETURN_URL_PROD,
			token: null,
			startEvent: function (successCallback, failCallback) {
				//Set target iframe for receiving this event
				framebus.target(this.targetUrl);
				framebus.publish('startPost', {
					returnTarget: this.returnUrl,
					postUrl: this.tokeniserUrl
				});

				function checkFramebusResponse(response) {
					//Basic checking to see that a token was generated
					if (response.cardType != null && response.token.indexOf('validationerror') === -1) {
						successCallback(response.token);
					} else {
						failCallback('Credit card validation error');
					}

					//Release framebus from the 'postDone' event. This prevents the 'postDone' event from being triggered multiple times.
					framebus.unsubscribe('postDone', checkFramebusResponse);
				}

				//Subscribe to the 'postDone' event (will be triggered by iframe after it's completed).
				//The 'checkFramebusResponse' function will handle the response from the 'postDoneEvent'
				framebus.subscribe('postDone', checkFramebusResponse)
			}
		}
	const ValidatorSchema = Yup.object().shape({
		first_name: Yup.string().min(2, t('Too Short!')).max(50, t('Too Long!')).required(t('First name is required')),
		last_name: Yup.string().min(2, t('Too Short!')).max(50, t('Too Long!')).required(t('Last name required')),
		address: Yup.string().required(t('Address is required')),
		postcode: Yup.number().typeError(t('Zip Code must be a number')).positive(t('Zip Code must be greater than zero')).required(t('Zip Code is required')),
		country: Yup.object({ Country_Code: Yup.string().required(t('Country is required')) }),
		city: Yup.string().required(t('City is required')),
		termsAndConditions: Yup.boolean().oneOf([true], t('You must accept the terms and conditions')),
	});

	const formik = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			address: '',
			postcode: '',
			country: country,
			city: '',
			termsAndConditions: false,
		},
		validationSchema: ValidatorSchema,
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
			// console.log(customer);
			setConfirmBooking(true)
			setBillingCreditCardCustomer(customer);
			tokenize();
		},
		enableReinitialize: true,
	});

	const tokenize = async () => {
		FramebusEvents.startEvent(
			(token) => {
				chargeWithToken(token);
			},
			(error) => {
				onApiError(t('Error is token creation' + error))
				setConfirmBooking(false)
			});
	}

	const chargeWithToken = async token => {
		const billingCreditCardCustomer = store.getState().btob.payment.billingCreditCardCustomer;

		let payload = {
			ccTotalCost: FormatNumber(visaTotalFee, 2),
			ccChargeFromCard: FormatNumber(visaTotalFee, 2),
			ccChargeFromCardCurrency: 'SAR', // Currency, // need to check
			ccFirstName: billingCreditCardCustomer.first_name,
			ccLastName: billingCreditCardCustomer.last_name,
			ccAddress: billingCreditCardCustomer.address_line1 + ' ' + billingCreditCardCustomer.address_line2,
			ccZipCode: parseInt(billingCreditCardCustomer.address_postcode),
			ccCountry: billingCreditCardCustomer.address_country,
			ccCity: billingCreditCardCustomer.address_city,
		};

		// resetPaymentAuthToken();
		payload.token = token;

		if (Object.keys(itineraryDetails).length > 0 && itineraryDetails.type == Constants.VISA_SAFA_STATUS_BOTH) {
			payload.itineraryId = itineraryDetails.saveParentId
		} else {
			payload.itineraryId = parentItineraryId;
		}

		//API call for Payment Auth Token
		let dataPaymentAuthToken = await getPaymentAuthToken(payload);
		if (!getPaymentAuthTokenLoading) {
			if (dataPaymentAuthToken.status == false) {
				onApiError(t('Error is payment auth token creation'))
				setConfirmBooking(false)
			} else {
				await process3dsToken(dataPaymentAuthToken.data.booking, payload)
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
		console.log('booking', booking)
		const success = async () => {
			// need to call Authorize3ds API
			await chargeWith3dsChargeId(booking, payload);
		}

		const failure = () => {
			setConfirmBooking(false)
			onApiError(t('Error is payment 3ds'))
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
			onApiError(t('successCallback'))
			break;
		default:
			onApiError(t('errorCallback'))
			break;
		}
	}

	// 3ds popup
	const initiate3ds = async (token, cbSuccess, cbFailure) => {
		handle3dsModalOpen()

		webbeds.initiate3dsAuth('widget3ds2', token)
			.then(cbSuccess, cbFailure)
			.catch(function (error) {
				onApiError(t('initiate3ds error'))
				console.log(error)
				cbFailure();
			})
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
		payload.passengers = {} // need to work
		if (Object.keys(itineraryDetails).length > 0 && itineraryDetails.type == Constants.VISA_SAFA_STATUS_BOTH) {
			payload.bookedItnNumber = itineraryDetails.itineraryId
		}

		const responseData = await getConfirmBooking(payload);
		if (responseData.status) {
			let resp = {
				'status': responseData.status,
				'description': responseData.message,
				'type': 'success'
			}
			setConfirmMsg(resp)

			if (responseData.data.package && responseData.data.package.type == Constants.VISA_SAFA_STATUS_BOTH) {
				responseData.data.package.displayType = Constants.VISA_SAFA_STATUS_SAVE
			} else {
				responseData.data.package.displayType = responseData.data.package.type
			}
			navigate('/visa/traveler-list/' + responseData.data.returnedCode, { state: { itineraryDetails: responseData.data.package } });
		} else {
			onApiError(t(responseData.message))
			setConfirmBooking(false);
		}
	}

	const { errors, touched, handleSubmit, getFieldProps } = formik;

	const disableButton = () => {
		return isSubmitting;
	}

	return (
		<>
			<FormikProvider value={formik}>
				<Form autoComplete='off' noValidate onSubmit={handleSubmit} id='ccPaymentForm'>
					<Box className='mar-top-bottm'>
						<Typography variant='h6' color='grey.900'>
							{t('Payment Details')}
						</Typography>
					</Box>
					<Box>
						<CreditCardIframe/>
					</Box>
					<Box>
						<Typography
							variant='h6'
							color='grey.900'
							paddingBottom='10px'
						>
							{t('Address Verification System')}
						</Typography>
						<Divider />
						<Grid container spacing={2} direction='row' className='mar-top-bottm'>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									type='text'
									label={t('First Name')}
									{...getFieldProps('first_name')}
									error={formik.touched.first_name && Boolean(formik.errors.first_name)}
									helperText={t(touched.first_name && errors.first_name)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									type='text'
									label={t('Last Name')}
									{...getFieldProps('last_name')}
									error={formik.touched.last_name && Boolean(formik.errors.last_name)}
									helperText={t(touched.last_name && errors.last_name)}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} direction='row' className='mar-top-bottm'>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									type='text'
									label={t('Address')}
									{...getFieldProps('address')}
									error={formik.touched.address && Boolean(formik.errors.address)}
									helperText={t(touched.address && errors.address)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									type='text'
									label={t('Zip Code')}
									{...getFieldProps('postcode')}
									error={formik.touched.postcode && Boolean(formik.errors.postcode)}
									helperText={t(touched.postcode && errors.postcode)}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} direction='row' className='mar-top-bottm'>
							<Grid item xs={12} sm={6}>
								<CountrySelect
									value={formik.values.country}
									onChange={value => formik.setFieldValue('country', value ? value : '')}
									setLabel={t('Country')}
									setStateValue={value => formik.setFieldValue('country', value ? value : '')}
									error={formik.touched.postcode && Boolean(formik.errors.postcode)}
									helperText={touched.country && errors.country && errors.country.Country_Code}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									type='text'
									label={t('City')}
									{...getFieldProps('city')}
									error={formik.touched.city && Boolean(formik.errors.city)}
									helperText={t(touched.city && errors.city)}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} direction='column' className='mar-top-bottm'>
							<Typography color='grey.900'>
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
									variant='text'
									onClick={handleOpen}
									className='terms-cond'
								>
									{t('Terms and Conditions')}
								</Button>
							</Typography>
							{errors.termsAndConditions && touched.termsAndConditions && (
								<Typography
									paragraph={true}
								>
									{t(errors.termsAndConditions)}
								</Typography>
							)}
						</Grid>
						<Grid container spacing={2} paddingTop='20px'>
							<Grid sm={12} xs={12} item display='flex' justifyContent='right'>
								<Button
									variant="outlinedSecondary"
									size='large'
									sx={{ marginRight: '20px', width: { xs: 220, lg: 200 } }}
									disabled={disableButton()}
									onClick={goBackToTravelerList}
								>
									{t('CANCEL')}
								</Button>
								<LoadingButton
									variant="contained"
									size='large'
									type='submit'
									endIcon={<ArrowForwardOutlinedIcon sx={{
										...(locale.value === 'ar' && {
											marginRight: '5px'
										})
									}}
									/>}
									loading={isSubmitting}
									loadingPosition="end"
									sx={{
										...(locale.value === 'ar' && {
											marginRight: '20px'
										})
									}}
								>
									{t('COMPLETE PAYMENT')}
								</LoadingButton>
							</Grid>
						</Grid>
					</Box>
				</Form>
			</FormikProvider>
			<TermsandConditions
				openModal={openModal}
				handleModalClose={handleModalClose}
			></TermsandConditions>
			<Modal
				open={open3dsModal}
				onClose={handle3dsModalClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="modal-bg"
			>
				<Box className="modal-box-3ds" id='widget3ds2'></Box>
			</Modal>
		</>
	);
}
