import React, {createContext, useContext} from 'react';
import {addDays} from 'date-fns';

const today = new Date();

const initialValue = {
	destination: 10,
	filters: {
		destination: '',
		travelPeriod: {
			from: today,
			to: addDays(today, 5)
		},
		guests: [
			{
				rooms: 1,
				adults: 2,
				children: 0
			}
		]
	},
	results: []
};

const hotelsReducer = (state, action) => {
	switch (action.type) {
	case 'SET_RESULTS':
		return {...state, results: action.payload}
	case 'SET_DESTINATION':
		return {...state, filters: {...state.filters, destination: action.payload}}
	case 'SET_TRAVEL_PERIOD':
		return {...state, filters: {...state.filters, travelPeriod: action.payload}}
	case 'SET_GUESTS':
		state.filters.guests[action.payload.idx] = {...state.filters.guests[action.payload.idx], ...action.payload.newValue}
		return {...state}
	case 'ADD_ROOM':
		return {
			...state, filters: {
				...state.filters, guests: [...state.filters.guests, {
					rooms: 1,
					adults: 2,
					children: 0
				}]
			}
		}
	default:
		return state;
	}
}

const HotelSearchContext = createContext(initialValue);

export const useHotelStore = () => {
	return useContext(HotelSearchContext)
}

const HotelSearchProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(hotelsReducer, initialValue);

	const setDestination = (newValue) => {
		dispatch({type: 'SET_DESTINATION', payload: newValue});
	}

	const setTravelPeriod = (newValue) => {
		dispatch({type: 'SET_TRAVEL_PERIOD', payload: newValue});
	}

	const setGuests = (idx, newValue) => {
		dispatch({type: 'SET_GUESTS', payload: {idx, newValue}});
	}
	const setResults = (newValue) => {
		dispatch({type: 'SET_RESULTS', payload: newValue});
	}

	const addRoom = () => {
		dispatch({type: 'ADD_ROOM'});
	}

	const providerProps = {
		filters: state.filters,
		results: state.results,
		handlers: {
			setDestination,
			setTravelPeriod,
			setGuests,
			setResults,
			addRoom
		}
	}

	return (
		<HotelSearchContext.Provider value={providerProps}>
			{children}
		</HotelSearchContext.Provider>
	);
};

export default HotelSearchProvider;
