import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Page from '../../components/Page';
import Booking from '../../components/confirmation/Booking'
import { useLocation, useNavigate } from 'react-router-dom';
import { AfterBookingDetails } from '../../context/booking/hooks';
import { Container, Box, Grid, Typography, Button, Link } from '@mui/material'
import LandingSkeleton from '../../components/skeleton/LandingSkeleton';
import Constants from '../../helpers/constants'
import Breadcrumbs from '@mui/material/Breadcrumbs';

const BookingDetails = () => {
	const { t } = useTranslation();
	const { state } = useLocation();
	const navigate = useNavigate();
	const { mainParentBookingCode } = state;

	const myBookingBtnClick = () => {
		navigate(Constants.USER_MY_BOOKING);
	}

	const breadcrumbs = [
		<Link underline="hover" key="1" className='breadcrums-link' href="#" onClick={myBookingBtnClick}>
			{t('My Bookings')}
		</Link>,

		<Typography key="3" className='breadcrums-link-active'>
			{t('Booking details')}
		</Typography>,
	];

	const { getAfterBookingDetails, isLoading } = AfterBookingDetails();
	useEffect(() => {
		const fetchPassengerDetails = async () => {
			await getAfterBookingDetails(mainParentBookingCode);
		}
		fetchPassengerDetails();
	}, [])

	if (isLoading) return (<LandingSkeleton />);
	return (
		<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
			<Page title={t('bookingDetails.title')}>
				<Box>
					<Grid className="breadcrums-sec">
						<Breadcrumbs
							separator={<NavigateNextIcon fontSize="small" />}
							aria-label="breadcrumb"
						>
							{breadcrumbs}
						</Breadcrumbs>

					</Grid>
					<Grid container className="booking-InnerSec">
						<Grid item xs={10}>
							<Booking />
							<Grid container className="pull-top-24" spacing={2} justifyContent='end'>
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

export default BookingDetails;