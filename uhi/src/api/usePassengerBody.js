import { useStoreState, useStoreActions } from 'easy-peasy';
import moment from 'moment';

export const usePassengerBody = () => {
	const afterBookingItineraryDetails = useStoreState(s => s.btoc.afterBookingItineraryDetails);
	const passengers = useStoreState(actions => actions.btoc.itineraryDetails.passengers);
	const setPassengers = useStoreActions(actions => actions.btoc.itineraryDetails.setPassengers);
	const setPassengerResult = useStoreActions(actions => actions.btoc.itineraryDetails.setPassengerResult);
	const user = useStoreState(s => s.user);
	
	const preparePassengerDetails = async (values) => {
		let salutation = values.gender == 'M' ? 147 : 148;
		if(passengers.length > 0) {
			let newPassengerDetails = passengers;
			let adultKey = values.passengerNum - 1;
			
			newPassengerDetails[adultKey] = {
				'leading': values.leading,
				'givenName' : values.givenName,
				'surname' : values.surname,
				'gender'  : values.gender,
				'salutation' : salutation,
				'dateOfBirth' : moment(values.dateOfBirth).format('YYYY-MM-DD'),
				'nationality' : afterBookingItineraryDetails.passengerCountry.Country_Code,
				'residency'  : afterBookingItineraryDetails.passengerCountry.Country_Code,
				'muramNumber'  : values.muramNumber,
				'passport' : values.passport,
				'passportExpiry'  : moment(values.passportExpiry).format('YYYY-MM-DD'),
				'countryPhoneCode' : user.user.PrefTel,
				'phoneNumber' : user.user.Tel,
				'email': user.user.Email
			};
			setPassengerResult(newPassengerDetails)
		} else {
			const passenger = {
				'leading': values.leading,
				'givenName': values.givenName,
				'surname': values.surname,
				'gender' : values.gender,
				'salutation' : salutation,
				'dateOfBirth': moment(values.dateOfBirth).format('YYYY-MM-DD'),
				'nationality': afterBookingItineraryDetails.passengerCountry.Country_Code,
				'residency' : afterBookingItineraryDetails.passengerCountry.Country_Code,
				'muramNumber' : values.muramNumber,
				'passport': values.passport,
				'passportExpiry' : moment(values.passportExpiry).format('YYYY-MM-DD'),
				'countryPhoneCode' : user.user.PrefTel,
				'phoneNumber' : user.user.Tel,
				'email': user.user.Email
			}
			setPassengers(passenger)
		}
	}

	return {
		preparePassengerDetails
	}
}