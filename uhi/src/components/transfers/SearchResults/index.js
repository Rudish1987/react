import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

// material
import { Box, Grid, Stack, Typography } from '@mui/material';

//Common header components(summary, myPackage)
import { Summary } from '../../CommonHeaders/Summary';
import { MyPackage } from '../../CommonHeaders/MyPackage/MyPackage';
import { StepperHeader } from '../../CommonHeaders/StepperHeader';
import ResultRow from './ResultItems/ResultRow';
import { Filter } from '../../Filter';
//import { MultiSelect } from './../../common/MultiSelect';
import { useTranslation } from 'react-i18next';
//import { useLocale } from '../../../context/LocaleContext';
import { useSaveTransfer } from '../../../context/transfers/hooks';
import { FormatNumber, manageRebookRedirection } from '../../../helpers/utils';
import { usePackageBody } from '../../../api/usePackageBody';
import Constants from '../../../helpers/constants'
import { useNavigate } from 'react-router-dom'
import { EmptySearchResultStep } from '../../EmptySearchResultStep'

import SearchresultsSkeleton from '../../skeleton/SearchresultsSkeleton'

import store from '../../../Store';
import { useTheme } from '@mui/material/styles';

const TransferSearchResults = ({ categorylist, transfertypelist, handletryagain,rebook }) => {
	const { t } = useTranslation();
	//const { locale } = useLocale();
	const theme = useTheme();
	const transferresults = useStoreState(s => s.btoc.transferresults);
	const transferCount = (transferresults.vehicleCount > 0) ? Number(transferresults.vehicleCount) : 0;

	const requests = useStoreState(s => s.btoc.requests);
	const parentItineraryID = useStoreState(actions => actions.btoc.itineraryDetails.itineraryid);
	const getItineraryId = useStoreActions(actions => actions.btoc.itineraryDetails.getItineraryId);
	const failedItineraryDetails = useStoreState(s => s.btoc.failedItineraryDetails)
	const setFailedItineraryDetails = useStoreActions(actions => actions.btoc.setFailedItineraryDetails);
	const { saveTransfer, isLoading: saveBookingLoading } = useSaveTransfer();
	const navigate = useNavigate();
	const { prepateTransferPackage } = usePackageBody();

	const itineraryDetails = useStoreState(actions => actions.btoc.itineraryDetails);

	const [disableSelect, setDisable] = useState(false);

	const [selectedSupplier, setSelectedSupplier] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([0]);
	const [selectedTransferType, setSelectedTransferType] = useState([0]);


	const [items, setItems] = useState([]);
	const [filterItems, setFilterItems] = useState([]);
	const [initiateSearch, setInitiateSearch] = useState(false);

	useEffect(() => {
		const transferResults = transferCount > 0 ? Object.values(transferresults.vehicles) : [];
		const searchByFilter = (transferRes) => {
			if (selectedSupplier.length == 0 && selectedCategory.indexOf(0) === 1 && selectedTransferType.indexOf(0) === 1) {
				return transferRes;
			}
			const suppliersCodes = selectedSupplier.map(supplier => supplier.code);

			const filtered = transferRes.map((item) => {
				const result = item.filter((itemRes) => {
					const supplierBoolean = suppliersCodes.length > 0 ? suppliersCodes.indexOf(Number(itemRes.companyCode)) !== -1 : true;
					const categoryBoolean = selectedCategory.length > 0 ? (selectedCategory.indexOf(0) !== -1 ? true : selectedCategory.indexOf(Number(itemRes.categoryId)) !== -1) : true
					const transferTypeBoolean = selectedTransferType.length > 0 ? (selectedTransferType.indexOf(0) !== -1 ? true : selectedTransferType.indexOf(Number(itemRes.vehicleTypeId)) !== -1) : true
					return supplierBoolean && categoryBoolean && transferTypeBoolean;
				})
				return result;
			});

			const filteredRes = filtered.filter((d) => !Object.values(d).every((v) => v == null))
			return filteredRes;
		}

		const filteredTransfers = searchByFilter(transferResults);
		setFilterItems(filteredTransfers)
		setItems(filteredTransfers.slice(0, Constants.PERPAGE));

		//disable select if item exist in Itinerary(on click browser backButton)
		if ((location.pathname === Constants.TRANSFER_SEARCH_URL|| location.pathname === Constants.TRANSFER_HOTEL_RESEARCH_URL) && Object.keys(itineraryDetails.packagedetails.transfer).length > 0) {
			setDisable(true)
		}

	}, [transferresults, selectedSupplier, selectedCategory, selectedTransferType])

	const handleBookNow = async ({ transferId, transfer }) => {
		let ratesData = [];
		let vehicleNumber = 1;

		ratesData = transfer.filter(items => {
			return items['@attributes'].runno === transferId;
		}).map(function (selectedTransfer) {
			return {
				productCode: selectedTransfer['@attributes'].transfercode,
				package: selectedTransfer['@attributes'].package,
				transferType: selectedTransfer.type,
				transferName: selectedTransfer.vehicleBrand,
				transferToken: selectedTransfer.optionValue,
				paxCapacity: selectedTransfer.paxCapacity,
				vehiclesNo: selectedTransfer.requireVehicle,
			};
		});
		const saveBookingParameters = { ...requests.transfer, rates: ratesData, itinerary: transferId };
		if (parentItineraryID) {
			saveBookingParameters.itinerary = parentItineraryID
		}else {
			saveBookingParameters.itinerary = '0';
		}
		if(ratesData.length > 0) {
			saveBookingParameters.vehiclesNo = ratesData[0].vehiclesNo
			if (parseInt(ratesData[0].paxCapacity) > parseInt(saveBookingParameters.adultsCount)) {
				saveBookingParameters.paxPerCar = saveBookingParameters.adultsCount;
			} else {
				saveBookingParameters.paxPerCar = ratesData[0].paxCapacity;
			}
			vehicleNumber = ratesData[0].vehiclesNo
		}

		await getItineraryId(saveTransfer(saveBookingParameters));
		let saveBookingAPIFlag = store.getState().btoc.saveBookingAPIFlag;

		if( saveBookingAPIFlag ){
			await prepateTransferPackage(transfer[0]['companyName'], FormatNumber(transfer[0].packageTotal, 2), transfer[0]['cancellation'], transfer[0]['cancellationRules'], vehicleNumber)
			setInitiateSearch(true)
			if(!rebook) {
				navigate(Constants.GROUND_SERVICE_SEARCH_URL);
			} else {
				/* eslint-disable */
				let updatedFaildItineraryDetails = failedItineraryDetails
				updatedFaildItineraryDetails = updatedFaildItineraryDetails.filter((failedItineraryDetail) => failedItineraryDetail !== Constants.STEP_TEXT_TRANSPORTATION);
				await setFailedItineraryDetails(Constants.STEP_TEXT_TRANSPORTATION)
				const redirectUrl = manageRebookRedirection(updatedFaildItineraryDetails)
				navigate(redirectUrl, { state: { rebook: true } })
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
	function handleSelectedTransferType(transferType) {
		setSelectedTransferType(transferType);
	}
	window.onscroll = () => {
		const isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;
		if (isAtBottom && transferCount > 1) {
			setItems(prev => [...prev, ...filterItems.slice(prev.length, prev.length + Constants.PERPAGE)]);
		}
	}

	const handleRefresh = () => {
		handletryagain()
	}

	return (
		<Box sx={{ backgroundColor: '#F5F5F5', p: 0 }}>
			{!initiateSearch && !saveBookingLoading &&
				<Grid container spacing={2} sx={{ bgcolor: '#fff', pl: 3, pt: 1, pb: 2 }}>
					<Grid item xs={12} lg={10} md={10} sm={12} xl={10}>

						<Summary />
					</Grid>
					<Grid item xs={12} lg={2} md={2} sm={12} xl={2} sx={{
						display: 'flex',
						flexWrap: 'wrap',
						alignContent: 'center',
						justifyContent: 'end',
						bgcolor: 'background.paper',
						paddingRight: 0
					}}>
						{!rebook && <MyPackage />}
					</Grid>
				</Grid>
			}
			{!initiateSearch && !saveBookingLoading &&
				<StepperHeader stepLevel={t(Constants.STEP_TEXT_TRANSPORTATION)} rebook ={rebook}/>
			}
			{(initiateSearch || saveBookingLoading) && <SearchresultsSkeleton stepperNo={t(Constants.STEP_TEXT_TRANSPORTATION)} rebook ={rebook}/>}
			<Grid sx={{ pt: 2, backgroundColor: 'white' }}>
				{!transferCount && <EmptySearchResultStep stepLevel={t(Constants.STEP_TEXT_TRANSPORTATION)} handlerefresh={handleRefresh} norefreshbutton={true} />}


				{transferCount > 0 && !initiateSearch && !saveBookingLoading &&
					<>
						<Grid container spacing={2} alignItems="flex-end">
							<Grid item xs={12} sm={6}>
								<Box>
									<Typography sx={{fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightBold, color: theme.palette.grey[800]}}>{t('Select Your Preferred vehicle and Supplier')}</Typography>
								</Box>
							</Grid>
							<Grid item xs={12} sm>
								<Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
									{/*<FormControl size="small" fullWidth sx={{ width: '250px' }}>
										<MultiSelect setStateValue={handleSelectedSupplier} listData={supplierlist} labelName={t('Supplier')} textLength="6" fieldName={locale.value == Constants.LANGUAGES_AR ? 'nameAR' : 'name'} fieldId="code" />
									</FormControl>*/}
									<Filter
										categoryList={categorylist}
										transferTypeList={transfertypelist}
										selectedCategory={selectedCategory}
										setSelectedCategory={handleSelectedCategory}
										selectedTransferType={selectedTransferType}
										setSelectedTransferType={handleSelectedTransferType}
										module='transfer' />
								</Stack>
							</Grid>
						</Grid>
						<Grid item xs={12} container spacing={2} rowSpacing={2} id="scrollArea" sx={{ py: 4 }}>
							{items.map((transfer, i) => {
								return (
									<ResultRow key={i} transfer={transfer} currency={transferresults.currencyShort} onBookClick={handleBookNow} disableSelect={disableSelect} />
								)
							})}
						</Grid>
					</>
				}
				{transferCount > 0 && items.length == 0 && <EmptySearchResultStep stepLevel={t(Constants.STEP_TEXT_TRANSPORTATION)} handlerefresh={handleRefresh} norefreshbutton={false} />}
			</Grid>

		</Box >
	);
};

export default TransferSearchResults;