// import { useState } from 'react';
// import axios from 'axios';
import API from '../../api/Axios'
import {WHITELABEL} from '../../api/Url'
import { useStore } from 'easy-peasy';

export const useCheckWhiteLabelCustomer = () => {
	const store = useStore();
	const getLayoutDetails = store.getActions().whitelabel.getLayoutDetails;

	const getWhileLabelLookFeel = async () => {
		let payload = {
			url: WHITELABEL.get_Look_and_Feel,
			request:{'domain': 'whitelabel'}
		}

		await API.post(payload.url, payload.request)
			.then(function (response) {
				getLayoutDetails(response.data)
			})
			.catch(function (error) {
				// In error we are getting json data so we can handle error
				console.log('error', error);
			});
	}
    
	getWhileLabelLookFeel()
    
	return true;
}