//import React from 'react'
import store from '../Store';
import Constants from '../helpers/constants'

const UseHttp = async (requestConfig) => {
	// const user = store.getState().btoc.user;
	const defaultLocale = Constants.LANGUAGES_EN;
	
	const setErrorExceptipons = store.getActions().btoc.setErrorExceptipons;
	const setSaveBookingAPIFlag = store.getActions().btoc.setSaveBookingAPIFlag;
	
	
	// const token =user.token;
	const basicheaders = {
		'Content-type': 'application/json',
		'Accept': 'application/json',
		'X-localization': localStorage.getItem('locale') || defaultLocale,
		// 'Authorization': token ? `Bearer ${token}` : '',
	};
	

	return fetch(requestConfig.url, {
		method: requestConfig.method || 'GET',
		headers: {...basicheaders, ...requestConfig.headers},
		body: requestConfig.body && JSON.stringify(requestConfig.body),
		credentials: 'include'
	}).then((response) => {
		if (response.ok) {
			return response.json();
		}
		return response.json().then((json) => {
			var msg = 'Internal Server Error!';
			if( response.status == 500 ){
				throw new Error(msg);
			}
			if(json.data != null) {
				if (('errors' in json.data) && (typeof json.data.errors === 'string' || json.data.errors instanceof String)){
					msg = json.data.errors;
				}else{
					msg = json.message;
				}
			}else{
				msg = json.message;
			}
			throw new Error(msg);
		})
	}).then((data) => {
		if( data.status ){
			setSaveBookingAPIFlag(true)
			return data.data
		}else{
			let responseErr = {'message':data.message, 'status':false, data:[], code:data.code}
			setErrorExceptipons(responseErr)
			setSaveBookingAPIFlag(false)
			return responseErr;
		}

	}).catch((error) => {
		
		setSaveBookingAPIFlag(false)
		setErrorExceptipons({'message':error.message, 'status':false, data:[], code:500})


		return {'message':error.message, 'status':false, data:[]};
	});

}
export default UseHttp;