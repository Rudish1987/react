import API from './Axios'
import { B2B_STATIC_PAGES } from './Url'

export const fetchTermsOfUse = async () => {
	try {
		const response = await API.get(B2B_STATIC_PAGES.get_termOfUse_termAndCondition)
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