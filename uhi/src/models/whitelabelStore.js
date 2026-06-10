import { action, thunk } from 'easy-peasy'

const whitelabel = {
	isWhiteLabel: false,
	getIsWhiteLabel: thunk(async (actions, payload) => {
		actions.setIsWhiteLabel(payload);
	}),
	setIsWhiteLabel: action((state, payload) => {
		state.isWhiteLabel = payload
	}),
	layoutDetails: {},
	getLayoutDetails: thunk(async (actions, payload) => {
		actions.setLayoutDetails(payload);
	}),
	setLayoutDetails: action((state, payload) => {
		state.layoutDetails = payload
	})
};

export default whitelabel;