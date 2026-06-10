import API from '../Axios'
import {WHITELABEL} from '../Url'

export const getWhitelabelCustomeTheme = async (domainName) => {
    
	try {
		let payload = {
			url: WHITELABEL.get_Look_and_Feel,
			request:{'domain': domainName}
		}

		const response = await API.post(payload.url, payload.request)
			.then(function (response) {
				return response
			})
			.catch(function (error) {
				return error;
			});

		return response;
	} catch (error) {
		return error;
	}
};
