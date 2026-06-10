import { useStoreState } from 'easy-peasy';
import moment from 'moment';

export const useFlightBody = () => {
	const itineraryid = useStoreState(actions => actions.btoc.itineraryDetails.itineraryid);
	const prepareFlightDetails = (values) => {
		return {
			'parentBookingCode': itineraryid,
			'id':values.id,
			'flightAutoId':values.id,
			'arrivalFrom': values.arrival,
			'arrivalFlight': values.arrivalFlightNumber,
			'departedTo': values.departure,
			'departedFlight': values.departureFlightNumber,
			'arrivalDate': moment(values.arrivalDate).format('YYYY-MM-DD') + ' ' + moment(values.arrivalTime).format('HH:mm:ss'),
			'departedDate': moment(values.departureDate).format('YYYY-MM-DD') + ' ' + moment(values.departureTime).format('HH:mm:ss'),
		}
	}

	return {
		prepareFlightDetails
	}
}