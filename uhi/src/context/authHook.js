import { useStore } from 'easy-peasy';
import { updateCustomerApi } from '../api/BookingApi';
import { LoggedInUserApi } from '../api/AuthApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Constants from '../helpers/constants';

export const useLogin = () => {
	const store = useStore();
	const navigate = useNavigate();
	const location = useLocation();

	let login = async (getdata) => {
		const setUser = store.getActions().btoc.setUser;
		const parentItineraryID = store.getState().btoc.itineraryDetails.itineraryid;
		let updateCust = '';
		setUser(getdata);
		if (parentItineraryID) {
			updateCust = await updateCustomerApi(getdata.user, parentItineraryID);
		}
		
		setWithExpiry('token', getdata.token);
		if (updateCust) {
			if(location.pathname.includes('/login'))
			{
				navigate(Constants.USER_PASSENGER_URL)
			}
		}

		return updateCust;
	}
	return {
		login
	}
}

export const useLogout = () => {
	const store = useStore();
	let logout = async () => {
		const setUser = store.getActions().btoc.setUser;
		localStorage.removeItem('token')
		setUser({})
	}
	return {
		logout
	}
}

export const useCheckLoggedInUser = () => {
	const store = useStore();

	let CheckLoggedInUser = async () => {
		const tokenString = localStorage.getItem('token');
		const user = store.getState().user;
		const setUser = store.getActions().btoc.setUser;
		
		if (tokenString) {
			const userToken = JSON.parse(tokenString)
			let now = new Date()

			//check if token expired
			if (now.getTime() > userToken.expiry) {
				// user logout when token expire
				localStorage.removeItem('token')
				setUser({})
			}
			else if (Object.keys(user).length === 0 && !user.token) {
				setUser({ 'token': userToken.value })
				const getLoggedInUserData = await getUserSession()

				if (getLoggedInUserData.status === true) {
					setUser({ 'token': userToken.value, 'user': getLoggedInUserData.user.user })
				} else {
					// user logout when backend session destroyed
					localStorage.removeItem('token')
					setUser({})
				}
			}else{
				const getLoggedInUserData = await getUserSession()
				if (getLoggedInUserData.status === true) {
					setUser({ 'token': userToken.value, 'user': getLoggedInUserData.user.user })
				}
			}

		} else {
			setUser({})
		}
	}
	return {
		CheckLoggedInUser
	}
}

const getUserSession = async () => {
	const getLoggedInUserData = await LoggedInUserApi()
	return getLoggedInUserData;
}

const setWithExpiry = (key, value) => {
	//in miliseconds
	let ttl = 3600000 //1hour
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}