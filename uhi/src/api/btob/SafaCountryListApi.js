import API from '../Axios'
import {VISA} from '../Url'

export const safaCountryList = async () => {
	try {
		const response = await API.get(VISA.get_safa_country_list)
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