import React, { useEffect } from 'react';
import Page from '../../components/Page';
import { useTranslation } from 'react-i18next';
import SearchForm from '../../components/hotel/SearchForm';
import {
	Box,
	Container,
	Paper,
	Typography,
	Grid
} from '@mui/material';
import Image from '../../Assets/banner_image_2_1.png';
//import MyBookings from '../../components/Visa/MyBookingsList';
import MyBookings from '../users/MyBooking';


// import Footer from '../../components/guests/Footer';
// import NewsSection from '../../components/guests/NewsSection';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { useDeleteItenerary } from '../../context/hotel/hooks'
import { useLocation, useNavigate } from 'react-router-dom';

import { DirectLoginApi, LogoutApi } from '../../api/AuthApi';
import Constants from '../../helpers/constants'
import { updateCustomerApi } from '../../api/BookingApi';

const LandingPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const resetStatePackage = useStoreActions(actions => actions.btoc.itineraryDetails.resetState);
	const resetAfterBookingPackageDetails = useStoreActions(actions => actions.btoc.resetAfterBookingpackagedetails);
	const parentItineraryID = useStoreState(actions => actions.btoc.itineraryDetails.itineraryid);
	const setArrivalAirport = useStoreActions(actions => actions.btoc.itineraryDetails.setArrivalAirport);
	const setDepatureAirport = useStoreActions(actions => actions.btoc.itineraryDetails.setDepatureAirport);
	const resetAfterBookingItineraryDetails = useStoreActions(actions => actions.btoc.resetAfterBookingItineraryDetails);
	const { deleteItenerary, isLoading: deleteBookingLoading } = useDeleteItenerary();
	const setRebook = useStoreActions(actions => actions.btoc.itineraryDetails.setRebook);
	const setUser = useStoreActions(s => s.btoc.setUser);
	const results = useStoreState(s => s.btoc.results);
	const setResults = useStoreActions(actions => actions.btoc.setResults);
	const search = useLocation().search;
	const authUserToken = new URLSearchParams(search).get('_token');
	const user = useStoreState(s => s.user);
	const isSaved = useStoreState(s => s.btoc.isSaved);

	useEffect(() => {
		setRebook(false);
		resetAfterBookingItineraryDetails()
		resetAfterBookingPackageDetails()
	}, [])

	useEffect(() => {

		if (authUserToken) {
			getDirectLogin()
		}

		if (!isSaved && parentItineraryID) {
			deleteItenerary({ 'itineraryId': parentItineraryID })
			if (!deleteBookingLoading) {
				resetStatePackage()
			}
		}

		if (Object.keys(results).length > 0) {
			setResults({})
		}
		setArrivalAirport({})
		setDepatureAirport({})
	}, [parentItineraryID])

	const getDirectLogin = async () => {

		if (Object.keys(user).length > 0) {
			await LogoutApi(user)
		}

		/**
		 * TODO: for logout Api need to send status for successful logout
		 * because in useHttp does not sent any status for error
		 * */
		setUser({})

		const getdata = await DirectLoginApi({ '_token': authUserToken })
		if (getdata.token) {
			setUser(getdata);
			if (parentItineraryID) {
				const updateCust = await updateCustomerApi(getdata.user, parentItineraryID);
				if (updateCust) {
					navigate(Constants.USER_PACKAGE_URL)
				}
			}
		}
	};

	return (
		<Box className="heroBannerSection box-body-flex">
			<Container maxWidth={false} sx={{ padding: '0px!important' }}>
				<Page title={t('dashboard.title')} >
					<Container maxWidth={false} sx={{ padding: '0px!important' }} >
						<Paper elevation={3} sx={{
							p: 2,
							backgroundImage: `url(${Image})`,
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							//minHeight: 600,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							borderRadius: 0,
						}}>
							<Container>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}
										sx={{
											paddingTop: { lg: '176px!important', xs: '4rem!important' }, color: '#fff'
										}}>
										<Typography variant="h2">
											{t('EMBRACE UMRAH')}
										</Typography>
										<Typography variant="h4">
											{t('Complete The Hajj and Umrah In The Service of Allah.')}
										</Typography>
									</Grid>
									<Grid item xs={12} md={5} sx={{
										padding: { lg: '2rem!important',xs: '2rem!important' }, marginLeft: { lg: '45px', xs: '12px' },
										backgroundColor: '#fff', boxShadow: 3,
										borderRadius: 1,
										height: '100%',
										minHeight: 250,
										marginTop: '20px'
									}}>
										<SearchForm />
									</Grid>
								</Grid>
							</Container>
						</Paper>
						<Container sx={{paddingBottom:'30px'}}>
							<MyBookings/>
						</Container>
					</Container>
					
				</Page >
			</Container>
		</Box>

	)
};

export default LandingPage;