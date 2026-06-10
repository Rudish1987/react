import { useStore, useStoreState, useStoreActions } from 'easy-peasy'
import Constants from '../helpers/constants'
import moment from 'moment';
import {useRequestBody} from './useRequestBody'

export const usePackageBody = () => {

	const setMakkahPackage = useStoreActions(actions => actions.btoc.itineraryDetails.setMakkahPackage);
	const setMadinahPackage = useStoreActions(actions => actions.btoc.itineraryDetails.setMadinahPackage);
	const setTransferPackage = useStoreActions(actions => actions.btoc.itineraryDetails.setTransferPackage);
	const setGSPackage = useStoreActions(actions => actions.btoc.itineraryDetails.setGSPackage);

	const setPackageItemCount = useStoreActions(actions => actions.btoc.itineraryDetails.setPackageItemCount);
	const setItineraryAmount = useStoreActions(actions => actions.btoc.itineraryDetails.setItineraryAmount);
	const setCurrency = useStoreActions(actions => actions.btoc.itineraryDetails.setCurrency);

	const travelPeriod = useStoreState(actions => actions.btoc.requests.transfer);
	let itineraryItemCount = useStoreState(actions => actions.btoc.itineraryDetails.itineraryItemCount);
	let itineraryAmount = useStoreState(actions => actions.btoc.itineraryDetails.itineraryAmount);
	const store = useStore();


	const prepareHotelPackageData = (roomReq, hotelName, destination, currency) => {
		const packageData = {};
		packageData.DestinationName = destination
		packageData.dateFrom = roomReq.dateFrom
		packageData.dateTo = roomReq.dateTo
		packageData.productCode = roomReq.productCode
		packageData.hotel = hotelName
		packageData.rooms = roomReq.rooms

		for (let key in roomReq.rooms) {

			itineraryItemCount += roomReq.rooms[key].roomTypeCodes.length
			for (let amountKey in roomReq.rooms[key].roomTypeCodes) {
				itineraryAmount += Number(roomReq.rooms[key].roomTypeCodes[amountKey].roomAmount)
			}
		}
		//set makkah/madinah itinerary details
		if (destination === 'makkah') {
			setMakkahPackage(packageData)
		} else if (destination === 'madinah') {
			setMadinahPackage(packageData)
		}

		//set itinerary item count and currency
		setPackageItemCount(itineraryItemCount)
		setItineraryAmount(itineraryAmount)
		setCurrency(currency)

	}

	const prepateTransferPackage = (transferSupplierName, transferTotalPrice,cancellation,cancellationRules, vehicleNumber) => {
		const packageDataTransfer = {};

		packageDataTransfer.dateFrom = travelPeriod.departureDateFormatted
		packageDataTransfer.dateTo = travelPeriod.arrivalDateFormatted
		packageDataTransfer.supplier = transferSupplierName
		packageDataTransfer.totalPrice = transferTotalPrice
		packageDataTransfer.cancellation=cancellation
		packageDataTransfer.cancellationRules=cancellationRules
		packageDataTransfer.vehicleNumber=vehicleNumber

		setTransferPackage(packageDataTransfer)
		itineraryItemCount +=1
		itineraryAmount += Number(transferTotalPrice)
		setItineraryAmount(itineraryAmount)
		setPackageItemCount(itineraryItemCount)
	}

	const prepareGroundServicePackage = (gsSupplierName, packageName, gsTotalPrice, additionalServices, paxCount, pkgDesc, cancellation, cancellationRules) => {
		const packageDataGS = {};

		packageDataGS.dateFrom = travelPeriod.departureDateFormatted
		packageDataGS.dateTo = travelPeriod.arrivalDateFormatted
		packageDataGS.supplier = gsSupplierName
		packageDataGS.packageName = packageName
		packageDataGS.totalPrice = gsTotalPrice
		packageDataGS.additionalServices = additionalServices
		packageDataGS.paxCount = paxCount
		packageDataGS.pkgDesc  = pkgDesc
		packageDataGS.cancellation=cancellation
		packageDataGS.cancellationRules=cancellationRules

		setGSPackage(packageDataGS)
		itineraryItemCount += paxCount
		itineraryAmount += Number(gsTotalPrice)
		setItineraryAmount(itineraryAmount)
		setPackageItemCount(itineraryItemCount)
	}

	const prepareVisaService = (paxCount) => {
		const visa = store.getState().btoc.itineraryDetails.packagedetails.visa;
		itineraryAmount += Number(visa.VisaFeesAmount) * paxCount
		setItineraryAmount(itineraryAmount)
	}

	return {
		prepareHotelPackageData,
		prepateTransferPackage,
		prepareGroundServicePackage,
		prepareVisaService
	}
}
/*TODO: Need to rework once Api built is ready */
export const usePackageBodyAfterBooking = () => {
	const setMakkahPackageAfterBooking = useStoreActions(actions => actions.btoc.setMakkahPackageAfterBooking);
	const setMadinahPackageAfterBooking = useStoreActions(actions => actions.btoc.setMadinahPackageAfterBooking);
	const setTransferPackageAfterBooking = useStoreActions(actions => actions.btoc.setTransferPackageAfterBooking);
	const setGSPackageAfterBooking = useStoreActions(actions => actions.btoc.setGSPackageAfterBooking);
	const setVisaPackageAfterBooking = useStoreActions(actions => actions.btoc.setVisaPackageAfterBooking);
	const setItineraryAmountAfterBooking = useStoreActions(actions => actions.btoc.setItineraryAmountAfterBooking);
	const setRoutecode = useStoreActions(actions => actions.btoc.filters.setRoutecode);
	const setTravelPeriod = useStoreActions(actions => actions.btoc.filters.setTravelPeriod);
	const setStayInMakkah = useStoreActions(actions => actions.btoc.filters.setStayInMakkah);
	const setStayInMadinah = useStoreActions(actions => actions.btoc.filters.setStayInMadinah);
	const setNationality = useStoreActions(actions => actions.btoc.filters.setNationality);
	const setResidency = useStoreActions(actions => actions.btoc.filters.setResidency);
	const setResidencySwitch = useStoreActions(actions => actions.btoc.filters.setResidencySwitch);
	const clubRoom = useStoreActions(actions => actions.btoc.filters.clubRoom);
	const setRoomCount = useStoreActions(actions => actions.btoc.filters.setRoomCount);
	const loadFailedItineraryDetails = useStoreActions(actions => actions.btoc.loadFailedItineraryDetails);
	const setRebook = useStoreActions(actions => actions.btoc.itineraryDetails.setRebook);
	const { prepareDataForSearch } = useRequestBody();
	const failedItinerary = [];
	const preparepackageAfterBooking = (responseData) => {
		if (Object.keys(responseData.makkah).length > 0) {
			const afterBookingmakkahpackageData = {};
			afterBookingmakkahpackageData.DestinationName = responseData.makkah.DestinationName;
			afterBookingmakkahpackageData.dateFrom = responseData.makkah.dateFrom;
			afterBookingmakkahpackageData.dateTo = responseData.makkah.dateTo;
			afterBookingmakkahpackageData.productCode = responseData.makkah.productCode;
			afterBookingmakkahpackageData.hotel = responseData.makkah.hotel;
			afterBookingmakkahpackageData.status = responseData.makkah.status;
			afterBookingmakkahpackageData.rooms = responseData.makkah.rooms
			setMakkahPackageAfterBooking(afterBookingmakkahpackageData)
			if(responseData.makkah.status == Constants.MAQAM_BOOKING_INCOMPLETE) {
				failedItinerary.push(Constants.STEP_TEXT_MAKKAH)
			}
		}
		if (Object.keys(responseData.madinah).length > 0) {
			const afterBookingmadinahpackageData = {};
			afterBookingmadinahpackageData.DestinationName = responseData.madinah.DestinationName;
			afterBookingmadinahpackageData.dateFrom = responseData.madinah.dateFrom;
			afterBookingmadinahpackageData.dateTo = responseData.madinah.dateTo;
			afterBookingmadinahpackageData.productCode = responseData.madinah.productCode;
			afterBookingmadinahpackageData.hotel = responseData.madinah.hotel;
			afterBookingmadinahpackageData.status = responseData.madinah.status;
			afterBookingmadinahpackageData.rooms = responseData.madinah.rooms
			setMadinahPackageAfterBooking(afterBookingmadinahpackageData)
			if(responseData.madinah.status == Constants.MAQAM_BOOKING_INCOMPLETE) {
				failedItinerary.push(Constants.STEP_TEXT_MADINAH)
			}
		}
		if (Object.keys(responseData.transfer).length > 0) {
			const afterBookingpackageDataTransfer = {};

			afterBookingpackageDataTransfer.dateFrom = responseData.transfer.dateFrom
			afterBookingpackageDataTransfer.dateTo = (Object.keys(responseData.groundService).length > 0) ? responseData.groundService.dateTo : responseData.transfer.dateTo // taking date from ground service because for transfer we are storing only 1day
			afterBookingpackageDataTransfer.supplier = responseData.transfer.supplier
			afterBookingpackageDataTransfer.totalPrice = responseData.transfer.totalPrice
			afterBookingpackageDataTransfer.status = responseData.transfer.status
			afterBookingpackageDataTransfer.cancellation = responseData.transfer.cancellation
			afterBookingpackageDataTransfer.cancellationRules = responseData.transfer.cancellationRules
			afterBookingpackageDataTransfer.vehicleNumber = responseData.transfer.vehicleNumber

			setTransferPackageAfterBooking(afterBookingpackageDataTransfer)
			if(responseData.transfer.status == Constants.MAQAM_BOOKING_INCOMPLETE) {
				failedItinerary.push(Constants.STEP_TEXT_TRANSPORTATION)
			}

		}
		if (Object.keys(responseData.groundService).length > 0) {
			const afterBookingpackageDataGS = {};
			afterBookingpackageDataGS.dateFrom = responseData.groundService.dateFrom
			afterBookingpackageDataGS.dateTo = responseData.groundService.dateTo
			afterBookingpackageDataGS.supplier = responseData.groundService.supplier
			afterBookingpackageDataGS.packageName = responseData.groundService.packageName
			afterBookingpackageDataGS.totalPrice = responseData.groundService.totalPrice
			afterBookingpackageDataGS.status = responseData.groundService.status
			afterBookingpackageDataGS.additionalServices = responseData.groundService.additionalServices
			afterBookingpackageDataGS.paxCount = responseData.groundService.paxCount
			afterBookingpackageDataGS.pkgDesc = responseData.groundService.pkgDesc
			afterBookingpackageDataGS.cancellation = responseData.groundService.cancellation
			afterBookingpackageDataGS.cancellationRules = responseData.groundService.cancellationRules
			setGSPackageAfterBooking(afterBookingpackageDataGS)
			if(responseData.groundService.status == Constants.MAQAM_BOOKING_INCOMPLETE) {
				failedItinerary.push(Constants.STEP_TEXT_GROUNDSERVICES)
			}
		}
		if(Object.keys(responseData.visa).length > 0) {
			const afterBookingpackageDataVisa = {};
			afterBookingpackageDataVisa.VisaFeesAmount = responseData.visa.totalPrice
			afterBookingpackageDataVisa.status = Constants.MAQAM_BOOKING_CONFIRMED
			
			if(responseData.visa.status == Constants.VISA_STATUS_INCOMPLETE) {
				afterBookingpackageDataVisa.status = Constants.VISA_STATUS_INCOMPLETE
				failedItinerary.push(Constants.STEP_TEXT_VISA)
			}
			if(responseData.visa.status == Constants.VISA_STATUS_ON_REQUEST) {
				afterBookingpackageDataVisa.status = Constants.VISA_STATUS_ON_REQUEST
			}
			setVisaPackageAfterBooking(afterBookingpackageDataVisa)
		}

		// set failed service list without Visa
		if(failedItinerary.length > 0) {
			setRebook(true)
			loadFailedItineraryDetails(failedItinerary)
		} else {
			setRebook(false)
		}
		if(Object.keys(responseData.filters).length > 0) {
			setRoutecode(responseData.filters.routecode)
			setTravelPeriod({ from: moment(responseData.filters.travelPeriod.from).format('YYYY-MM-DD'), to: moment(responseData.filters.travelPeriod.to).format('YYYY-MM-DD') })
			setStayInMakkah(responseData.filters.nightStayInMakkah)
			setStayInMadinah(responseData.filters.nightStayInMadinah)
			setNationality(responseData.filters.nationality)
			setResidency(responseData.filters.residency)
			setResidencySwitch(responseData.filters.checkResidencySwitch)
			clubRoom(responseData.filters.rooms)
			setRoomCount(responseData.filters.roomCount)

			prepareDataForSearch();
		}
		/*TODO need to change this after get the itinerary amount from Itinerary*/
		setItineraryAmountAfterBooking(responseData.totalItineraryAmount)
	}
	return {
		preparepackageAfterBooking
	}
}
