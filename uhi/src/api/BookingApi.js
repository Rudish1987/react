import {BOOKING} from './Url';
import UseHttp from './UseHttp';
/* eslint-disable */
export const updateCustomerApi = async (values, itineraryCode) => {
    const requestVal = {
        customerCode: values.Cod,
        parentCustomerId: values.ParentId,
		itinerary: itineraryCode
    }
	try {
		let res = await UseHttp({url: BOOKING.update_booking_customer, method: 'POST', body: requestVal});
		return res;
	} catch (err) {
		return err;
	}
}
export const AmendPassenger = (data) => UseHttp({ url: BOOKING.amend_passenger, method:'POST', body: data });
export const AmendFlight = (data) => UseHttp({ url: BOOKING.amend_flight, method:'POST', body: data });
export const PassengerFlight = (data) => UseHttp({ url: BOOKING.get_passengers_flight + '/' + data});
export const getMOHUlinkParams = (data) => UseHttp({ url: BOOKING.visa_request_id, method:'POST', body: data });
export const AfterBookingAllDetails = (data, headers, isSaved = '') => UseHttp({ url: BOOKING.get_details_after_booking + '/' + data + '/' + isSaved});
export const CancelItinerary = (data) => UseHttp({ url: BOOKING.cancel_itinerary, method:'POST', body: data });
export const CurrencyConversionRate = () => UseHttp({ url: BOOKING.currency_rate, method:'POST' });
export const CityAirportApi = () => UseHttp({ url: BOOKING.city_airport_list,method:'GET' });
export const SendUOMail = (data) => UseHttp({ url: BOOKING.send_uo_mail, method:'POST', body: data });
export const checkMutamerInfo = (data) => UseHttp({ url: BOOKING.check_mutamer_info + '/' + data});