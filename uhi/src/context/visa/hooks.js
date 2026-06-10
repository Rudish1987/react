import { useState } from 'react';
import { visaFees, mutamerValidation, dotwSaveBooking } from '../../api/VisaApi';
import { useStore } from 'easy-peasy';
import { useLocale } from '../LocaleContext';
import Constants from '../../helpers/constants';
import {getSafaCountryName, getSafaCountryNameAr, getUmrahCountryCode} from '../../helpers/utils';
import {
	LANDING, //for testing
	VISA, //replace with this
	B2B_VISA,
} from '../../api/Url';
import API from '../../api/Axios'
import { VisaPassengerData, VisaInvalidPassengerData } from '../../api/btob/AddVisaPassenger';
import moment from 'moment';

export const useVisaFeesCalculation = () => {
	const [isLoading, setIsLoading] = useState(true)
	const store = useStore();

	let visaFeesCalculation = () => {
		const nationality = store.getState().btoc.filters.nationality.ShortCountryName;
		const passportNo = Constants.PASSPORT_NUMBER_VISA;
		let requests = {
			'NationalityId': nationality,
			'PassportNo': passportNo
		}
		setIsLoading(true);

		return new Promise(resolve => {
			visaFees(requests).then(data => resolve(data))
		}).finally(() => setIsLoading(false))
	}

	return {
		visaFeesCalculation,
		isLoading
	}
}

export const useMutamerEarlyValidation = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();

	let visaMutamerValidation = () => {
		const itineraryDetails = store.getState().btoc.itineraryDetails;
		let requests = {
			'parentBookingCode': itineraryDetails.itineraryid
		}
		setIsLoading(true);

		return new Promise(resolve => {
			mutamerValidation(requests).then(data => resolve(data))
		}).finally(() => setIsLoading(false))
	}

	return {
		visaMutamerValidation,
		isLoading
	}
}

export const useSaveBooking = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();
	const { locale } = useLocale();

	let saveBooking = () => {
		const itineraryDetails = store.getState().btoc.itineraryDetails;
		const afterBookingpackagedetails = store.getState().btoc.afterBookingpackagedetails;
		const filters = store.getState().btoc.filters;

		let requests = {
			'dateFrom': afterBookingpackagedetails.makkah.dateFrom,
			'dateTo': afterBookingpackagedetails.makkah.dateTo,
			'nationality': filters.nationality.Country_Code,
			'language': locale.value,
			'currency': Constants.CURRENCY,
			'price': afterBookingpackagedetails.visa.VisaFeesAmount,
			'itinerary': itineraryDetails.itineraryid,
			'passengers': itineraryDetails.passengers
		}
		setIsLoading(true);

		return new Promise(resolve => {
			dotwSaveBooking(requests).then(data => resolve(data))
		}).finally(() => setIsLoading(false))
	}

	return {
		saveBooking,
		isLoading
	}
}

export const useGetTravelersList = () => {
	const [isLoading, setIsLoading] = useState(false)

	let travelerlistVisa = async (itineraryDetails) => {
		setIsLoading(true);

		try {

			const response = await API.get(`${VISA.get_travelers_list}${itineraryDetails.type}/${itineraryDetails.itineraryId}`)
				.then(function (response) {
					return response;
				})
				.catch(function (error) {
					return error;
				});

			response.itineraryDetails = itineraryDetails;

			return response;
		} finally {
			setIsLoading(false);
		}
	}

	return {
		travelerlistVisa,
		isLoading
	}
}

export const useRemoveTravelersList = () => {
	const [isLoading, setIsLoading] = useState(false)

	let removeVisaTraveler = async (requestOptions) => {
		setIsLoading(true);
		try {
			const response = await API.post(`${B2B_VISA.remove_traveler_from_list}`, requestOptions )
				.then(function (response) {
					return response;
				})
				.catch(function (error) {
					return error;
				});

			return response;

		} finally {
			setIsLoading(false);
		}
	}

	return {
		removeVisaTraveler,
		isLoading
	}
}


export const useSendVisa = () => {
	const [isLoading, setIsLoading] = useState(false)

	let sendVisaToTraveler = async (requestOptions) => {
		console.log(requestOptions)
		setIsLoading(true);
		try {
			const response = await API.get(`${LANDING.get_news_list}`) //remove this code and uncomment below post request
				.then(function (response) {
					return response;
				})
				.catch(function (error) {
					return error;
				});


			// const response = await API.post(`${VISA.send_visa}`, requestOptions)
			// 	.then(function (response) {
			// 		return response;
			// 	})
			// 	.catch(function (err) {
			// 		return err;
			// 	});

			return response;

		} finally {
			setIsLoading(false);
		}
	}

	return {
		sendVisaToTraveler,
		isLoading
	}
}

//Save visa passengers
export const useSaveVisaPassnger = () => {
	const [isLoading, setIsLoading] = useState(false);
	const store = useStore();
	const passportData = store.getState().btob.visa.passportData;
	const requestList = store.getState().btob.visa.requestList;
	const safaCountry = store.getState().btob.visa.safaCountry;
	const itineraryId = store.getState().btob.visa.itineraryId;
	const travelersList = store.getState().btob.visa.travelersList;
	const itineraryDetails = store.getState().btob.visa.itineraryDetails;

	let saveVisaPassnger = async (values) => {
		setIsLoading(true);

		let requestOptions = {
			dateFrom: moment(values.arrivalDate).format('YYYY-MM-DD'),
			dateTo: moment(values.returnDate).format('YYYY-MM-DD'),
			currency: Constants.CURRENCY,
			nationality: getUmrahCountryCode(safaCountry, values.nationality),
			price: travelersList[0] ? travelersList[0].visaFee : requestList.package_price,
			itinerary: itineraryDetails.type == Constants.VISA_SAFA_STATUS_BOTH ? itineraryDetails.saveParentId : itineraryDetails.type == Constants.VISA_SAFA_STATUS_SAVE ? itineraryId : 0,
			bookedItnNumber: itineraryDetails.type != Constants.VISA_SAFA_STATUS_SAVE ? itineraryId : 0,
			passengers: [
				{
					passengerId: values.passengerId,
					salutation: values.title,
					givenName: values.firstName,
					surname: values.lastName,
					passport: values.passportNumber,
					passportType: values.passportType,
					birthCountry: getUmrahCountryCode(safaCountry, values.birthCountry.natCode),
					birthPlace: values.birthPlace,
					residenceCountry: getUmrahCountryCode(safaCountry, values.residenceCountry.natCode),
					gender: values.gender,
					issueCountry: getUmrahCountryCode(safaCountry, values.issueCountry.natCode),
					issuePlace: values.issuePlace,
					dateOfBirth: moment(values.birthDate).format('YYYY-MM-DD'),
					passportIssue: moment(values.issueDate).format('YYYY-MM-DD'),
					passportExpiry: moment(values.expiryDate).format('YYYY-MM-DD'),
					fatherName: values.fatherName,
					grandfatherName: values.gFatherName,
					job: values.job,
					married: values.maritalStatus,
					education: values.education,
					nationalID: values.nationalID,
					madinahDate: values.medinaDate !== null ? moment(values.medinaDate).format('YYYY-MM-DD'): null,
					arFirstName: values.arFirstName,
					arLastName: values.arLastName,
					arFatherName: values.arFatherName,
					arGFatherName: values.arGFatherName,
					status: values.status,
					mrz: values.mrz,
					faceImageUrl: values.faceImageUrl,
					passportImageUrl: values.passportImageUrl,
					safaFaceImage: values.safaFaceImage,
					safaPassportImage: values.safaPassportImage
				}
			],
			safapackage: {
				configuration_uuid: requestList.configuration_uuid,
				destination_id: 966,
				visa_type_id: requestList.visa_type_id,
				residence_id: requestList.residence_id,
				package_uuid: requestList.package_uuid,
				pax: requestList.range_to, // we need to discuss with Safa
				currency: 'SAR',
				expiration_days: requestList.expiration_days,
				payment_method: 'debit'
			}
		};

		if (requestOptions.passengers[0].gender == 'Male')
			requestOptions.passengers[0].gender = 'M';
		else if (requestOptions.passengers[0].gender == 'Female')
			requestOptions.passengers[0].gender = 'F';

		try {
			let response = {}
			if(passportData.visaStatus == Constants.B2B_VISA_STATUS_DENIED) {
				requestOptions.passengers[0].safaPackageId = values.safaPackageId
				requestOptions.passengers[0].safaPassengerCode = values.safaPassengerCode
				response = await VisaInvalidPassengerData(requestOptions);
			} else {
				response = await VisaPassengerData(requestOptions);
			}

			return response;

		} finally {
			setIsLoading(false);
		}
	}

	return {
		saveVisaPassnger,
		isLoading
	}
}


export const useGetVisaBookingList = () => {
	const [isLoading, setIsLoading] = useState(true)

	let getVisaList = async () => {
		setIsLoading(true);
		try {


			const response = await API.get(`${VISA.get_booking_list}`)
				.then(function (response) {
					return response;
				})
				.catch(function (err) {
					return err;
				});

			return response;

		} finally {
			setIsLoading(false);
		}
	}

	return {
		getVisaList,
		isLoading
	}
}

export const useGetRequestVisaList = () => {
	const [isLoading, setIsLoading] = useState(false)

	let getRequestVisaList = async () => {
		setIsLoading(true);

		try {
			const response = await API.get(`${B2B_VISA.get_list_request}`)
				.then(function (response) {
					return response;
				})
				.catch(function (err) {
					return err;
				});

			return response;
		} finally {
			setIsLoading(false);
		}

	}

	return {
		getRequestVisaList,
		isLoading
	}
}

export const useInternalReferenceApi = () => {

	let intRefApi = async (request) => {

		const response = await API.post(`${B2B_VISA.get_internal_reference}`, request) //need to replace with the new api being developed for internal reference
			.then(function (response) {
				response.data = request.refNumber
				return response;
			})
			.catch(function (error) {
				return error;
			});

		return response;
	}

	return {
		intRefApi,
	}
}

export const useGetSalutationList = () => {
	const [isLoading, setIsLoading] = useState(true)

	let getSalutationList = async () => {
		setIsLoading(true);

		try {
			const response = await API.get(`${LANDING.get_salutation_list}`)
				.then(function (response) {
					return response;
				})
				.catch(function (err) {
					return err;
				});

			return response;
		} finally {
			setIsLoading(false);
		}

	}

	return {
		getSalutationList,
		isLoading
	}
}

export const useGetSafaSalutationList = () => {
	const [isLoading, setIsLoading] = useState(true)

	let getSafaSalutationList = async () => {
		setIsLoading(true);

		try {
			const response = await API.get(`${B2B_VISA.get_safa_salutation}`)
				.then(function (response) {
					return response;
				})
				.catch(function (err) {
					return err;
				});

			return response;
		} finally {
			setIsLoading(false);
		}

	}

	return {
		getSafaSalutationList,
		isLoading
	}
}

export const useGetSafaCountryList = () => {
	const [isLoading, setIsLoading] = useState(true)

	let getSafaCountryList = async () => {
		setIsLoading(true);

		try {
			const response = await API.get(`${B2B_VISA.get_safa_country_list}`)
				.then(function (response) {
					return response;
				})
				.catch(function (err) {
					return err;
				});

			return response;
		} finally {
			setIsLoading(false);
		}

	}

	return {
		getSafaCountryList,
		isLoading
	}
}
/*
* If you change the passenger object in this function please see below functions as well,
*
* useEditPassportDetails
* btobStore.js -> defaultVisaPassengerDetails
* */
export const useGetScannedPassportDetails = () => {
	const [isLoading, setIsLoading] = useState(false)
	const store = useStore();
	const passengerId = store.getState().btob.visa.passengerId;
	const safaCountry = store.getState().btob.visa.safaCountry;
	const resetPassportData = store.getActions().btob.visa.resetPassportData;

	let scannedPassportDetails = async (data) => {
		setIsLoading(true);

		try {
			const response = await API.post(`${B2B_VISA.scan_passport_post}`, data)
				.then(function (response) {
					if (response.status) {
						resetPassportData()
						var gender = '';
						if (response.data.body.data.parsed.gender.value == 'M')
							gender = 'Male';
						else if (response.data.body.data.parsed.gender.value == 'F')
							gender = 'Female';
						else
							gender = response.data.body.data.parsed.gender.value;

						let resp = {
							'passengerId' : passengerId > 0 ? passengerId : 0,
							'passportType' : response.data.body.data.parsed.document_type.value,
							'passportNumber' : response.data.body.data.parsed.document_number.value,
							'nationality' : response.data.body.data.parsed.nationality !== null ? response.data.body.data.parsed.nationality.value : '',
							'residenceCountry' : {
								'natCode': response.data.body.data.parsed.residency !== null ? response.data.body.data.parsed.residency.value : '',
								'name': response.data.body.data.parsed.residency !== null ? getSafaCountryName(safaCountry, response.data.body.data.parsed.residency.value) : '',
								'nameAr': response.data.body.data.parsed.residency !== null ? getSafaCountryNameAr(safaCountry, response.data.body.data.parsed.residency.value) : '',
							},
							'issueCountry' : {
								'natCode': response.data.body.data.parsed.issuing_country !== null ? response.data.body.data.parsed.issuing_country.value : '',
								'name': response.data.body.data.parsed.issuing_country !== null ? getSafaCountryName(safaCountry, response.data.body.data.parsed.issuing_country.value) : '',
								'nameAr': response.data.body.data.parsed.issuing_country !== null ? getSafaCountryNameAr(safaCountry, response.data.body.data.parsed.issuing_country.value) : '',
							},
							'issuePlace' : '',
							'issueDate' : response.data.body.data.parsed.date_of_issue !== null ? moment(response.data.body.data.parsed.date_of_issue.value).format('YYYY-MM-DD') : null,
							'expiryDate' : response.data.body.data.parsed.date_of_expiry !== null ? moment(response.data.body.data.parsed.date_of_expiry.value).format('YYYY-MM-DD') : null,
							'birthDate' : response.data.body.data.parsed.date_of_birth !== null ? moment(response.data.body.data.parsed.date_of_birth.value).format('YYYY-MM-DD') : null,
							'gender' : gender,
							'birthCountry' : {
								'natCode': '',
								'name': '',
								'nameAr': ''
							},
							'birthPlace' : response.data.body.data.parsed.place_of_birth !== null ? response.data.body.data.parsed.place_of_birth.value : '',
							'firstName' : response.data.body.data.parsed.given_names !== null ? response.data.body.data.parsed.given_names.value : '',
							'lastName' : response.data.body.data.parsed.surname !== null ? response.data.body.data.parsed.surname.value : '',
							'nationalID' : '',
							'arrivalDate' : null,
							'returnDate' : null,
							'medinaDate' : null,
							'title' : '',
							'job' : '',
							'maritalStatus' : '',
							'education' : '',
							'arFirstName' : '',
							'arLastName' : '',
							'fatherName' : '',
							'gFatherName' : '',
							'status' : 0,
							'mrz' : response.data.body.data.parsed.mrz.value,
							'faceImageUrl': response.data.body.data.face_image.value,
							'passportImageUrl': response.data.body.data.passport_image.value,
							'safaFaceImage': response.data.body.data.safa_response.photo,
							'safaPassportImage': response.data.body.data.safa_response.passport_photo,
						}

						response.data = resp;
						return response;
					} else {
						return response;
					}
				})
				.catch(function (err) {
					return err;
				});

			return response;
		} finally {
			setIsLoading(false);
		}
	}

	return {
		scannedPassportDetails,
		isLoading
	}
}

export const useEditPassportDetails = () => {
	const [isLoading, setIsLoading] = useState(true)
	const store = useStore();
	const safaCountry = store.getState().btob.visa.safaCountry;

	let editPassportDetails = async (passengerCode) => {
		setIsLoading(true);

		try {
			const response = await API.get(`${B2B_VISA.get_edit_passengers}/${passengerCode}`)
				.then(function (response) {
					if (response.status) {
						let resp = {
							'passengerId': response.data[0].AutoId ? response.data[0].AutoId : '',
							'passportType': response.data[0].details.AdditionalDetails.passportType ? response.data[0].details.AdditionalDetails.passportType : '',
							'passportNumber': response.data[0].details.AdditionalDetails.passport ? response.data[0].details.AdditionalDetails.passport : '',
							'nationality': response.data[0].details.AdditionalDetails.nationality ? response.data[0].details.AdditionalDetails.nationality : '',
							'residenceCountry' : {
								'natCode': response.data[0].details.AdditionalDetails.residenceCountry !== null ? response.data[0].details.AdditionalDetails.residenceCountry : '',
								'name': response.data[0].details.AdditionalDetails.residenceCountry !== null ? getSafaCountryName(safaCountry, response.data[0].details.AdditionalDetails.residenceCountry) : '',
								'nameAr': response.data[0].details.AdditionalDetails.residenceCountry !== null ? getSafaCountryNameAr(safaCountry, response.data[0].details.AdditionalDetails.residenceCountry) : '',
							},
							'issueCountry' : {
								'natCode': response.data[0].details.AdditionalDetails.issueCountry !== null ? response.data[0].details.AdditionalDetails.issueCountry : '',
								'name': response.data[0].details.AdditionalDetails.issueCountry !== null ? getSafaCountryName(safaCountry, response.data[0].details.AdditionalDetails.issueCountry) : '',
								'nameAr': response.data[0].details.AdditionalDetails.issueCountry !== null ? getSafaCountryNameAr(safaCountry, response.data[0].details.AdditionalDetails.issueCountry) : '',
							},
							'issuePlace': response.data[0].details.AdditionalDetails.issuePlace ? response.data[0].details.AdditionalDetails.issuePlace : '',
							'issueDate': response.data[0].details.AdditionalDetails.passportIssue ? moment(response.data[0].details.AdditionalDetails.passportIssue).format('YYYY-MM-DD') : null,
							'expiryDate': response.data[0].details.AdditionalDetails.passportExpiry ? moment(response.data[0].details.AdditionalDetails.passportExpiry).format('YYYY-MM-DD') : null,
							'birthDate': response.data[0].BirthDate ? moment(response.data[0].BirthDate).format('YYYY-MM-DD') : null,
							'gender': response.data[0].Gender ? response.data[0].Gender : '',
							'birthCountry': {
								'natCode': response.data[0].BirthCountry ? response.data[0].BirthCountry : '',
								'name': response.data[0].BirthCountry !== null ? getSafaCountryName(safaCountry, response.data[0].BirthCountry) : '',
								'nameAr': response.data[0].BirthCountry !== null ? getSafaCountryNameAr(safaCountry, response.data[0].BirthCountry) : '',
							},
							'birthPlace': response.data[0].BirthPlace ? response.data[0].BirthPlace : '',
							'firstName': response.data[0].FirstName ? response.data[0].FirstName : '',
							'lastName': response.data[0].LastName ? response.data[0].LastName : '',
							'nationalID': response.data[0].details.AdditionalDetails.nationalID ? response.data[0].details.AdditionalDetails.nationalID : '',
							'arrivalDate': response.data[0].details.AdditionalDetails.dateFrom ? moment(response.data[0].details.AdditionalDetails.dateFrom).format('YYYY-MM-DD') : null,
							'returnDate': response.data[0].details.AdditionalDetails.dateTo ? moment(response.data[0].details.AdditionalDetails.dateTo).format('YYYY-MM-DD') : null,
							'medinaDate': response.data[0].details.AdditionalDetails.madinahDate && response.data[0].details.AdditionalDetails.madinahDate != '' ? moment(response.data[0].details.AdditionalDetails.madinahDate).format('YYYY-MM-DD') : null,
							'title': response.data[0].Salutation ? response.data[0].Salutation : '',
							'job': response.data[0].details.AdditionalDetails.job ? response.data[0].details.AdditionalDetails.job : '',
							'maritalStatus': response.data[0].details.AdditionalDetails.married ? response.data[0].details.AdditionalDetails.married : '',
							'education': response.data[0].details.AdditionalDetails.education ? response.data[0].details.AdditionalDetails.education : '',
							'arFirstName': response.data[0].details.AdditionalDetails.arFirstName ? response.data[0].details.AdditionalDetails.arFirstName : '',
							'arLastName': response.data[0].details.AdditionalDetails.arLastName ? response.data[0].details.AdditionalDetails.arLastName : '',
							'fatherName': response.data[0].details.AdditionalDetails.fatherName ? response.data[0].details.AdditionalDetails.fatherName : '',
							'gFatherName': response.data[0].details.AdditionalDetails.grandfatherName ? response.data[0].details.AdditionalDetails.grandfatherName : '',
							'arFatherName': response.data[0].details.AdditionalDetails.arFatherName ? response.data[0].details.AdditionalDetails.arFatherName : '',
							'arGFatherName': response.data[0].details.AdditionalDetails.arGFatherName ? response.data[0].details.AdditionalDetails.arGFatherName : '',
							'status': 0,
							'mrz': response.data[0].details.AdditionalDetails.mrz,
							'faceImageUrl': response.data[0].details.AdditionalDetails.safaFaceImage,
							'passportImageUrl': response.data[0].details.AdditionalDetails.safaPassportImage,
							'safaFaceImage': response.data[0].details.AdditionalDetails.safaFaceImage,
							'safaPassportImage': response.data[0].details.AdditionalDetails.safaPassportImage,
							'visaStatus': response.data[0].details.AdditionalDetails.status ? response.data[0].details.AdditionalDetails.status : 0,
							'safaPackageId': response.data[0].safadetails.SafaAdditionalDetails.package_id ? response.data[0].safadetails.SafaAdditionalDetails.package_id : 0,
							'safaPassengerCode': response.data[0].safadetails.SafaPassengerCode ? response.data[0].safadetails.SafaPassengerCode : 0,
						}
						response.data = resp;
						return response;
					} else {
						return response;
					}
				})
				.catch(function (err) {
					return err;
				});

			return response;
		} finally {
			setIsLoading(false);
		}
	}

	return {
		editPassportDetails,
		isLoading
	}
}