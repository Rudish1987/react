import { USER } from './Url';
import UseHttp from './UseHttp';
import Constants from '../helpers/constants';

export const RegisterApi = async (values) => {
	const requestOptions = {
		title: Constants.SALUTATION,
		first_name: values.firstName,
		last_name: values.lastName,
		user_name: values.email,
		email: values.email,
		password: values.password,
		password_confirmation: values.password,
		mobile: values.mobile,
		country: values.country.Tel_Country_Code,
		currency: Constants.CURRENCY,
		license_agreement: 0 // this is optional
	}
	try {
		let res = await UseHttp({ url: USER.registration, method: 'POST', body: requestOptions });
		return res;
	} catch (err) {
		return err;
	}
}
