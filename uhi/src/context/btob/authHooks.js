// import { useStore } from 'easy-peasy';
// import { CustomerApi } from '../../api/btob/Customer';
import API from '../../api/Axios';
import {B2BUSER} from '../../api/Url';

export const useCheckLoggedInUser = () => {

	let CheckLoggedInUser = async () => {
		try {
			const response = await API.get(B2BUSER.get_user_information)
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

		// const getLoggedInUserData = await getUserSession()
		//
		// if (getLoggedInUserData.status) {
		// 	getLoggedInUserData.data.token = userToken.value
		// 	setUser(getLoggedInUserData.data)
		// 	setAuth(true)
		// 	return true
		// } else {
		// 	// user logout when backend session destroyed
		// 	localStorage.removeItem('token')
		// 	setUser({})
		// 	setAuth(false)
		// 	return false
		// }
		
		// if (tokenString) {
		// 	const userToken = JSON.parse(tokenString)
		// 	let now = new Date()
		//
		// 	//check if token expired
		// 	if (now.getTime() > userToken.expiry) {
		// 		// user logout when token expire
		// 		localStorage.removeItem('token')
		// 		setUser({})
		// 		return false;
		// 	} else {
		// 		const getLoggedInUserData = await getUserSession()
		//
		// 		if (getLoggedInUserData.status) {
		// 			getLoggedInUserData.data.token = userToken.value
		// 			setUser(getLoggedInUserData.data)
		// 			setAuth(true)
		// 			return true
		// 		} else {
		// 			// user logout when backend session destroyed
		// 			localStorage.removeItem('token')
		// 			setUser({})
		// 			setAuth(false)
		// 			return false
		// 		}
		// 	}
		// } else {
		// 	setUser({})
		// 	setAuth(false)
		// 	return false
		// }
	}
	return {
		CheckLoggedInUser
	}
}
//
// const getUserSession = async () => {
// 	const getLoggedInUserData = await CustomerApi()
// 	return getLoggedInUserData;
// }