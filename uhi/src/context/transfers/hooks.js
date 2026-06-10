import { useState } from 'react';
import {transferSearchApi,saveTransferApi} from '../../api/TransferApi';
import { useStore } from 'easy-peasy';

export const useSearchTransfers = () => {
	const [isLoading, setIsLoading] = useState(true)
	const store = useStore();
	
	let searchTransfers = () => {
		const requests = store.getState().btoc.requests;
		setIsLoading(true);
		
		return new Promise(resolve => {
			transferSearchApi(requests.transfer).then(data => resolve(data))
		}).finally(() => setIsLoading(false))
	}

	return {
		searchTransfers,
		isLoading
	}
}

export const useSaveTransfer = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();

	const saveTransfer = (request) => {
		setIsLoading(true);
		const parentBookingCode = store.getState().btoc.afterBookingItineraryDetails.parentBookingCode;
		const rebook = store.getState().btoc.itineraryDetails.rebook;
		
		if(rebook) {
			request.bookedItnNumber = parentBookingCode ?? 0
		}
		return new Promise(resolve => {
			saveTransferApi(request)
				.then(data => resolve(data))
		}).catch((error) => {
			console.error(error);
		}).finally(() => setIsLoading(false))
		
	}

	return {
		saveTransfer,
		isLoading
	}
}
