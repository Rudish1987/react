
import React from 'react'
import { format, differenceInDays } from 'date-fns'
import { useLocale } from '../context/LocaleContext'
import { useTranslation } from 'react-i18next'
import Constants from './constants'

export const FormatNumber = (number, digits = 0) => {
	const intNumber = typeof number === 'string' ? number.replace(/,/g, '') : number
	return (digits) ? Number(intNumber).toFixed(2) : Number(intNumber)
}

export const BuildTravellPeriodText = (dateFrom, dateTo, dayText) => {
	const { locale } = useLocale();
	const { t } = useTranslation();
	let text = '';

	let arrivingOn = new Date(dateFrom)
	let departureOn = new Date(dateTo)
	
	let dateDiff = differenceInDays(departureOn, arrivingOn)

	if (locale.value === 'en') {
		let arrivingOnText = format(new Date(dateFrom), 'd MMMM')
		let departureOnText = format(new Date(dateTo), 'd MMMM')

		text += arrivingOnText + ' - ' + departureOnText + ' - '
		text += `  ${dateDiff} ${dayText}${dateDiff > 1 ? 's' : ''}`;
	}

	else if (locale.value === 'ar') {
		let arrivingOnText = t(format(new Date(dateFrom), 'MMMM')) + ' ' + format(new Date(dateFrom), 'd')
		let departureOnText = t(format(new Date(dateTo), 'MMMM')) + ' ' + format(new Date(dateTo), 'd')
		let numberOfDay = `${dayText}${dateDiff > 1 ? 's' : ''}`
		text += `${t(numberOfDay)}  ${dateDiff}`;
		text += ' - ' + departureOnText + ' - ' + arrivingOnText

	}

	return text;
}

export const titleCase = (sentence) => {
	try {
		sentence = sentence.toLowerCase().split(' ');
		for (let i = 0; i < sentence.length; i++) {
			sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
		}

		return sentence.join(' ');
	} catch (error) {
		return sentence;
	}
};

export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
		/* you can also use 'auto' behaviour
		in place of 'smooth' */
	});
};

export const range = (start, end, step = 1) => {
	let output = [];
	if (typeof end === 'undefined') {
		end = start;
		start = 0;
	}
	for (let i = start; i <= end; i += step) {
		output.push(i);
	}
	return output;
};

export const manageRebookRedirection = (failedItineraries = []) => {
	// always get 1st failed service
	const serviceType = failedItineraries.length > 0 ? failedItineraries[0] : '';
	
	if(serviceType == Constants.STEP_TEXT_MAKKAH) {
		return Constants.MAKKAH_HOTEL_RESEARCH_URL;
	} else if(serviceType == Constants.STEP_TEXT_MADINAH) {
		return Constants.MADINAH_HOTEL_RESEARCH_URL;
	} else if(serviceType == Constants.STEP_TEXT_TRANSPORTATION) {
		return Constants.TRANSFER_HOTEL_RESEARCH_URL;
	} else if(serviceType == Constants.STEP_TEXT_GROUNDSERVICES) {
		return Constants.GROUND_SERVICE_HOTEL_RESEARCH_URL;
	} else {
		return Constants.USER_PAYMENT_URL;
	}
}

export const getRebookItinerary = (afterBookingpackagedetails, packagedetails, passengerCount) => {
	const itineraryAmount = getRebookPackageAmount(afterBookingpackagedetails, packagedetails, passengerCount)
	const itinerary = getRebookPackage(afterBookingpackagedetails, packagedetails)
	
	return {
		itinerary,
		itineraryAmount
	}
}

export const getRebookPackage = (afterBookingpackagedetails, packagedetails) => {
	let rebookPackage = afterBookingpackagedetails; // set after booking package details as a default package
	if(Object.keys(packagedetails.makkah).length > 0) {
		rebookPackage.makkah = packagedetails.makkah
	}
	if(Object.keys(packagedetails.madinah).length > 0) {
		rebookPackage.madinah = packagedetails.madinah
	}
	if(Object.keys(packagedetails.transfer).length > 0) {
		rebookPackage.transfer = packagedetails.transfer
	}
	if(Object.keys(packagedetails.groundService).length > 0) {
		rebookPackage.groundService = packagedetails.groundService
	}
	if(Object.keys(packagedetails.visa).length > 0) {
		rebookPackage.visa = packagedetails.visa
	}
	return rebookPackage;
}


export const getRebookPackageAmount = (afterBookingpackagedetails, packagedetails, passengerCount) => {
	let makkahAmount = hotelPackageAmout(afterBookingpackagedetails.makkah)
	let madinahAmount = hotelPackageAmout(afterBookingpackagedetails.madinah)
	let transferAmount = transferPackageAmount(afterBookingpackagedetails.transfer)
	let groundServiceAmount = groundServicePackageAmount(afterBookingpackagedetails.groundService)
	let visaAmount = visaPackageAmount(afterBookingpackagedetails.visa, passengerCount)
	
	if(Object.keys(packagedetails.makkah).length > 0) {
		makkahAmount = hotelPackageAmout(packagedetails.makkah)
	}
	if(Object.keys(packagedetails.madinah).length > 0) {
		madinahAmount = hotelPackageAmout(packagedetails.madinah)
	}
	if(Object.keys(packagedetails.transfer).length > 0) {
		transferAmount = transferPackageAmount(packagedetails.transfer)
	}
	if(Object.keys(packagedetails.groundService).length > 0) {
		groundServiceAmount = groundServicePackageAmount(packagedetails.groundService)
	}
	if(Object.keys(packagedetails.visa).length > 0) {
		visaAmount = visaPackageAmount(packagedetails.visa, passengerCount)
	}
	let ItineraryAmount = Number(makkahAmount) + Number(madinahAmount) + Number(transferAmount) + Number(groundServiceAmount) + Number(visaAmount);

	return ItineraryAmount;
}


export const hotelPackageAmout = (hotelPackage) => {
	let roomTotal = 0;
	if (hotelPackage.totalPrice) {
		roomTotal = hotelPackage.totalPrice
	} else if (Object.keys(hotelPackage).length !== 0) {
		React.Children.toArray({ ...hotelPackage }.rooms.map(item => {
			for (let key in item.roomTypeCodes) {
				roomTotal += Number(item.roomTypeCodes[key].roomAmount);
			}
		}))
	}

	return roomTotal
}

export const transferPackageAmount = (transferPackage) => {
	return isNaN(Number(transferPackage.totalPrice)) ? 0 : Number(transferPackage.totalPrice)
}

export const groundServicePackageAmount = (groundServicePackage) => {
	return isNaN(Number(groundServicePackage.totalPrice)) ? 0 : Number(groundServicePackage.totalPrice)
}

export const visaPackageAmount = (visaPackage, passengerCount) => {
	let count = isNaN(Number(passengerCount)) ? 0 : Number(passengerCount)
	return isNaN(Number(visaPackage.VisaFeesAmount)) ? 0 : Number(visaPackage.VisaFeesAmount) * count
}

export const getUmrahCountryCode = (list, value) => {
	const result = list.filter((s) => s.natCode == value);

	if(result.length > 0) {
		return result[0].umrahId;
	} else {
		return 0;
	}
}

export const getSafaCountryName = (list, value) => {
	const result = list.filter((s) => s.natCode == value);

	if(result.length > 0) {
		return result[0].name;
	} else {
		return '';
	}
}

export const getSafaCountryNameAr = (list, value) => {
	const result = list.filter((s) => s.natCode == value);

	if(result.length > 0) {
		return result[0].nameAr;
	} else {
		return '';
	}
}