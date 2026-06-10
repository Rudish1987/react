import API from './Axios'
import {LANDING} from './Url'

export const fetchCityData = async (countryCode) => {
	try {
		const response = await API.get(`${LANDING.get_city_list}/${countryCode}`)
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