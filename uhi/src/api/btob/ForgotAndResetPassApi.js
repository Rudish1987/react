import { B2BUSER } from '../Url';
import API from '../Axios'

export const UpdatePassword = async (values) => {
	let requestOptions = {
		user_name: values.user_name,
		password: values.password,
		password_confirmation: values.password_confirmation,
		token: values.token,
	}
    
	try {
		const response = await API.post(B2BUSER.B2BResetPassword, requestOptions)
			.then(function (response) {
				return response;
			})
			.catch(function (err) {
				return err;
			});

		return response;
	} catch (err) {
		return err;
	}
}

export const ForgotPasswordApi = async (loginId, isWhiteLabel) => {
	try {
		const payload = {
			'user_name'			  : loginId,
			'isWhiteLabelDomain'  : isWhiteLabel
		}
		const response = await API.post(B2BUSER.B2BforgotPassword, payload)
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