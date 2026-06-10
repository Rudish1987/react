import {USER} from './Url';
import UseHttp from './UseHttp';
import Constants from '../helpers/constants'
/* eslint-disable */
export const LoginApi = async (values) => {
    const requestOptions = {
        user_name: values.username,
        password: values.password,
		_direct		: 0
    }
    try {
		let res = await UseHttp({url: USER.login, method: 'POST', body: requestOptions});
		setWithExpiry('token', res.token)
		return res;
	} catch (err) {
		return err;
	}
}
export const LogoutApi = async (user) => {
	try {
		let res = await UseHttp({
			url: USER.logout, method: 'POST'
		});
		localStorage.removeItem('token')
		return res;
	} catch (err) {
		return err;
	}
}

export const DirectLoginApi = async (values) => {
	const tokenString = localStorage.getItem('token');
	let userTokenString = ''
	if( tokenString ){
		const userToken = JSON.parse(tokenString)
		userTokenString = userToken.value
	}

    const requestOptions = {
        _token		: values._token,
		_direct		: 1,
		_userToken	: userTokenString
    }
    try {
		let res = await UseHttp({url: USER.login, method: 'POST', body: requestOptions});
		setWithExpiry('token', res.token)
		return res;
	} catch (err) {
		return err;
	}
}

export const LoggedInUserApi = async (values) => {
    try {
		let res = await UseHttp({ url: USER.loggedInUser,method:'GET' });
		return {'status': true, 'user': res}
	} catch (err) {
		return {'status': false, 'user': {}};
	}
}

const setWithExpiry = (key, value) => {
	//in miliseconds
	//let ttl = 3600000 //1hour
	let ttl = Constants.AUTH_TOKEN_EXPIRY //1day
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

