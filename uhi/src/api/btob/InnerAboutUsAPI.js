import API from '../Axios'
import {B2B_STATIC_PAGES} from '../Url'

export const InnerAboutUsAPI = async () => {
	try {
		const response = await API.get(B2B_STATIC_PAGES.B2B_aboutUs_innerPage)
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
