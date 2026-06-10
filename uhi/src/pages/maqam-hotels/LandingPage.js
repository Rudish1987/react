import React, { useEffect, useState } from 'react';
import { Container,Box } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';

import HotelSearchProvider from '../../context/hotel/SearchContext';
import SearchResults from '../../components/hotel/SearchResults'
import { useStoreActions } from 'easy-peasy';
import { useSearchHotels } from '../../context/hotel/hooks';
import SearchresultsSkeleton from '../../components/skeleton/SearchresultsSkeleton';

import Constants from '../../helpers/constants'

const HotelsPage = () => {
	const location = useLocation();
	let rebook = false;
	if(location.state !== null) {
		rebook = location.state.rebook ?? false;
	}
	const getResults = useStoreActions(actions => actions.btoc.getResults);
	const { searchHotels, isLoading } = useSearchHotels();
	const { destination } = useParams()
	const [ counter, setCounter ] = useState(0);

	let stepperNo = (destination === 'madinah') ? Constants.STEP_TEXT_MADINAH : Constants.STEP_TEXT_MAKKAH;

	useEffect(() => {

		const fetchHotel = async () => {
			await getResults(searchHotels(destination))
		}
		fetchHotel()

	},[destination, counter])

	const handlerefresh = () => {
		setCounter(counter+1)
	}

	if (isLoading) return (<SearchresultsSkeleton stepperNo={stepperNo} rebook={rebook}/>);
	return (
		<>
			<Box className="box-body-flex" sx={{ paddingTop: '32px!important' }}>
				<Container className="body-container-margin">
					{/* Need to know why  HotelSearchProvider required here */}
					<HotelSearchProvider>
						<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
							<SearchResults handletryagain={handlerefresh} rebook={rebook}/>
						</Container>
					</HotelSearchProvider>
				</Container>
			</Box>
		</>
	);
}

export default HotelsPage;
