import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

// material
import { Box, Grid, Stack, Typography, FormControl } from '@mui/material';

//Common header components(summary, myPackage)
import { Summary } from '../../CommonHeaders/Summary';
import { MyPackage } from '../../CommonHeaders/MyPackage/MyPackage';
import { StepperHeader } from '../../CommonHeaders/StepperHeader';
import ResultRow from './ResultItems/ResultRow';
import { MultiSelect } from './../../common/MultiSelect';
import { useSaveGroundService, useGetGroundService } from '../../../context/groundService/hooks';
import { useVisaFeesCalculation } from '../../../context/visa/hooks';
import { Filter } from '../../Filter';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../../context/LocaleContext';
import Constants from '../../../helpers/constants';
import { useNavigate } from 'react-router-dom';
import { FormatNumber, manageRebookRedirection } from '../../../helpers/utils'
import { usePackageBody } from '../../../api/usePackageBody'
import SearchresultsSkeleton from '../../skeleton/SearchresultsSkeleton'
import {EmptySearchResultStep} from '../../EmptySearchResultStep'


import store from '../../../Store';


const GroundServiceSearchResults = (props) => {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const gsResults = useStoreState(s => s.btoc.groundserviceresults);
	const groundServiceCount = (gsResults.tours !== undefined) ? Number(gsResults.tours['@attributes'].count) : 0;
	const navigate = useNavigate();

	const requests = useStoreState(s => s.btoc.requests);
	const parentItineraryID = useStoreState(actions => actions.btoc.itineraryDetails.itineraryid);
	const isAuth = useStoreState(s => s.isAuth);
	const getItineraryId = useStoreActions(actions => actions.btoc.itineraryDetails.getItineraryId);
	const getGSAllocation = useStoreActions(actions => actions.btoc.itineraryDetails.getGSAllocation);
	const getVisaFees = useStoreActions(actions => actions.btoc.itineraryDetails.getVisaFees);
	const { saveGroundService, isLoading: saveBookingLoading } = useSaveGroundService();
	const { getGroundService, isLoading: getGSLoading } = useGetGroundService();
	const { visaFeesCalculation, isLoading: getVisaLoading } = useVisaFeesCalculation();
	const [selectedSupplier, setSelectedSupplier] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([0]);
	const [items, setItems] = useState([]);
	const [filterItems, setFilterItems] = useState([]);
	const [filteredResCount, setFilteredResCount] = useState(0);
	const { prepareGroundServicePackage, prepareVisaService } = usePackageBody();
	const [initiateSearch, setInitiateSearch] = useState(false);
	const [disableSelect, setDisable] = useState(false);
	const itineraryDetails = useStoreState(actions => actions.btoc.itineraryDetails);
	const failedItineraryDetails = useStoreState(s => s.btoc.failedItineraryDetails)
	const setFailedItineraryDetails = useStoreActions(actions => actions.btoc.setFailedItineraryDetails);

	let totalPax = 0;
	let noOfDays = 0;
	let supplierList = [];
	let isFiltered = false;

	useEffect(() => {
		const groundServiceresults = groundServiceCount > 0 ? [gsResults.tours] : [];
		const searchByFilter = (tourRes) => {
			if (selectedSupplier.length == 0 && selectedCategory.indexOf(0) === 1) {
				return tourRes;
			}

			if(tourRes.length == 0){
				setFilteredResCount(0);
				return tourRes;
			}

			const suppliersCodes = selectedSupplier.map(supplier => supplier.code);
			const filtered = tourRes.map((item) => {
				const suppCount = Number(item['@attributes'].count);
				const itemTour = suppCount > 1 ? item.tour : [item.tour];
				const result = itemTour.map((pkgTour) => {
					let tourDetails = Object.assign({}, pkgTour);
					let packageArr = pkgTour.package.length > 1 ? pkgTour.package : [pkgTour.package];
					const finalRes = packageArr.filter((itemRes) => {
						const supplierBoolean = suppliersCodes.length > 0 ? suppliersCodes.indexOf(itemRes.companyID) !== -1 : true;
						const categoryBoolean = selectedCategory.length > 0 ? (selectedCategory.indexOf(0) !== -1 ? true : selectedCategory.indexOf(Number(itemRes.packageID)) !== -1) : true;

						if(categoryBoolean || supplierBoolean)
							isFiltered = true;

						return categoryBoolean && supplierBoolean;
					})

					if (finalRes.length > 0) {
						setFilteredResCount(1);
						tourDetails.package = finalRes;
						return tourDetails;
					}
					else {
						return finalRes;
					}
				})
				return result;
			});

			const filteredRes = filtered.filter((d) => !Object.values(d).every((v) => v == null))
			return filteredRes;
		}

		const filteredGroundServices = searchByFilter(groundServiceresults);
		setFilterItems(filteredGroundServices)
		setItems(filteredGroundServices.slice(0, Constants.PERPAGE));


		//disable select if item exist in Itinerary(on click browser backButton)
		if ((location.pathname === Constants.GROUND_SERVICE_SEARCH_URL|| location.pathname === Constants.GROUND_SERVICE_HOTEL_RESEARCH_URL) && Object.keys(itineraryDetails.packagedetails.groundService).length > 0) {
			setDisable(true)
		}

	}, [gsResults, selectedSupplier, selectedCategory]);

	let itemArr = items[0] ? items[0] : items;

	const handleBookNow = async ({ tourId, additionalServ, totalAmount, pkgDetails, tour }) => {
		setInitiateSearch(true)
		let tourData = tour[0] ? tour[0] : tour;
		let ratesData = tourData.package.filter(itemArr => {
			return itemArr['@attributes'].tourid === tourId;
		}).map(function (selectedTour) {
			const startDate = gsResults.bookingDetails.fromDate;
			const endDate = gsResults.bookingDetails.toDate;
			const paxNat = gsResults.bookingDetails.passengerNationality;
			const paxRes = gsResults.bookingDetails.passengerCountryOfResidence;
			const currency = gsResults.bookingDetails.currency;
			let childCount = gsResults.bookingDetails.tours.children['@attributes'].no ? gsResults.bookingDetails.tours.children['@attributes'].no : 0;
			totalPax = parseInt(gsResults.bookingDetails.tours.adults) + parseInt(childCount);

			var addServiceIds = additionalServ.map(x => x.id);
			return { dateFrom: startDate, dateTo: endDate, productId: selectedTour['@attributes'].tourid, residency: paxRes, nationality: paxNat, Currency: currency, adults: totalPax, children: 0, pickUpLocation: 'makkah', startingHour: '09:00', tourName: selectedTour.name, tourCode: selectedTour.optionValue, additionalServices: addServiceIds, cancellation: selectedTour.cancellation, cancellationRules: selectedTour.cancellationRules, selectedTourTypeAR: selectedTour.typeAR, categoryName: selectedTour.categoryName, categoryCode: selectedTour.packageID};
		});

		const getGSParameters = { ...requests.tour, dateFrom: ratesData[0].dateFrom, dateTo: ratesData[0].dateTo, productId: ratesData[0].productId, residency: ratesData[0].residency, nationality: ratesData[0].nationality, Currency: ratesData[0].Currency, adults: ratesData[0].adults, children: ratesData[0].children, additionalServices: ratesData[0].additionalServices };
		const saveBookingParameters = { ...requests.tour, tour: ratesData[0], itinerary: tourId };
		if (parentItineraryID) {
			saveBookingParameters.itinerary = parentItineraryID
		} else {
			saveBookingParameters.itinerary = '0';
		}

		let tourName = (locale.value == Constants.LANGUAGES_AR) ? tourData.tourNameAR : tourData.tourName;
		let tourType = (locale.value == Constants.LANGUAGES_AR) ? ratesData[0].selectedTourTypeAR : tourData['@attributes'].type;

		await (getGSAllocation(getGroundService(getGSParameters)));

		let gsAllocationVal = store.getState().btoc.itineraryDetails.tourCode;
		if (gsAllocationVal) {
			saveBookingParameters.tour.tourCode = gsAllocationVal;
		}

		await getItineraryId(saveGroundService(saveBookingParameters));

		let saveBookingAPIFlag = store.getState().btoc.saveBookingAPIFlag;

		if( saveBookingAPIFlag ){
			await prepareGroundServicePackage( tourName, tourType, FormatNumber(totalAmount, 2), additionalServ, totalPax, pkgDetails, ratesData[0].cancellation, ratesData[0].cancellationRules);

			if(!props.rebook) {
				await getVisaFees(visaFeesCalculation());
				await prepareVisaService(totalPax);
				if(getVisaLoading && isAuth ) {
					navigate(Constants.USER_PASSENGER_URL);
				} else {
					navigate(Constants.PACKAGE_LOGIN_URL);
				}
			} else {
				/* eslint-disable */
				let updatedFaildItineraryDetails = failedItineraryDetails
				updatedFaildItineraryDetails = updatedFaildItineraryDetails.filter((failedItineraryDetail) => failedItineraryDetail !== Constants.STEP_TEXT_GROUNDSERVICES);
				await setFailedItineraryDetails(Constants.STEP_TEXT_GROUNDSERVICES)
				const redirectUrl = manageRebookRedirection(updatedFaildItineraryDetails)
				navigate(redirectUrl)
			}

		}else{
			setInitiateSearch(false)
		}


	}

	function handleSelectedSupplier(supplier) {
		setSelectedSupplier(supplier);
	}
	function handleSelectedCategory(categories) {
		setSelectedCategory(categories);
	}

	const handleRefreshEvent = () => {
		props.handletryagain()
	}

	window.onscroll = () => {
		const isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;
		if (isAtBottom && groundServiceCount > 1) {
			setItems(prev => [...prev, ...filterItems.slice(prev.length, prev.length + Constants.PERPAGE)]);
		}
	}

	if (groundServiceCount > 0) {
		let childCount = gsResults.bookingDetails.tours.children['@attributes'].no ? gsResults.bookingDetails.tours.children['@attributes'].no : 0;
		totalPax = parseInt(gsResults.bookingDetails.tours.adults) + parseInt(childCount);
		const startDate = new Date(gsResults.bookingDetails.fromDate);
		const endDate = new Date(gsResults.bookingDetails.toDate);
		const diffTime = Math.abs(endDate - startDate);
		noOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		supplierList = gsResults.tours.supplierArr;
	}

	const lasItemArr = itemArr.filter((d) => !Object.values(d).every((v) => v == null))

	return (
		<Box>
			{!initiateSearch &&
				<Grid container spacing={2} sx={{ bgcolor: '#fff', pl: 6, pt: 1, pb: 1 }}>
					<Grid item xs={12} lg={7}>
						<Summary />
					</Grid>
					<Grid item xs={12} lg={5} sx={{
						display: 'flex',
						flexWrap: 'wrap',
						alignContent: 'center',
						justifyContent: 'end',
						bgcolor: 'background.paper',
						paddingRight: 6
					}}>
						{!props.rebook && <MyPackage />}
					</Grid>
				</Grid>
			}
			{!initiateSearch && getVisaLoading && <StepperHeader stepLevel={t(Constants.STEP_TEXT_GROUNDSERVICES)} rebook={props.rebook}/>}
			{ (initiateSearch || !getVisaLoading) && <SearchresultsSkeleton stepperNo={t(Constants.STEP_TEXT_GROUNDSERVICES)} rebook={props.rebook}/>}
			<Grid sx={{ p: 5, backgroundColor: 'white' }}>
				{!groundServiceCount  && <EmptySearchResultStep stepLevel={t(Constants.STEP_TEXT_GROUNDSERVICES)} handlerefresh={handleRefreshEvent} norefreshbutton={true}/>}

				{filteredResCount > 0 && !initiateSearch && !saveBookingLoading && <> <Grid container spacing={2} alignItems="flex-end">
					<Grid item xs={12} sm={6}>
						<Box>
							<Typography variant="h4">{t('Select ground services')}</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} sm>
						<Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
							<FormControl size="small" fullWidth sx={{ width: '250px' }}>
								<MultiSelect setStateValue={handleSelectedSupplier} listData={supplierList} labelName={t('Supplier')} textLength="6" fieldName={locale.value == Constants.LANGUAGES_AR ? 'nameAR' : 'name'} fieldId="code" />
							</FormControl>
							<Filter
								categoryList={props.categorylist}
								selectedCategory={selectedCategory}
								setSelectedCategory={handleSelectedCategory}
								module='groundService' />
						</Stack>
					</Grid>
				</Grid></>}

				{(isFiltered || filteredResCount > 0) && !saveBookingLoading && !getGSLoading && getVisaLoading && <><Grid item xs={12} container spacing={2} rowSpacing={2} id="scrollArea" sx={{ py: 4 }}>
					{lasItemArr.map(groundService => {
						return (
							<ResultRow key={groundService.tourID} groundService={groundService} currency={gsResults.currencyShort} totalPax={totalPax} totalStay={noOfDays} onBookClick={handleBookNow} disableSelect={disableSelect}/>
						)
					})}
				</Grid>
				</>}
				{groundServiceCount != 0 && lasItemArr.length == 0 && <EmptySearchResultStep stepLevel={t(Constants.STEP_TEXT_GROUNDSERVICES)} handlerefresh={handleRefreshEvent} norefreshbutton={false}/>}
			</Grid>
		</Box>
	);
};

export default GroundServiceSearchResults;
