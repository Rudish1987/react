import { useState } from 'react';
import { useStore} from 'easy-peasy';
import {
	B2B_PAYMENT
} from '../../api/Url';
import API from '../../api/Axios'

export const usePaymentAuthToken = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();

	const getPaymentAuthToken = async (request) => {
		const setPaymentAuthTokenData = store.getActions().btob.payment.setPaymentAuthTokenData;
		setIsLoading(true);

		try {
			const response = await API.post(`${B2B_PAYMENT.payment_auth_token}`, request)
				.then(function (response) {
					setPaymentAuthTokenData(response)
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
		getPaymentAuthToken,
		isLoading
	}
}

export const usePaymentAuthorize3ds = () => {
	const [isLoading, setIsLoading] = useState(false)

	const getPaymentAuthorize3ds = async (request) => {
		setIsLoading(true);

		try {
			const response = await API.post(`${B2B_PAYMENT.payment_auth_3ds}`, request)
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
		getPaymentAuthorize3ds,
		isLoading
	}
}

export const useConfirmBooking = () => {
	const [isLoading, setIsLoading] = useState(true)
	const store = useStore()

	const getConfirmBooking = async (request) => {
		setIsLoading(true);
		const setPaymentConfirmationData = store.getActions().btob.payment.setPaymentConfirmationData;

		try {
			const response = await API.post(`${B2B_PAYMENT.confirm_booking}`, request)
				.then(function (response) {
					setPaymentConfirmationData(response)
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
		getConfirmBooking,
		isLoading
	}
}