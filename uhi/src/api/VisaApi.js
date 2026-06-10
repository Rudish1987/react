import UseHttp from './UseHttp';
import {VISA, LANDING} from './Url';
import API from './Axios'

export const visaFees = (data) => UseHttp({ url: VISA.get_visa_fees, method:'POST', body: data });
export const mutamerValidation = (data) => UseHttp({ url: VISA.get_mutamer_validation, method:'POST', body: data });
export const dotwSaveBooking = (data) => UseHttp({ url: VISA.post_visa_save_booking, method:'POST', body: data });
// export const getTravelersList = async() => await API.get(`${LANDING.get_news_list}`)

//new VISA API
export const getTravelersList = async () => {
	try {
		const response = await API.get(`${LANDING.get_news_list}`) //need to replace with visa list
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
export const visaBookingList = async () => {
	try {
		const response = await API.get(`${VISA.get_booking_list}`)
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
