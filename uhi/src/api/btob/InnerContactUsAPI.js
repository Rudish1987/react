import API from '../Axios'
import {B2B_STATIC_PAGES} from '../Url'

export const InnerContactUsAPI = async () => {
	try {
		const response = await API.get(B2B_STATIC_PAGES.B2B_contactUs_innerPage)
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
