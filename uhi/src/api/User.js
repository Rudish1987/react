import UseHttp from './UseHttp';
import {USER ,BOOKING} from './Url';
import Constants from '../helpers/constants';

export const ProfileApi = () => UseHttp({ url : USER.profile});

export const ProfileApiUpdate = async (values) => {
	const requestOptions = {
		first_name: values.firstName,
		last_name: values.lastName,
		user_name: values.email,
		email: values.email,
		currency: Constants.CURRENCY,
		mobile:values.mobile,
		license_agreement: 0 // this is optional

	}
	try {
		let res = await UseHttp({ url: USER.profile, method:'POST', body:requestOptions});
		return res;
	} catch (err) {
		return err;
	}
}

export const ChangePasswordApi = async (values) => {
	const requestOptions = {
		current_password:values.currentPassword,
		password:values.newPassword,
		password_confirmation:values.repeatNewPassword,
		license_agreement: 0, // this is optional

	}
	try {
		let res = await UseHttp({ url: USER.changePassword,method:'POST',body:requestOptions});
		return res;
	} catch (err) {
		return err;
	}
}

export const ForgotPasswordApi = async (email) => {
	const requestOptions = {
		user_name:email,
		license_agreement: 0, // this is optional
	}
	try {
		let res = await UseHttp({ url: USER.forgotPassword,method:'POST',body:requestOptions});
		return res;
	} catch (err) {
		return err;
	}
}
export const ForgotPasswordApiWL = async (email) => {
	const requestOptions = {
		user_name:email,
		license_agreement: 0, // this is optional
	}
	try {
		let res = await UseHttp({ url: USER.forgotPassword,method:'POST',body:requestOptions});
		return res;
	} catch (err) {
		return err;
	}
}

export const ResetPasswordApi = async (data) => {
	try {
		let res = await UseHttp({ url: USER.resetPassword, method:'POST', body:data});
		return res;
	} catch (err) {
		return err;
	}
}

export const BookingListApi = (pageNo,searchStatus,itinId) => UseHttp({ url : BOOKING.booking_list+'?pageNo='+pageNo+'&status='+searchStatus+'&itineraryId='+itinId})