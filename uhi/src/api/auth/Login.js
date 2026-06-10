import { B2BUSER } from '../Url'
import API from '../Axios'

export const LoginApi = async (values) => {
	let requestOptions = {
		userName: values.email,
		password: values.password,
		rememberToken: values.rememberToken
	}
	if(typeof(values.domain) !== 'undefined'){
		requestOptions.domain = values.domain;
	}
    
	try {
		const response = await API.post(B2BUSER.B2Blogin, requestOptions)
			.then(function (response) {
				const tokenValue = response.data.token;
				setWithExpiry('token',tokenValue);
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
const setWithExpiry = (key, value) => {
	//in miliseconds
	let ttl = 3600000 // for now test purpose add 5min later add 3600000 // 1hour
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}