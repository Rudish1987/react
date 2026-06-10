import API from '../Axios'
import Constants from '../../helpers/constants'

export const ReqDemo = async (data) => {
	try {
		const response = await API.post(Constants.REQUEST_DEMO_ENDPOINT, {'name':data.name,'email':data.email,'country':data.country,'phone':Number(data.phone),'countryPhoneCode':Number(data.countryPhoneCode)})
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
