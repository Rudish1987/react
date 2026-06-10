import * as Yup from 'yup'
import React, { useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Button, Checkbox, } from '@mui/material'
import Divider from '@mui/material/Divider';

import '../../css/agentCredit.css';
import PaymentTerms from './PaymentTerms'
import { useStoreState, useStoreActions} from 'easy-peasy';
import { FormatNumber, getRebookItinerary } from '../../helpers/utils';
import { useFormik, Form, FormikProvider } from 'formik'
import { LoadingButton } from '@mui/lab';
import {
	useConfirmCreditBooking,
} from '../../context/hotel/hooks'
import {useCurrencyConvertionRate, useSendUOMail} from '../../context/booking/hooks'
import { useNavigate } from 'react-router-dom';
import Constants from '../../helpers/constants';

const AgentCredit = ({passCurrency}) => {
	const { t } = useTranslation();
	const parentItineraryId = useStoreState(actions => actions.btoc.itineraryDetails.itineraryid)
	const bookingCode = useStoreState(actions => actions.btoc.itineraryDetails.bookingCode)
	const bookingStatus = useStoreState(actions => actions.btoc.itineraryDetails.bookingStatus)
	const afterBookingpackagedetails = useStoreState(actions => actions.btoc.afterBookingpackagedetails)
	const packagedetails = useStoreState(actions => actions.btoc.itineraryDetails.packagedetails)
	const currencyConvertionRate = useStoreState(actions => actions.btoc.currencyConvertionRate.conversionRate)
	const parentBookingCode = useStoreState(actions => actions.btoc.afterBookingItineraryDetails.parentBookingCode)
	const rebook = useStoreState(actions => actions.btoc.itineraryDetails.rebook)
	const rooms = useStoreState(s => s.btoc.filters.rooms);
	const passengerNum = rooms.reduce((a, b) => a + (b.adultsCount * b.room), 0);
	const { getCurrencyRate } = useCurrencyConvertionRate();
	const navigate = useNavigate();
	const loggedinUser = useStoreState(s => s.user)
	const [openModal, setTandCModal] = useState();
	const [isSubmitting, setConfirmBooking] = useState(false)

	const { getConfirmCreditBooking, isLoading: getConfirmCreditBookingLoading } = useConfirmCreditBooking();
	const resetStatePackage = useStoreActions(actions => actions.btoc.itineraryDetails.resetState)
	const getCurrencyConversionRate = useStoreActions(actions => actions.btoc.getCurrencyConversionRate)
	let passengerCount = afterBookingpackagedetails.groundService.paxCount ? afterBookingpackagedetails.groundService.paxCount : passengerNum;

	const { getUOMail } = useSendUOMail();

	const handleOpen = () => {
		setTandCModal(true)
	}
	const handleModalClose = () => {
		setTandCModal(false)
	}

	// Need this variable for new text if required. Keep it commented for
	const reBookItinerary = getRebookItinerary(afterBookingpackagedetails, packagedetails, passengerCount);
	const rebookItineraryAmount = reBookItinerary.itineraryAmount
	let Currency = passCurrency
	let ItineraryAmount = rebookItineraryAmount;

	let availableCreditLimit = Number(loggedinUser.user.credit_limit.AvailableCredit) * Number(currencyConvertionRate)
	let remainingCredit = availableCreditLimit - ItineraryAmount;

	const RegisterSchema = Yup.object().shape({
		termsAndConditions: Yup.boolean().oneOf([true], t('You must accept the terms and conditions'))
	})

	const formik = useFormik({
		initialValues: {
			termsAndConditions: false
		},
		validationSchema: RegisterSchema,
		onSubmit: async () => {
			setConfirmBooking(true)
			let payload = {
				'itineraryId': parentItineraryId,
				'bookedItnNumber': parentBookingCode ?? 0
			}
			if(!rebook) {
				payload.bookedItnNumber = 0
			}
			await getConfirmCreditBooking(payload)
		}
	});
	
	useEffect(() => {
		const currencyConvertionRate = async () => {
			await getCurrencyConversionRate(getCurrencyRate());
		}
		currencyConvertionRate()
	}, [])

	useEffect(() => {
		if( bookingCode > 0 ){
			if( bookingStatus == Constants.MAQAM_BOOKING_CONFIRMED ){
				getUOMail(bookingCode)
			}

			resetStatePackage()
			navigate(Constants.USER_BOOKING_CONFIRMATION, { state: { mainParentBookingCode: bookingCode } });
		} else {
			setConfirmBooking(false)
		}

	}, [getConfirmCreditBookingLoading, bookingCode, bookingStatus])


	const { errors, touched, handleSubmit, getFieldProps } = formik;


	return (
		<Grid>
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit} id="creditPaymentForm">
					<Typography className="agentHeading">{t('Payment Details')}</Typography>
					{rebook && <Typography className="agentContent">{t('The Amount of '+ FormatNumber(ItineraryAmount, 2)+' '+ t(Currency) +' will be deducted from your available credit and invoiced to your Account.')}</Typography>}
					{!rebook && <Typography className="agentContent">{t('The Amount of '+ FormatNumber(ItineraryAmount, 2)+' '+ t(Currency) +' will be deducted from your available credit and invoiced to your Account:')}</Typography>}

					<Grid container className="margin-20">
						<Grid item xs={5}>Available Credit Balance:</Grid>
						<Grid item xs={4}>{`${FormatNumber(availableCreditLimit, 2)}`} {t(Currency)}</Grid>
						<Grid item xs={5} className="margin-5">{t('Payment:')}</Grid>
						<Grid item xs={4} className="margin-5">{`${FormatNumber(ItineraryAmount, 2)}`} {t(Currency)}</Grid>
						<Grid item xs={8} className="margin-5">
							<Divider className="greyDivi" /></Grid>
						<Grid item xs={5} className="font-600">{t('Remaining Credit After Payment:')}</Grid>
						<Grid item xs={4} className="font-600">{`${FormatNumber(remainingCredit, 2)}`} {t(Currency)}</Grid>
					</Grid>

					<Grid>
						<Typography className="terms-text"><Checkbox {...getFieldProps('termsAndConditions')}
							className={'form-check-input ' + (errors.termsAndConditions && touched.termsAndConditions ? ' is-invalid' : '')} />{t('I have read and accept the booking')} <Button onClick={handleOpen} className="terms-cond">{t('Terms and Conditions')}</Button></Typography>
						{errors.termsAndConditions && <Typography paragraph={true} className="error-message">{errors.termsAndConditions}</Typography>}
					</Grid>

					<Grid container direction="row" sx={{ pt: 3 }} spacing={2} justifyContent='end'>
						<Grid item>
							<Button variant="outlined" size='large' sx={{ justifyContent: 'center', px: 7, width: '100%', color: (theme) => theme.palette.primary.main, border: `1px solid ${(theme) => theme.palette.primary.main}` }}>{t('CANCEL')}</Button>
						</Grid>
						<Grid item>
							{/* <Button variant="contained" size='large' type='submit'>{t('COMPLETE PAYMENT')}</Button> */}
							<LoadingButton
								fullWidth
								size="large"
								type="submit"
								variant="contained"
								loading={isSubmitting}
							>
								{t('COMPLETE PAYMENT')}
							</LoadingButton>
						</Grid>
					</Grid>
				</Form>
			</FormikProvider>
			<PaymentTerms openModal={openModal} handleModalClose={handleModalClose}></PaymentTerms>
		</Grid>
	)
}

export default AgentCredit