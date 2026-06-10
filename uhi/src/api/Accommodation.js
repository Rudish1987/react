import UseHttp from './UseHttp';
import {HOTELS, BOOKING} from './Url';

export const filterApi = () => UseHttp({ url: HOTELS.get_filter_list });
export const accommodationSearchApi = (data) => UseHttp({ url : HOTELS.get_search_result, method:'POST', body: data});
export const accommodationSaveRoomApi = (data) => UseHttp({ url : HOTELS.save_room, method:'POST', body: data});
export const deleteIteneraryApi = (data) => UseHttp({ url : BOOKING.delete_itenerary, method:'POST', body: data});

//booking requests
export const generateAuthTokenApi = (data) => UseHttp({ url : BOOKING.payment_auth_token, method:'POST', body: data});
export const generateAuthorize3ds = (data) => UseHttp({ url : BOOKING.payment_auth_3ds, method:'POST', body: data});
export const confirmBooking = (data) => UseHttp({ url : BOOKING.confirm_booking, method:'POST', body: data});
export const visaRequest = (data) => UseHttp({ url : BOOKING.visa_request, method:'POST', body: data});
export const confirmCreditBooking = (data) => UseHttp({ url : BOOKING.confirm_credit_booking, method:'POST', body: data});
