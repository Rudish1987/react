import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'
import Page from '../../components/Page';
import Passenger from '../../components/confirmation/Passenger';
import { useStoreActions,useStoreState } from 'easy-peasy';
import { usePassengerFlightDetails, AfterBookingDetails } from '../../context/booking/hooks';
import LandingSkeleton from '../../components/skeleton/LandingSkeleton';
import { Container } from '@mui/material'
import { useVisaFeesCalculation } from '../../context/visa/hooks';
import { CityAirportApi }  from '../../api/BookingApi';

const PassengerDetails = () => {
	const resetPassengerFlight = useStoreActions(actions => actions.btoc.itineraryDetails.resetPassengerFlight);
	const { getPassengerFlight, isLoading } = usePassengerFlightDetails();
	const { t } = useTranslation();
	const navigate = useNavigate();
	
	const user = useStoreState(s => s.user);
	const setUser = useStoreActions(s => s.btoc.setUser);
	const setSaved = useStoreActions(s => s.btoc.setSaved);
	const airports = useStoreState(s => s.btoc.cityArport);
	const setcityAirport = useStoreActions(actions => actions.btoc.setcityArport);
	const { visaFeesCalculation, isLoading: getVisaLoading } = useVisaFeesCalculation();
	const getSavedVisaFees = useStoreActions(actions => actions.btoc.getSavedVisaFees);

	const parentItineraryId = useStoreState(
		actions => actions.btoc.itineraryDetails.itineraryid
	);
	const { getAfterBookingDetails,isLoading: getMyPackLoading} = AfterBookingDetails();

	const tokenString = localStorage.getItem('token');

	useEffect(() => {
		setSaved(true)
		if( !tokenString || Object.keys(user).length === 0 ){
			localStorage.removeItem('token')
			setUser({})
			navigate('/');
		}else{
			const loadMyPack = async (bookingCode) => {
				await getAfterBookingDetails(bookingCode, 'saved');
			}
			loadMyPack(parentItineraryId);

			const fetchVisaDetails = async () => {
				await getSavedVisaFees(visaFeesCalculation());
			}
			fetchVisaDetails();

			resetPassengerFlight();
			const fetchPassengerFlight = async () => {
				await getPassengerFlight();
			}
			fetchPassengerFlight()
		}
		if (airports.length == 0) {
			CityAirportApi().then((res) => {
				let resData = [];
				for (let j = 0; j < res.length; j++) {
					resData.push(
						{
							Cod: res[j].Cod,
							AirportName: res[j].AirportName,
							CityCode: res[j].CityCode,
							CityName: res[j].CityName,
							AirportNameAR: res[j].AirportNameAR,
							CityNameAR: res[j].CityNameAR
						}
					);
				}
				setcityAirport(resData);
			});
		}
	}, [])
	/*
	* This should be oce all the loading is done then only it load the passenger
	* */
	if (!isLoading && !getMyPackLoading && !getVisaLoading) return (
		<Container maxWidth='xl' sx={{paddingLeft: '0!important', paddingRight: '0!important'}}>
			<Page title={t('passengerDetails.title')}>
				<Passenger/>
			</Page>
		</Container>);
	return (<LandingSkeleton/>);
}

export default PassengerDetails;