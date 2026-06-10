import API from './Axios'
import {LANDING} from './Url'

export const getSalutations = async () => {
	try {
		const response = await API.get(LANDING.get_salutation_list)
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