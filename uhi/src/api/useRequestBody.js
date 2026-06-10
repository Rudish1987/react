import { useStoreState, useStoreActions } from 'easy-peasy';
import moment from 'moment';
import { useLocale } from '../context/LocaleContext';
import Constants from '../helpers/constants'

export const useRequestBody = () => {

	const PAX_PER_CAR = '2';
	const filters = useStoreState(s => s.btoc.filters);
	const setCommonRequest = useStoreActions(actions => actions.btoc.requests.setCommonRequest);
	const setMakkahRequest = useStoreActions(actions => actions.btoc.requests.setMakkahRequest);
	const setMadinahRequest = useStoreActions(actions => actions.btoc.requests.setMadinahRequest);
	const setTransferRequest = useStoreActions(actions => actions.btoc.requests.setTransferRequest);
	const setGroundServiceRequest = useStoreActions(actions => actions.btoc.requests.setGroundServiceRequest);
	const { locale } = useLocale();
	let arrivalDateFormatted = ''
	const prepareDataForSearch = () => {
		const { travelPeriod, nightStayInMakkah: stayInMakkah, nightStayInMadinah: stayInMadinah, rooms, residency, nationality, checkResidencySwitch } = filters;
		const makkah = {
			Destination: Constants.MAKKAH,
			dateFrom: moment(travelPeriod.from).format('YYYY-MM-DD'),
			dateTo: moment(travelPeriod.from).add(stayInMakkah, 'days').format('YYYY-MM-DD'),
			rooms: rooms
		}

		setMakkahRequest(makkah);
		arrivalDateFormatted = moment(travelPeriod.from).add(stayInMakkah, 'days').format('YYYY-MM-DD')

		if (stayInMadinah > 0) {
			const madinah = {
				Destination: Constants.MADINAH,
				dateFrom: moment(travelPeriod.from).add(stayInMakkah, 'days').format('YYYY-MM-DD'),
				dateTo: moment(travelPeriod.from).add(stayInMakkah + stayInMadinah, 'days').format('YYYY-MM-DD'),
				rooms: rooms
			}
			setMadinahRequest(madinah)
			arrivalDateFormatted = moment(travelPeriod.from).add(stayInMakkah + stayInMadinah, 'days').format('YYYY-MM-DD')
		}
		else {
			setMadinahRequest({})
		}
		setCommonRequest({
			residency: checkResidencySwitch ? nationality.Country_Code : residency.Country_Code,
			nationality: nationality.Country_Code,
			language: locale.value,
			Currency: Constants.CURRENCY
		});

		const buildAdultCount = () => {
			let number = '';
			let adults = Number(rooms.reduce((a, b) => a + (b.adultsCount * b.room), 0))
			number += `${adults}`
			return number;
		}

		const buildVehicleCount = () => {
			let text = ''
			let count = 0;
			let paxPerCar = Number(PAX_PER_CAR);
			let adultCount = Number(buildAdultCount());

			if (paxPerCar > adultCount) {
				count = 1;
			} else {
				count = Math.ceil(adultCount / paxPerCar);
			}
			text += `${count}`
			return text;

		}

		setTransferRequest({
			'route': filters.routecode,
			'transferType': 'all',
			'vehiclesNo': buildVehicleCount(),
			'departureDateFormatted': moment(travelPeriod.from).format('YYYY-MM-DD'),
			'arrivalDateFormatted': arrivalDateFormatted,
			'adultsCount': buildAdultCount(),
			'paxPerCar': PAX_PER_CAR,
			'transCompany': '0',
			'vehicleCategory': '0',
			'vehicleType': '0',
			'language': locale.value,
			'Currency': '492'
		});

		setGroundServiceRequest({
			dateFrom:moment(travelPeriod.from).format('YYYY-MM-DD'),
			dateTo:moment(travelPeriod.from).add(stayInMakkah + stayInMadinah, 'days').format('YYYY-MM-DD'),
			nationality: nationality.Country_Code,
			residency: checkResidencySwitch ? nationality.Country_Code : residency.Country_Code,
			Currency: Constants.CURRENCY,
			adults:buildAdultCount(),
			children: 0
		});
	}


	return {
		prepareDataForSearch
	}
}
