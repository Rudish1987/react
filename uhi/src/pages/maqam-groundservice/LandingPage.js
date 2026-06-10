import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import GroundServiceSearchResults from '../../components/groundService/searchResults';
import { useSearchGroundServices } from '../../context/groundService/hooks';
import SearchresultsSkeleton from '../../components/skeleton/SearchresultsSkeleton';
import { useStoreActions } from 'easy-peasy';
import { groundServiceCategory } from '../../api/GroundServiceCategoryApi';
import Constants from '../../helpers/constants'
import { useLocation } from 'react-router-dom';

const GroundServicePage = () => {
	const location = useLocation();
	let rebook = false;
	if(location.state !== null) {
		rebook = location.state.rebook ?? false;
	}
	const { searchGroundServices, isLoading } = useSearchGroundServices();
	const [categorylist, setCategoryData] = useState([]);
	const getGroundServiceResults = useStoreActions(actions => actions.btoc.getGroundServiceResults);
	const [ counter, setCounter ] = useState(0);

	useEffect(() => {
		const fetchGroundServices = async () => {
			await getGroundServiceResults(searchGroundServices());
		}

		fetchGroundServices()

		const fetchMaqamGSCategory = async () => {
			const category = await groundServiceCategory();
			await setCategoryData(category)
		}
		fetchMaqamGSCategory()
	}, [counter])

	let handlerefresh = () => {
		setCounter(counter + 3)
	}
	
	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading) return (<SearchresultsSkeleton stepperNo={Constants.STEP_TEXT_GROUNDSERVICES} rebook={rebook}/>);
	return (
		<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
			<GroundServiceSearchResults categorylist={categorylist} handletryagain={handlerefresh} rebook={rebook} />
			
		</Container>
	);
}


export default GroundServicePage;
