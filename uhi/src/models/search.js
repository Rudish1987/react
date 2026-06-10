import btob from './btobStore';
import btoc from './btocStore';
import whitelabel from './whitelabelStore';
import {action, thunk} from 'easy-peasy';

const model = {
	isAuth: false,
	setAuth: action((state, payload) => {
		state.isAuth = payload
	}),
	user: {},
	setUser: action((state, payload) => {
		state.user = payload
	}),
	getUser: thunk(async (actions, payload) => {
		await payload.then(res => {
			if(res.status === true) {
				actions.setUser(res.data)
				actions.setAuth(true)
			} else {
				actions.setUser({})
				actions.setAuth(false)
			}
		})
	}),
	btob: btob,
	btoc: btoc,
	whitelabel: whitelabel
};

export default model;