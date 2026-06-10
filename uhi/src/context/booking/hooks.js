import { useState } from 'react'
import { AmendPassenger, AmendFlight, PassengerFlight, AfterBookingAllDetails, CancelItinerary,  SendUOMail } from '../../api/BookingApi';
import { useStore } from 'easy-peasy';
import { usePackageBodyAfterBooking } from '../../api/usePackageBody'
import { BookingListApi } from '../../api/User';
import { useRequestBody } from '../../api/useRequestBody';
import { BOOKING } from '../../api/Url';
import API from '../../api/Axios'

export const usePassengerFlightDetails = () => {
	const [isLoading, setIsLoading] = useState(true)
	const store = useStore();

	let getPassengerFlight = () => {
		const itineraryDetails = store.getState().btoc.itineraryDetails;
		const setPassengerResult = store.getActions().btoc.itineraryDetails.setPassengerResult;
		const setFlightResult = store.getActions().btoc.itineraryDetails.setFlightResult;

		let requests = itineraryDetails.itineraryid;
		setIsLoading(true);
		return new Promise(resolve => {
			PassengerFlight(requests)
				.then(data => {
					resolve(data)
					setPassengerResult(data.passengers)
					setFlightResult(data.flight)
				})
		}).finally(() => { setIsLoading(false) })
	}

	return {
		getPassengerFlight,
		isLoading
	}
}

export const AfterBookingDetails = () => {
	const [isLoading, setIsLoading] = useState(true)
	const store = useStore();
	const { preparepackageAfterBooking } = usePackageBodyAfterBooking();
	const { prepareDataForSearch } = useRequestBody();

	let getAfterBookingDetails = (itineraryId, isSaved = '') => {
		/*TODO later when Reacy confirm booking is done need to set the passenger details properly*/
		const setBookingResult = store.getActions().btoc.setAfterBookingItineraryDetails;

		let requests = itineraryId;
		setIsLoading(true);
		return new Promise(resolve => {
			AfterBookingAllDetails(requests, isSaved)
				.then(data => {
					resolve(data)
					preparepackageAfterBooking(data)
					prepareDataForSearch();
					setBookingResult(data)
				})
		}).finally(() => { setIsLoading(false) })
	}

	return {
		getAfterBookingDetails,
		isLoading
	}
}
export const useAmendPassenger = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();

	let amendPassenger = () => {
		setIsLoading(true)
		const itineraryDetails = store.getState().btoc.itineraryDetails;
		let requests = {
			'parentBookingCode': itineraryDetails.itineraryid,
			'passenger': itineraryDetails.passengers,
			'vehicleNr': itineraryDetails.packagedetails.transfer.vehicleNumber
		}
		return new Promise(resolve => {
			AmendPassenger(requests).then(data => resolve(data))
		}).finally(() => { setIsLoading(false) })
	}

	return {
		amendPassenger,
		isLoading
	}
}

export const useAmendFlight = () => {
	const [isLoading, setIsLoading] = useState(false)
	let amendFlight = (requests) => {
		setIsLoading(true)
		return new Promise(resolve => {
			AmendFlight(requests).then(data => resolve(data))
		}).finally(() => { setIsLoading(false) })
	}

	return {
		amendFlight,
		isLoading
	}
}

export const useBookingList = () => {
	const [isLoading, setIsLoading] = useState(true)
	const store = useStore();
	let getBookingList = (pageNo, searchStatus, itinId) => {
		const setBookingResults = store.getActions().btoc.setBookingResults;
		const setNewBookingResults = store.getActions().btoc.setNewBookingResult;
		const setBookingListLastPage = store.getActions().btoc.setBookingListLastPage;

		setIsLoading(true);
		return new Promise(resolve => {
			BookingListApi(pageNo, searchStatus, itinId)
				.then(data => {
					if(data.status == false) {
						setBookingListLastPage(1);
						setNewBookingResults([])
						resolve(data)
						setBookingResults(data)
					} else {
						setBookingListLastPage(data.pagination.last_page);
						setNewBookingResults(data.bookings)
						resolve(data)
						setBookingResults(data)
					}
				})
		}).finally(() => { setIsLoading(false) })
	}

	return {
		getBookingList,
		isLoading
	}
}

export const useCancelItinerary = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	let getCancelItinerary = (request) => {
		setIsLoading(true);
		return new Promise(resolve => {
			CancelItinerary(request)
				.then(data => {
					resolve(data)
					if (data.successful == 'TRUE') {
						setIsSubmitted(true)
					}
				})
		}).finally(() => { setIsLoading(false) })
	}

	return {
		getCancelItinerary,
		isLoading,
		isSubmitted
	}
}

export const useCurrencyConvertionRate = () => {
	const [isLoading, setIsLoading] = useState(true)

	let getCurrencyRate = async () => {
		setIsLoading(true);
		try {
			const response = await API.post(`${BOOKING.currency_rate}`)
				.then(function (response) {
					return response;
				})
				.catch(function (err) {
					return err;
				});

			return response;
		} finally {
			setIsLoading(false);
		}
	}

	return {
		getCurrencyRate,
		isLoading
	}
}

export const useSendUOMail = () => {

	let getUOMail = (itineraryId, language = 'en') => {
		const requestVal = {
			itineraryId: itineraryId,
			language: language
		}
		return new Promise(resolve => {
			SendUOMail(requestVal)
				.then(data => {
					resolve(data)
				})
		}).finally(() => { })
	}

	return {
		getUOMail,
	}
}
