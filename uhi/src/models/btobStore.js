import { action, thunk } from 'easy-peasy'
import moment from 'moment';

const defaultRoom = {
	room: 1,
	adultsCount: 2,
	children: 0
};

const defaultVisaPassengerDetails = {
	passportType : '',
	passportNumber : '',
	nationality : '',
	residenceCountry : {
		natCode: '',
		name: '',
		nameAr: '',
	},
	issueCountry : {
		natCode: '',
		name: '',
		nameAr: '',
	},
	issuePlace : '',
	issueDate : null,
	expiryDate : null,
	birthDate : null,
	gender : '',
	birthCountry : {
		natCode: '',
		name: '',
		nameAr: '',
	},
	birthPlace : '',
	firstName : '',
	lastName : '',
	nationalID : '',
	arrivalDate : null,
	returnDate : null,
	medinaDate : null,
	title : '',
	job: '',
	maritalStatus : '',
	education : '',
	arFirstName : '',
	arLastName : '',
	fatherName : '',
	gFatherName : '',
	arFatherName: '',
	arGFatherName: '',
	status : 0,
	mrz: '',
	faceImageUrl : '',
	passportImageUrl : '',
	safaFaceImage : '',
	safaPassportImage : '',
}

const blankCountry = {
	Country_Code: '',
	Country_Name: '',
	Tel_Country_Code: '',
	ShortCountryName: '',
	Country_Name_AR: '',
};

const btob = {
	destination: 10,
	defaultCountry: blankCountry,
	filters: {
		nationality: {
			Country_Code: 4,
			Country_Name: 'SAUDI ARABIA',
			Country_Name_AR: 'المملكة العربية السعودية',
			Tel_Country_Code: 966,
			ShortCountryName: 'SA'
		},
		setNationality: action((state, payload) => {
			state.nationality = payload
		}),
		destination: '',
		travelPeriod: {
			from: moment().add(2, 'days').toDate(),
			to: moment().add(4, 'days').toDate()
		},
		rooms: [
			{
				room: 1,
				adultsCount: 2,
				children: 0
			}
		],
		addRoom: action((state) => {
			state.rooms.push(defaultRoom);
		}),
		removeRoom: action((state, payload) => {
			state.rooms = state.rooms.filter((r, i) => i !== payload.index)
		}),
		occupancyChange: action((state, payload) => {
			state.rooms[payload.index][payload.type] = payload.value
		}),
		setTravelPeriod: action((state, payload) => {
			state.travelPeriod = payload
		}),
		city: [{
			CityCode:'',
			CityName:'',
			CityShortCode:''
		}],
		setCity: action((state, payload) => {
			state.city = payload
		}),
		cityList:[],
		setCityList: action((state, payload) => {
			state.cityList = payload
		})
	},
	results: [],
	getResults: thunk(async (actions, payload) => {
		await payload.then(res => actions.setResults(res))

	}),
	setResults: action((state, payload) => {
		state.results = payload
	}),
	setDestination: action((state, payload) => {
		state.destination = payload
	}),
	isAuth: false,
	setAuth: action((state, payload) => {
		state.isAuth = payload
	}),
	user: {},
	setUser: action((state, payload) => {
		state.user = payload
	}),
	paxNationality: {},
	setPaxNationality: action((state, payload) => {
		state.paxNationality = payload
	}),
	getPaxNationality: thunk(async (actions, payload) => {
		await payload.then(res => actions.setPaxNationality(res))
	}),
	safaSalutation: [],
	setSafaSalutation: action((state, payload) => {
		state.safaSalutation = payload
	}),
	getSafaSalutation: thunk(async (actions, payload) => {
		await payload.then(res => actions.setSafaSalutation(res))
	}),
	salutation: [],
	setSalutation: action((state, payload) => {
		state.salutation = payload
	}),
	getSalutation: thunk(async (actions, payload) => {
		await payload.then(res => actions.setSalutation(res))
	}),
	visa: {
		validItineraryUpto: null,
		setValidItineraryUpto: action((state, payload) => {
			state.validItineraryUpto = payload
		}),
		isValidItinerary: true,
		setValidItinerary: action((state, payload) => {
			state.isValidItinerary = payload
		}),
		confirmMsg: {},
		setConfirmMsg: action((state, payload) => {
			state.confirmMsg = payload
		}),
		travelersList: [],
		getVisaTravelersList: thunk(async (actions, payload) => {
			await payload.then(res => {
				if( res.status === true ){
					actions.setTeavelersList(res.data)
					actions.setItineraryDetails(res.itineraryDetails)
					let validUpto = moment(res.itineraryDetails.requestExpire)
					let today = moment()
					actions.setValidItineraryUpto(validUpto.format('YYYY-MM-DD'))
					if(validUpto.diff(today, 'days') < 0) {
						actions.setValidItinerary(false)
					}
				}else{
					actions.setTeavelersList([])
				}
			})
		}),
		setTeavelersList: action((state, payload) => {
			state.travelersList = payload
		}),
		itineraryId : 0,
		setItineraryId: action((state, payload) => {
			state.itineraryId = payload
		}),
		safaCountry: [],
		setSafaCountry: action((state, payload) => {
			state.safaCountry = payload.data
		}),
		getSafaCountry: thunk(async (actions, payload) => {
			await payload.then(res => actions.setSafaCountry(res))
		}),

		itineraryType : '',
		setItineraryType: action((state, payload) => {
			state.itineraryType = payload
		}),
		itineraryDetails: {},
		setItineraryDetails: action((state, payload) => {
			state.itineraryDetails = payload
		}),
		getItineraryDetails: thunk(async (actions, payload, { getState }) => {
			await payload.then(res => {
				const { itineraryDetails } = getState();
				if( res.status === true ){
					let tempItineraryDetails = itineraryDetails
					tempItineraryDetails.intRef = res.data
					actions.setItineraryDetails(tempItineraryDetails)
				}else{
					actions.setItineraryDetails(itineraryDetails)
				}
			})
		}),
		visaList: [],
		getVisaList: thunk(async (actions, payload) => {
			await payload.then(res => {
				if( res.status === true ){
					actions.setVisaList(res.data)
				}else{
					actions.setVisaList([])
				}
			})
		}),
		setVisaList: action((state, payload) => {
			state.visaList = payload
		}),

		requestList: {},
		getRequestList: thunk(async (actions, payload) => {
			await payload.then(res => {
				if( res.status === true ){
					actions.setRequestList(res.data)
				}else{
					actions.setRequestList({})
				}
			})
		}),
		setRequestList: action((state, payload) => {
			state.requestList = payload
		}),

		passportData: defaultVisaPassengerDetails,
		passengerId : 0,
		setPassengerId: action((state, payload) => {
			state.passengerId = payload
		}),
		setPassportData: action((state, payload) => {
			state.passportData = payload
		}),
		getPassportData: thunk(async (actions, payload) => {
			await payload.then(res => {
				if( res.status === true ){
					actions.setPassengerId(res.data.passengerId)
					actions.setPassportData(res.data)
				}else{
					actions.resetPassportData()
				}
			})
		}),
		resetPassportData: action((state) => {
			state.passportData = defaultVisaPassengerDetails
			state.passengerId = 0
		}),
		resetVisaTravelerState: action((state) => {
			state.itineraryId = 0
			state.itineraryType = ''
			state.itineraryDetails = {}
			state.travelersList = []
			state.requestList = {}
		}),
		conversionRate: '',
		getCurrencyRates: thunk(async (actions, payload) => {
			await payload.then(res => {
				if( res.status ){
					actions.setCurrencyRate(res.data.conversionRate)
				}else{
					actions.setCurrencyRate('')
				}
			})
		}),
		setCurrencyRate: action((state, payload) => {
			state.conversionRate = payload
		}),
		
	},
	payment: {
		bookingCode: 0,
		resetPaymentInformation: action((state) => {
			state.billingCreditCardCustomer = {}
			state.paymentAuthTokenData = {}
		}),
		billingCreditCardCustomer: {},
		setBillingCreditCardCustomer: action(async (state, payload) => {
			state.billingCreditCardCustomer = payload
		}),
		paymentAuthTokenData: {},
		setPaymentAuthTokenData: action((state, payload) => {
			state.paymentAuthTokenData = payload.booking
		}),
		getPaymentAuthTokenData: thunk(async (actions, payload) => {
			await payload.then(res => actions.setPaymentAuthTokenData(res))
		}),
		setPaymentConfirmationData: action((state, payload) => {
			state.bookingCode = payload.returnedCode
		}),
		getPaymentConfirmationData: thunk(async (actions, payload) => {
			await payload.then(res => actions.setPaymentConfirmationData(res))
		}),
	}
};

export default btob;