import { B2B_VISA } from '../Url';
import API from '../Axios';

export const VisaPassengerData = async (requestOptions) => {
	try {
		const response = await API.post(B2B_VISA.add_visa_passenger_post, requestOptions)
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				return error;
			});
		return response;
	} catch (err) {
		return err;
	}
}

export const VisaInvalidPassengerData = async (requestOptions) => {
	try {
		const response = await API.post(B2B_VISA.invaild_visa_passenger_post, requestOptions)
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				return error;
			});
		return response;
	} catch (err) {
		return err;
	}
}