import API from '../Axios'
import {B2BUSER} from '../Url'

export const CustomerApi = async () => {
	try {
		const response = await API.get(B2BUSER.get_user_information)
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				return error;
			});

		return response;
	} catch (error) {
		return error;
	}
};
export const CustomerTypeApi = async (customerCode) => {
	try {
		const response = await API.get(`${B2BUSER.B2B_customer_type}/${customerCode}`)
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				return error;
			});

		return response;
	} catch (error) {
		return error;
	}
};
