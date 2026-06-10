import axios from 'axios';
// import store from '../Store';
import Constants from '../helpers/constants'

const defaultLocale = Constants.LANGUAGES_EN;
const configArray = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
	'X-localization': localStorage.getItem('locale') || defaultLocale
};

let API = axios.create({
	baseURL: ((process.env.NODE_ENV == 'development') ? process.env.REACT_APP_API_BASE_DEV : process.env.REACT_APP_API_BASE) + 'api/',
	timeout: 30000,
	headers: configArray,
	withCredentials: true,
});

// Add a request interceptor
API.interceptors.request.use(function (config) {
	// Do something before request is sent
	// const user = store.getState().btob.user;
	// let token = user.token;
	// let localStorageToken = localStorage.getItem('token');

	// if(token || localStorageToken) {
	// 	token = token || JSON.parse(localStorageToken).value
	// config.headers = {...configArray, 'Authorization': 'Bearer ' + token};
	// }
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
API.interceptors.response.use(function (response) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response.data;
}, function (error) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
	if (401 === error.response.status) {
		const errorResponse = {
			'status': 'Unauthorized',
			'statusCode': error.response.status,
			'message': 'Unauthorized'
		}
		return Promise.reject(errorResponse);
	} else {
		const errorToJson = error.response
		const errorResponse = {
			'status': errorToJson.data.status,
			'statusCode': errorToJson.status,
			'message': errorToJson.data.message
		}

		return Promise.reject(errorResponse);
	}
});


export default API;
