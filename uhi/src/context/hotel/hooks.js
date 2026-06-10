import { useState } from 'react';
import {
	accommodationSearchApi,
	accommodationSaveRoomApi,
	deleteIteneraryApi,
	generateAuthTokenApi,
	generateAuthorize3ds,
	confirmBooking,
	visaRequest,
	confirmCreditBooking
} from '../../api/Accommodation';
import { useStore, useStoreActions,} from 'easy-peasy';

export const useSearchHotels = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();

	const searchHotels = (destination) => {
		const requests = store.getState().btoc.requests;
		setIsLoading(true);
		return new Promise(resolve => {

			accommodationSearchApi({...requests.common,...requests[destination]})
				.then(data => {
					resolve(data)
				})
		}).finally(() => setIsLoading(false))

	}

	return {
		searchHotels,
		isLoading
	}
}


export const useSaveRoom = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();

	const saveRoom = (request) => {
		const parentBookingCode = store.getState().btoc.afterBookingItineraryDetails.parentBookingCode;
		const rebook = store.getState().btoc.itineraryDetails.rebook;
		
		if(rebook) {
			request.bookedItnNumber = parentBookingCode ?? 0
		}

		setIsLoading(true);

		return new Promise(resolve => {
			accommodationSaveRoomApi(request)
				.then(data => {
					resolve(data)
				})
		}).catch((error) => {
			console.error(error);
		}).finally(() => setIsLoading(false))

	}

	return {
		saveRoom,
		isLoading,
	}
}


export const useDeleteItenerary = () => {
	const [isLoading, setIsLoading] = useState(false)

	const deleteItenerary = (request) => {

		setIsLoading(true);

		return new Promise(resolve => {
			deleteIteneraryApi(request)
				.then(data => resolve(data))
		}).catch((error) => {
			console.error(error);
		}).finally(() => setIsLoading(false))

	}

	return {
		deleteItenerary,
		isLoading
	}
}

export const usePaymentAuthToken = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();

	const getPaymentAuthToken = (request) => {
		const setPaymentAuthTokenData = store.getActions().btoc.itineraryDetails.setPaymentAuthTokenData;
		setIsLoading(true);

		return new Promise(resolve => {
			generateAuthTokenApi(request)
				.then(data => {
					resolve(data)
					setPaymentAuthTokenData(data)
				})
		}).catch((error) => {
			console.error(error);
		}).finally(() => setIsLoading(false))

	}

	return {
		getPaymentAuthToken,
		isLoading
	}
}

export const usePaymentAuthorize3ds = () => {
	const [isLoading, setIsLoading] = useState(false)

	const getPaymentAuthorize3ds = (request) => {
		setIsLoading(true);

		return new Promise(resolve => {
			generateAuthorize3ds(request)
				.then(data => {
					resolve(data)
				})
		}).catch((error) => {
			console.error(error);
		}).finally(() => setIsLoading(false))

	}

	return {
		getPaymentAuthorize3ds,
		isLoading
	}
}

export const useConfirmBooking = () => {
	const [isLoading, setIsLoading] = useState(true)
	const setPaymentConfirmationData = useStoreActions(actions => actions.btoc.itineraryDetails.setPaymentConfirmationData)
	const store = useStore()

	const getConfirmBooking = async (request) => {

		setIsLoading(true);
		//store in DB for failed booking search request creation
		const filters = store.getState().btoc.filters;
		request.filters = filters

		new Promise(resolve => {
			confirmBooking(request)
				.then(data => {

					resolve(data)
					setPaymentConfirmationData(data)
				})
		}).catch((error) => {
			console.error(error.message);
		}).finally(() => setIsLoading(false))

	}

	return {
		getConfirmBooking,
		isLoading
	}
}

export const useVisaRequest = () => {
	const [isLoading, setIsLoading] = useState(false)

	const getVisaRequest = (request) => {

		setIsLoading(true);

		new Promise(resolve => {
			visaRequest(request)
				.then(data => resolve(data))
		}).catch((error) => {
			console.error(error.message);
		}).finally(() => setIsLoading(false))

	}

	return {
		getVisaRequest,
		isLoading
	}
}


export const useConfirmCreditBooking = () => {
	const [isLoading, setIsLoading] = useState(true)
	//const store = useStore();
	const setPaymentConfirmationData = useStoreActions(actions => actions.btoc.itineraryDetails.setPaymentConfirmationData)
	const setBookingStatus = useStoreActions(actions => actions.btoc.itineraryDetails.setBookingStatus)
	const store = useStore()

	const getConfirmCreditBooking = async (request) => {

		setIsLoading(true);
		//store in DB for failed booking search request creation
		const filters = store.getState().btoc.filters;
		request.filters = filters

		new Promise(resolve => {
			confirmCreditBooking(request)
				.then(data => {

					resolve(data)
					setPaymentConfirmationData(data)
					setBookingStatus(data)
				})
		}).catch((error) => {
			console.error(error.message);
		}).finally(() => setIsLoading(false))

	}

	return {
		getConfirmCreditBooking,
		isLoading
	}
}
