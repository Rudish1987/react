import { useState } from 'react';
import {gsSearchApi, gsSaveApi, gsGetAPi} from '../../api/GroundServiceApi';
import { useStore } from 'easy-peasy';

export const useSearchGroundServices = () => {
	const [isLoading, setIsLoading] = useState(true)
	const store = useStore();
	
	let searchGroundServices = () => {
		const requests = store.getState().btoc.requests;
		setIsLoading(true);
		
		return new Promise(resolve => {
			gsSearchApi(requests.groundService).then(data => resolve(data))
		}).finally(() => setIsLoading(false))
	}

	return {
		searchGroundServices,
		isLoading
	}
}

export const useSaveGroundService = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();

	const saveGroundService = (request) => {
		setIsLoading(true);
		const parentBookingCode = store.getState().btoc.afterBookingItineraryDetails.parentBookingCode;
		const rebook = store.getState().btoc.itineraryDetails.rebook;
		
		if(rebook) {
			request.bookedItnNumber = parentBookingCode ?? 0
		}
		return new Promise(resolve => {
			gsSaveApi(request).then(data => resolve(data))
		}).catch((error) => {
			console.error(error);
		}).finally(() => setIsLoading(false))
	}
	
	return {
		saveGroundService,
		isLoading
	}
}

export const useGetGroundService = () => {
	const [isLoading, setIsLoading] = useState(false)
	const getGroundService = (request) => {
		setIsLoading(true);
		return new Promise(resolve => {
			gsGetAPi(request).then(data => resolve(data))
		}).catch((error) => {
			console.error(error);
		}).finally(() => setIsLoading(false))
	}

	return {
		getGroundService,
		isLoading
	}
}
