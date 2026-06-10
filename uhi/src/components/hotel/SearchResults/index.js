import React, { useState, useEffect } from 'react';

// material
import { Box, Grid, Stack, Typography, TextField, } from '@mui/material';

import ResultRow from './ResultItems/ResultRow';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom'

import { Filter } from '../../Filter';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ImageGallery from 'react-image-gallery';
import { useSaveRoom } from '../../../context/hotel/hooks'
import { usePackageBody } from '../../../api/usePackageBody';
import Constants from '../../../helpers/constants'
import { manageRebookRedirection } from '../../../helpers/utils'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'react-image-gallery/styles/css/image-gallery.css';
import './index.css';

import store from '../../../Store';

//Common header components(summary, myPackage)
import { Summary } from '../../CommonHeaders/Summary';
import { StepperHeader } from '../../CommonHeaders/StepperHeader';
import { MyPackage } from '../../CommonHeaders/MyPackage/MyPackage';

import {EmptySearchResultStep} from '../../EmptySearchResultStep'
import SearchresultsSkeleton from '../../skeleton/SearchresultsSkeleton'
import { useAccommodationResult } from '../../../api/useAccommodationResult'
import { useTheme } from '@mui/material/styles';
import SnackbarComponent from '../../common/Snackbar';

const style = {
	boxShadow: 24,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%'
};

const SearchResults = ({handletryagain, rebook}) => {
	const { t } = useTranslation();
	const results = useStoreState(s => s.btoc.results)
	const theme = useTheme();
	const [snackAlertOpen, setSnackAlertOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [typeOfMessage, settypeOfMessage] = React.useState('');

	const requests = useStoreState(s => s.btoc.requests)
	const [items, setItems] = useState([]);
	const { saveRoom, isLoading:saveBookingLoading } = useSaveRoom();
	const navigate = useNavigate();
	const { prepareHotelPackageData } = usePackageBody();
	const { prepareAccommodationList } = useAccommodationResult();
	const parentItineraryID = useStoreState(actions => actions.btoc.itineraryDetails.itineraryid);
	const failedItineraryDetails = useStoreState(s => s.btoc.failedItineraryDetails)
	const setFailedItineraryDetails = useStoreActions(actions => actions.btoc.setFailedItineraryDetails);

	const setHotel = useStoreActions(actions => actions.btoc.setHotel);
	const getItineraryId = useStoreActions(actions => actions.btoc.itineraryDetails.getItineraryId);
	const [hotelsCount,setHotelsCount] =  useState(0);
	const [allHotels,setAllHotels] = useState([]);
	const [filteredHotels,setFilteredHotels] = useState([]);
	const [open, setOpen] = useState(false);
	const [images, setImages] = useState([]);
	const [selectedRooms,setSelectedRooms] = useState({hotels:{}});
	const [disableSelect, setDisable] = useState(false);

	const [initiateSearch, setInitiateSearch] = useState(false);
	const itineraryDetails = useStoreState(actions => actions.btoc.itineraryDetails);

	const { destination } = useParams()

	const handleClose = () => setOpen(false);
	const handleOpen = function (hotelImages) {
		setImages(() => hotelImages);
		setOpen(true);
	}

	const getMinAndMaxDistance = () => {
		const distanceArray = allHotels.map(item => {
			const distance = (Math.round((2 * 6371 * Math.asin(Math.sqrt(Math.pow((Math.sin((Constants.KAABA_LATITUDE * (3.14159 / 180) - item.geoPoint.lat * (3.14159 / 180)) / 2)), 2) + Math.cos(Constants.KAABA_LATITUDE * (3.14159 / 180)) * Math.cos(item.geoPoint.lat * (3.14159 / 180)) * Math.pow(Math.sin(((Constants.KAABA_LONGTITUDE * (3.14159 / 180) - item.geoPoint.lng * (3.14159 / 180)) / 2)), 2)))) * 100) / 100).toFixed(2);
			return distance;
		});
		distanceArray.sort(function(a, b){
			return b - a
		});
		return [Math.floor(distanceArray[distanceArray.length - 1]), Math.ceil(distanceArray[0])];
	}
	const [minDistance,maxDistance] = hotelsCount > 0 ? getMinAndMaxDistance() : [0,0];

	const [distanceRange, setDistanceRange] = React.useState([minDistance, maxDistance]);

	const [searchHotelName, setSearchHotelName] = React.useState('');

	const handleSearchHotelNameChange = (e) => {
		setSearchHotelName(e.target.value);
		applyFilters(e.target.value);
	}

	const applyFilters = (searchString = '', range = [0,0]) => {
		searchString = searchString.trim();
		const isSearchByHotelNameFilterApplicable = searchString.length > 2;
		const isSearchByDistanceFilterApplicable = !(0 == range[0] && 0 == range[1]);

		if (!isSearchByHotelNameFilterApplicable && !isSearchByDistanceFilterApplicable) {
			setFilteredHotels([...allHotels]);
			setItems(allHotels.slice(0, Constants.PERPAGE));
			return;
		}

		let filterResults = [...allHotels];

		if (isSearchByHotelNameFilterApplicable) {
			filterResults = filterResults.filter(item => {
				return item.hotelName.toLowerCase().includes(searchString.toLowerCase())
			});
			setDistanceRange([minDistance, maxDistance]);
		}

		if(isSearchByDistanceFilterApplicable) {
			filterResults = filterResults.filter(item => {
				const distance = (Math.round((2 * 6371 * Math.asin(Math.sqrt(Math.pow((Math.sin((Constants.KAABA_LATITUDE * (3.14159 / 180) - item.geoPoint.lat * (3.14159 / 180)) / 2)), 2) + Math.cos(Constants.KAABA_LATITUDE * (3.14159 / 180)) * Math.cos(item.geoPoint.lat * (3.14159 / 180)) * Math.pow(Math.sin(((Constants.KAABA_LONGTITUDE * (3.14159 / 180) - item.geoPoint.lng * (3.14159 / 180)) / 2)), 2)))) * 100) / 100).toFixed(2);
				return range[0] <= distance && distance <= range[1];
			});
		}

		setFilteredHotels(filterResults);
		setItems(filterResults.slice(0, Constants.PERPAGE));
	}

	useEffect(() => {
		const hotelsCount = (results.length>0 || results.hotels !== undefined) ? Number(results.hotels['@attributes'].count) : 0;
		const allHotels = hotelsCount > 0  ? (hotelsCount > 1 ? results.hotels.hotel : [results.hotels.hotel] ) : [];
		const selectedHotel = prepareAccommodationList(allHotels)
		setSelectedRooms({hotels: selectedHotel});
		setAllHotels(allHotels);
		setHotelsCount(hotelsCount);
		setFilteredHotels(allHotels);
		setItems(allHotels.slice(0, Constants.PERPAGE));
		//disable select if item exist in Itinerary(on click browser backButton)
		if (((location.pathname === Constants.MADINAH_HOTEL_SEARCH_URL || location.pathname === Constants.MADINAH_HOTEL_RESEARCH_URL) && Object.keys(itineraryDetails.packagedetails.madinah).length > 0) ||
			((location.pathname === Constants.MAKKAH_HOTEL_SEARCH_URL || location.pathname === Constants.MAKKAH_HOTEL_RESEARCH_URL) && Object.keys(itineraryDetails.packagedetails.makkah).length > 0)) {
			setDisable(true)
		}

	}, [results, itineraryDetails,]);

	//const scrollRef = React.useRef(null);

	window.onscroll = () => {
		console.log('scroll hua')
		if (hotelsCount > 1) {
			console.log('iff ke andar scroll hua')
			setItems(prev => [...prev, ...filteredHotels.slice(prev.length, prev.length + Constants.PERPAGE)]);
		}
	}

	//window.onscroll = () => {
	//	console.log('scroll hua')
	//	const isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;
	//	if (isAtBottom && hotelsCount > 1) {
	//		console.log('iff ke andar scroll hua')
	//		setItems(prev => [...prev, ...filteredHotels.slice(prev.length, prev.length + Constants.PERPAGE)]);
	//	}
	//}

	//useEffect(() => {
	//	console.log('useeffect ke andar',filteredHotels, hotelsCount);
	//	const handleScroll = () => {
	//		console.log('inside scroll');
	//		console.log('inside scroll',filteredHotels, hotelsCount);
	//		const isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;
	//		if (isAtBottom && hotelsCount > 1) {
	//			console.log('iff ke andar scroll hua');
	//			setItems(prev => [...prev, ...filteredHotels.slice(prev.length, prev.length + Constants.PERPAGE)]);
	//		}
	//	};
	//	console.log('useeffect ke andar onscroll ke bahar addevent ke pehele',filteredHotels, hotelsCount);
		
	//	window.addEventListener('scroll', handleScroll);
	//	console.log('useeffect ke andar onscroll ke bahar addevent ke baad',filteredHotels, hotelsCount);
		
	//	return () => {
	//		console.log('useeffect ke andar onscroll ke bahar return ke andar remove ke pehele',filteredHotels, hotelsCount);
	//		window.removeEventListener('scroll', handleScroll);
	//		console.log('useeffect ke andar onscroll ke bahar return ke andar removeevent ke baad',filteredHotels, hotelsCount);
	//	};
	//}, [filteredHotels, hotelsCount]);

	//React.useEffect(() => {
	//	console.log('pachuch gayee');
	//	const handleScroll = () => {
	//		console.log('scroll happened');
	//		if (scrollRef?.current && hotelsCount > 1) {
	//			const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
	//			if (scrollHeight - scrollTop === clientHeight) {
	//				console.log('Reached bottom!');
	//				setItems(prev => [...prev, ...filteredHotels.slice(prev.length, prev.length + Constants.PERPAGE)]);
	//			}
	//		}
	//	};
	//	window.addEventListener('scroll', handleScroll);
	
	//	return () => {
	//		window.removeEventListener('scroll', handleScroll);
	//	};
	//}, [scrollRef, filteredHotels, hotelsCount]);

	let stepperNo = (destination === 'madinah') ? Constants.STEP_TEXT_MADINAH : Constants.STEP_TEXT_MAKKAH;
	stepperNo = t(stepperNo);
	const enRoute = async (hotel) => {
		setHotel(hotel)
		setInitiateSearch(true)
		const isMadinah = Object.keys(requests.madinah).length !== 0;

		if(!rebook) {
			if(destination === 'makkah' && isMadinah )
			{
				navigate(Constants.BTOB_MADINAH_HOTEL_SEARCH_URL);
			}
			else
			{
				if(destination === 'madinah' || (destination === 'makkah' && !isMadinah))
				{
					navigate(Constants.BTOC_TRANSFER_SEARCH_URL)
				}
			}
		} else {
			/* eslint-disable */
			let updatedFaildItineraryDetails = failedItineraryDetails
			let service = Constants.STEP_TEXT_MAKKAH
			if(destination == Constants.STEP_TEXT_MADINAH) {
				service = Constants.STEP_TEXT_MADINAH
			}
			updatedFaildItineraryDetails = updatedFaildItineraryDetails.filter((failedItineraryDetail) => failedItineraryDetail !== service);
			await setFailedItineraryDetails(service)
			const redirectUrl = manageRebookRedirection(updatedFaildItineraryDetails)
			navigate(redirectUrl, { state: { rebook: true } })
		}
	}

	const handleBookNow = async ({type,hotelId,roomData,hotel}) => {
		let roomRQData =[];
		if(type === 'one')
		{
			roomRQData = roomData;
		}
		else
		{
			roomRQData = [...selectedRooms.hotels[hotelId].rooms].map(room => {
				const newRoomTypeCodes=  room.roomTypeCodes.map( roomTypeCode => {
					return roomTypeCode.roomToken.map((rT) => {
						delete roomTypeCode.selectedRoom
						return {...roomTypeCode,roomToken:rT}
					})
				})
				return {...room,roomTypeCodes:newRoomTypeCodes.reduce((accumulator, obj) => [...accumulator, ...obj], [])}
			})
		}

		const saveBookingParameters = {...requests.common,...requests[destination],rooms:roomRQData,productCode:hotelId};
		if( parentItineraryID ){
			saveBookingParameters.itinerary = parentItineraryID
		}
		await getItineraryId(saveRoom(saveBookingParameters));

		let saveBookingAPIFlag = store.getState().btoc.saveBookingAPIFlag;

		if( saveBookingAPIFlag ){
			await prepareHotelPackageData(saveBookingParameters, hotel.hotelName, destination, results.currencyShort)
			await enRoute(hotel)
		}else{
			setInitiateSearch(false)
			setSnackbarMessage(t('Rooms Not Available. Please try after some time'));
			setSnackAlertOpen(true);
			settypeOfMessage('error');
		}
	}

	const handleSelectedRooms = roomsData => {
		setSelectedRooms((prevState) => {
			const selections = {...prevState}
			selections.hotels[roomsData.hotelid] = roomsData;
			return selections;
		})
	}

	const handleRefreshEvent = () => {
		handletryagain()
	}


	return (
		<>
			{(initiateSearch || saveBookingLoading) && <SearchresultsSkeleton stepperNo={stepperNo} rebook ={rebook}/>}
			<Box sx={{ backgroundColor: '#F5F5F5', p: 0}}>
				{!initiateSearch && !saveBookingLoading && <Grid container spacing={2} sx={{ bgcolor: '#fff', pl: 3, pt: 1, pb: 2, }}>
					<Grid item xs={12} lg={10} md={10} sm={12} xl={10}>
						<Summary />
					</Grid>
					<Grid item xs={12} lg={2} md={2} sm={12} xl={2} sx={{
						display: 'flex',
						flexWrap: 'wrap',
						alignContent: 'center',
						justifyContent: 'end',
						bgcolor: 'background.paper',
						paddingRight: 0,
					}}>
						{!rebook && <MyPackage />}
					</Grid>
				</Grid>}

				{!initiateSearch > 0 && !saveBookingLoading && <StepperHeader stepLevel={stepperNo} rebook ={rebook}/>}
				{/*{(initiateSearch || saveBookingLoading) && <SearchresultsSkeleton stepperNo={stepperNo} rebook ={rebook}/>}*/}

				<Grid sx={{ pt: 2, backgroundColor:'white' }}>
					{snackAlertOpen && <SnackbarComponent open={snackAlertOpen} onClose={() => setSnackAlertOpen(false)} message={snackbarMessage} typeOfMessage={typeOfMessage} />}
					{!hotelsCount  && <EmptySearchResultStep stepLevel={stepperNo} handlerefresh={handleRefreshEvent} norefreshbutton={true}/>}
					{hotelsCount > 0 && !initiateSearch && !saveBookingLoading && <><Grid container spacing={2} alignItems="flex-end">
						<Grid item xs={12} sm={4}>
							<Box>
								<Typography  sx={{fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightBold, color: theme.palette.grey[800]}}> {filteredHotels.length} {t('available hotels in')} {t(destination)}</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} sm>
							<Stack direction="row" alignItems="flex-end" justifyContent="flex-end" >

								<TextField id='searchByHotelName' label={t('Search by Hotel Name')} onChange={handleSearchHotelNameChange} value={searchHotelName} variant="outlined" size='small' className="resutls-placehoder" sx={{margin: '0px 10px'}}>
								</TextField>
								<Filter
									applyFilters={applyFilters}
									minDistance={minDistance}
									maxDistance={maxDistance}
									setDistanceRange={setDistanceRange}
									distanceRange={distanceRange}
									setSearchHotelName={setSearchHotelName}
									module='accommodation' />
							</Stack>
						</Grid>
					</Grid>

					{/*<Grid item xs={12} container spacing={2} rowSpacing={2} id="scrollArea" ref={scrollRef} sx={{ py: 4 }}>*/}
					<Grid item xs={12} container spacing={2} rowSpacing={2} id="scrollArea" sx={{ py: 4 }}>
						{items.map(hotel => {
							return (

								<ResultRow key={hotel['@attributes'].hotelid} hotel={hotel} currency={results.currencyShort} onBookClick={handleBookNow} onOpenGallery={handleOpen}
									selectedRooms={selectedRooms} configureSelectedRooms={handleSelectedRooms}  destination={destination} disableSelect={disableSelect}/>
							)
						})}
					</Grid></>}
					{hotelsCount > 0 && items.length == 0 && <EmptySearchResultStep stepLevel={stepperNo} handlerefresh={handleRefreshEvent} norefreshbutton={false}/>}
				</Grid>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<div style={style}>
						<Fade in={open}>
							<Box >
								<IconButton className="mr-left-100" aria-label="close" onClick={handleClose} >
									<CloseIcon className="color-white" />
								</IconButton>
								<ImageGallery items={images} onErrorImageURL={'/static/images/No-Image-found.png'} showFullscreenButton={false} showPlayButton={false} showBullets={false} showIndex={true} showThumbnails={false} />
							</Box>
						</Fade>
					</div>
				</Modal>
			</Box>
		</>
	);
};

export default SearchResults;
