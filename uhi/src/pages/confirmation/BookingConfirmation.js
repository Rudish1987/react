import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import Booking from '../../components/confirmation/Booking'
import { AfterBookingDetails } from '../../context/booking/hooks';
import LandingSkeleton from '../../components/skeleton/LandingSkeleton';
import { Container, Box, Grid, Typography, Button } from '@mui/material'
import Constants from '../../helpers/constants'
import { PassengerStepperHeader } from '../../components/CommonHeaders/PassengerStepperHeader';

const BookingConfirmation = () => {
	const { t } = useTranslation();
	const { state } = useLocation();
	const navigate = useNavigate();
	const { mainParentBookingCode } = state;

	/*TODO After confirmation need to catch the itinerary ID here */
	const { getAfterBookingDetails, isLoading } = AfterBookingDetails();
	useEffect(() => {
		const fetchPassengerDetails = async () => {
			await getAfterBookingDetails(mainParentBookingCode);
		}
		fetchPassengerDetails();
	}, [])

	const closeBtnClick = () => {
		navigate('/');
	}
	const myBookingBtnClick = () => {
		navigate(Constants.USER_MY_BOOKING);
	}

	if (isLoading) return (<LandingSkeleton />);
	return (
		<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
			<Page title={t('bookingConfirmation.title')}>
				<PassengerStepperHeader stepLevel={t(Constants.STEP_BOOKING_DETAILS)} />
				<Box>
					<Grid container className="booking-InnerSec">
						<Grid item xs={10}>
							<Typography className="bookingHeader">{t('Booking Confirmation')}</Typography>
							<Typography>{t('Congratulations, your booking is now confirmed and confirmation numbers for Hotel, Transportation and Ground Services have been issued.')}</Typography>
							<Booking />
							<Grid container className="pull-top-24" spacing={2} justifyContent='end'>
								<Grid item xs={2}>
									<Button variant="outlined" size='large' className="redborderButton" onClick={closeBtnClick}>{t('CLOSE')}</Button>
								</Grid>
								<Grid item xs={2}>
									<Button variant="contained" size='large' type='submit' onClick={myBookingBtnClick}>{t('MY BOOKINGS')}</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>

			</Page>
		</Container>
	);
}

export default BookingConfirmation;