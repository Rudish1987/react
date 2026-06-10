import { action, thunk } from 'easy-peasy'

const defaultRoom = {
	room: 1,
	adultsCount: 2,
	children: 0
};
const defaultMakkahNightStay = 5;
const defaultMadinahNightStay = 0;

const btoc = {
	isAuth: false,
	setAuth: action((state, payload) => {
		state.isAuth = payload
	}),
	isSaved: false,
	setSaved: action((state, payload) => {
		state.isSaved = payload
	}),
	errorExceptipons: {},
	saveBookingAPIFlag: true,
	setSaveBookingAPIFlag: action((state, payload) => {
		state.saveBookingAPIFlag = payload
	}),
	setErrorExceptipons: action((state, payload) => {
		state.errorExceptipons = payload
	}),
	countryResult: {},
	setCountryResult: action((state, payload) => {
		state.countryResult = payload
	}),
	filters: {
		destination: 58, // Jeddah - Makkah - Madinah - Madinah Airport
		travelPeriod: {
			from: null,
			to: null
		},
		nightStayInMakkah: defaultMakkahNightStay,
		nightStayInMadinah: defaultMadinahNightStay,
		nationality: {
			Country_Code: 4,
			Country_Name: 'SAUDI ARABIA',
			Country_Name_AR: 'المملكة العربية السعودية',
			Tel_Country_Code: 966,
			ShortCountryName: 'SA'
		},
		residency: {
			Country_Code: 4,
			Country_Name: 'SAUDI ARABIA',
			Country_Name_AR: 'المملكة العربية السعودية',
			Tel_Country_Code: 966,
			ShortCountryName: 'SA'
		},
		checkResidencySwitch: true,
		routecode: 58,
		rooms: [
			{
				room: 1,
				adultsCount: 2,
				children: 0
			}
		],
		roomCount: 1,
		addRoom: action((state) => {
			state.rooms.push(defaultRoom);
		}),
		removeRoom: action((state, payload) => {
			state.rooms = state.rooms.filter((r, i) => i !== payload.index)
		}),
		occupancyChange: action((state, payload) => {
			state.rooms[payload.index][payload.type] = payload.value
		}),
		clubRoom: action((state, payload) => {
			state.rooms = payload
		}),
		setRoomCount: action((state, payload) => {
			state.roomCount = payload
		}),
		setTravelPeriod: action((state, payload) => {
			state.travelPeriod = payload
		}),
		setDestination: action((state, payload) => {
			state.destination = payload
		}),
		setNationality: action((state, payload) => {
			state.nationality = payload
		}),
		setResidency: action((state, payload) => {
			state.residency = payload
		}),
		setResidencySwitch: action((state, payload) => {
			state.checkResidencySwitch = payload
		}),
		setStayInMakkah: action((state, payload) => {
			state.nightStayInMakkah = payload
		}),
		setStayInMadinah: action((state, payload) => {
			state.nightStayInMadinah = payload
		}),
		setRoutecode: action((state, payload) => {
			state.routecode = payload
		}),
		resetState: action((state, payload) => {
			state.rooms = payload.rooms
			state.travelPeriod = payload.travelPeriod
			state.nightStayInMakkah = payload.nightStayInMakkah
			state.nightStayInMadinah = payload.nightStayInMadinah
			state.nationality = payload.nationality
			state.residency = payload.residency
			state.checkResidencySwitch = payload.checkResidencySwitch
			state.routecode = payload.routecode
		})
	},
	requests: {
		common: {
			residency: 4,
			nationality: 4,
			Currency: 492
		},
		makkah: {},
		madinah: {},
		transfer: {},
		groundService: {},
		setCommonRequest: action((state, payload) => {
			state.common = payload
		}),
		setMakkahRequest: action((state, payload) => {
			state.makkah = payload
		}),
		setMadinahRequest: action((state, payload) => {
			state.madinah = payload
		}),
		setTransferRequest: action((state, payload) => {
			state.transfer = payload
		}),
		setGroundServiceRequest: action((state, payload) => {
			state.groundService = payload
		})
	},
	transferresults: [],
	groundserviceresults: [],
	results: [],
	hotel: [],
	user: {},
	newBookinglist: [],

	bookinglist: {},
	setUser: action((state, payload) => {
		state.user = payload
	}),
	getResults: thunk(async (actions, payload) => {
		await payload.then(res => actions.setResults(res))

	}),
	setResults: action((state, payload) => {
		state.results = payload
	}),
	getTransferResults: thunk(async (actions, payload) => {
		await payload.then(res => actions.setTransferResults(res))
	}),
	setTransferResults: action((state, payload) => {
		state.transferresults = payload
	}),
	getBookingResults: thunk(async (actions, payload) => {
		await payload.then(res => actions.setBookingResults(res))
	}),
	setBookingResults: action((state, payload) => {
		state.bookinglist = payload
	}),
	setNewBookingResult: action((state, payload) => {
		state.newBookinglist = payload
	}),
	getBookinglistLastPage: 0,
	setBookingListLastPage: action((state, payload) => {
		state.getBookinglistLastPage = payload
	}),
	setHotel: action((state, payload) => {
		state.hotel = payload
	}),
	getGroundServiceResults: thunk(async (actions, payload) => {
		await payload.then(res => actions.setGroundServiceResults(res))

	}),
	setGroundServiceResults: action((state, payload) => {
		state.groundserviceresults = payload
	}),
	itineraryDetails: {
		itineraryid: null,
		tourCode: null,
		itineraryItemCount: 0,
		Currency: null,
		itineraryAmount: 0,
		rebook: false,
		packagedetails: {
			makkah: {},
			madinah: {},
			transfer: {},
			groundService: {},
			visa: {}
		},
		billingCustomerDetails: {},
		passengers: [],
		flight: [],
		confirmCount: 0,
		paymentAuthTokenData: {},
		passengerExcel: {},
		bookingCode: 0,
		bookingStatus: null,
		getItineraryId: thunk(async (actions, payload) => {
			await payload.then(res => actions.setItineraryId(res))
		}),
		setItineraryAmount: action((state, payload) => {
			state.itineraryAmount = payload
		}),
		setItineraryId: action((state, payload) => {
			state.itineraryid = payload.returnedCode
		}),
		setSavedItineraryId: action((state, payload) => {
			state.itineraryid = payload
		}),
		setRebook: action((state, payload) => {
			state.rebook = payload
		}),
		setPassengerResult: action((state, payload) => {
			state.passengers = payload
		}),
		setFlightResult: action((state, payload) => {
			state.flight = payload
		}),
		arrivalAirport: {},
		setArrivalAirport: action((state, payload) => {
			state.arrivalAirport = payload
		}),
		depatureAirport: {},
		setDepatureAirport: action((state, payload) => {
			state.depatureAirport = payload
		}),
		setPassengers: action((state, payload) => {
			state.passengers.push(payload)
		}),
		setPassengerExcel: action((state, payload) => {
			state.passengerExcel = payload
		}),
		setConfirmCount: action((state, payload) => {
			state.confirmCount = payload
		}),
		setMakkahPackage: action((state, payload) => {
			state.packagedetails.makkah = payload
		}),
		setMadinahPackage: action((state, payload) => {
			state.packagedetails.madinah = payload
		}),
		setPackageItemCount: action((state, payload) => {
			state.itineraryItemCount = payload
		}),
		setCurrency: action((state, payload) => {
			state.Currency = payload
		}),
		setTransferPackage: action((state, payload) => {
			state.packagedetails.transfer = payload
		}),
		setGSPackage: action((state, payload) => {
			state.packagedetails.groundService = payload
		}),
		getGSAllocation: thunk(async (actions, payload) => {
			await payload.then(res => actions.setGSAllocation(res))

		}),
		setGSAllocation: action((state, payload) => {
			state.tourCode = payload.tours.tour.optionValue
		}),
		setBillingCustomer: action(async (state, payload) => {
			state.billingCustomerDetails = payload
		}),
		setPaymentAuthTokenData: action((state, payload) => {
			state.paymentAuthTokenData = payload.booking
		}),
		getPaymentAuthTokenData: thunk(async (actions, payload) => {
			await payload.then(res => actions.setPaymentAuthTokenData(res))
		}),
		getVisaFees: thunk(async (actions, payload) => {
			await payload.then(res => actions.setVisaFees(res))
		}),
		setVisaFees: action((state, payload) => {
			state.packagedetails.visa = payload
		}),
		resetState: action((state) => {
			state.itineraryItemCount = 0
			state.packagedetails.makkah = {}
			state.packagedetails.madinah = {}
			state.packagedetails.transfer = {}
			state.packagedetails.groundService = {}
			state.packagedetails.visa = {}
			state.billingCustomerDetails = {}
			state.itineraryid = null
			state.bookingCode = 0
			state.bookingStatus = null
			state.tourCode = null
			//state.Currency = null
			state.itineraryAmount = 0
		}),
		resetPassengerFlight: action((state) => {
			state.passengers = []
			state.flight = []
			state.confirmCount = 0
		}),
		resetPaymentAuthToken: action((state) => {
			state.paymentAuthTokenData = {}
		}),
		resetPassengerResult: action((state) => {
			state.passengers = []
		}),
		resetPassengerExcel: action((state) => {
			state.passengerExcel = {}
		}),
		getPaymentConfirmationData: thunk(async (actions, payload) => {
			await payload.then(res => actions.setPaymentConfirmationData(res))
		}),
		setPaymentConfirmationData: action((state, payload) => {
			state.bookingCode = payload.returnedCode
		}),
		setBookingStatus: action((state, payload) => {
			state.bookingStatus = payload.bookingStatus
		}),
	},
	failedItineraryDetails: {},
	loadFailedItineraryDetails: action((state, payload) => {
		state.failedItineraryDetails = payload
		// state.failedItineraryDetails.push(payload);
	}),
	resetFailedItineraryDetails: action((state) => {
		state.failedItineraryDetails = {}
	}),
	setFailedItineraryDetails: action((state, payload) => {
		state.failedItineraryDetails = state.failedItineraryDetails.filter((failedItineraryDetail) => failedItineraryDetail !== payload);
	}),
	afterBookingItineraryDetails: {},
	setAfterBookingItineraryDetails: action((state, payload) => {
		state.afterBookingItineraryDetails = payload
	}),
	resetAfterBookingItineraryDetails:  action((state) => {
		state.afterBookingItineraryDetails = {}
	}),
	cityArport: [],
	setcityArport: action((state, payload) => {
		state.cityArport = payload
	}),

	defaultCurrency: 'SAR',
	currencyConvertionRate: {
		conversionRate: '1'
	},
	itineraryAmountAfterBooking: 0,
	afterBookingpackagedetails: {
		makkah: {},
		madinah: {},
		transfer: {},
		groundService: {},
		visa: {}
	},
	resetAfterBookingpackagedetails: action((state) => {
		state.afterBookingpackagedetails.makkah = {}
		state.afterBookingpackagedetails.madinah = {}
		state.afterBookingpackagedetails.transfer = {}
		state.afterBookingpackagedetails.groundService = {}
		state.afterBookingpackagedetails.visa = {}
		state.billingCustomerDetails = {}
		state.itineraryAmountAfterBooking = 0
	}),
	getSavedVisaFees: thunk(async (actions, payload) => {
		await payload.then(res => actions.setSavedVisaFees(res))
	}),
	setSavedVisaFees: action((state, payload) => {
		state.afterBookingpackagedetails.visa = payload
	}),
	getCurrencyConversionRate: thunk(async (actions, payload) => {
		await payload.then(res => actions.setCurrencyConversionRate(res))
	}),
	setCurrencyConversionRate: action((state, payload) => {
		state.currencyConvertionRate = payload
	}),
	setMakkahPackageAfterBooking: action((state, payload) => {
		state.afterBookingpackagedetails.makkah = payload
	}),
	setMadinahPackageAfterBooking: action((state, payload) => {
		state.afterBookingpackagedetails.madinah = payload
	}),
	setTransferPackageAfterBooking: action((state, payload) => {
		state.afterBookingpackagedetails.transfer = payload
	}),
	setGSPackageAfterBooking: action((state, payload) => {
		state.afterBookingpackagedetails.groundService = payload
	}),
	setVisaPackageAfterBooking: action((state, payload) => {
		state.afterBookingpackagedetails.visa = payload
	}),
	setItineraryAmountAfterBooking: action((state, payload) => {
		state.itineraryAmountAfterBooking = payload
	}),

};

export default btoc;