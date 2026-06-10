import { B2BUSER } from '../Url';
import API from '../Axios';
import Constants from '../../helpers/constants';

export const joinUsData = async (values) => {
	let requestOptions = {
		companyName: values.companyName,
		companyAddress: values.companyAddress,
		companyZipCode: values.companyZipCode,
		companyCountry: values.companyCountry.Country_Code,
		companyCity: values.companyCity.CityCode,
		Tel: values.Tel,
		maqamIban: values.maqamIban,
		title: values.title,
		firstName: values.firstName,
		lastName: values.lastName,
		emailAddress: values.emailAddress,
		emailAddress_confirmation: values.emailAddress_confirmation,
		loginId: values.loginId,
		password: values.password,
		password_confirmation: values.password_confirmation,
		terms_confirmation:'1',
		paymentType:values.paymentType,
		grossCommissionType:values.grossCommissionType,
		invoiceOn:values.invoiceOn,
		grossCommissionValue:values.grossCommissionValue,
		//CFDEmail:values.CFDEmail,
		directDebit:values.directDebit,
		VATRegNo:values.VATRegNo,
		//currencyCreditCard:values.currencyCreditCard,
		PrefTel:values.PrefTel,
	};
	if(requestOptions.paymentType == Constants.CUSTOMER_PAYMENT_TYPE_CREDIT)
	{
		requestOptions.currencyCreditGross = values.currencyCreditGross;
	}else if(requestOptions.paymentType == Constants.CUSTOMER_PAYMENT_TYPE_CREDIT_CARD)
	{
		requestOptions.currencyCreditCard = values.currencyCreditCard;
	}
	if(values.headofficeId){
		requestOptions.headofficeId = values.headofficeId;
		requestOptions.CFDEmail = Constants.FINANCE_DEPARTMENT_EMAIL_ADDRESS;
	} else {
		requestOptions.CFDEmail = values.CFDEmail;
	}
    
	try {
		const response = await API.post(B2BUSER.join_us, requestOptions)
			.then(function (response) {
				return response;
			})
			.catch(function (err) {
				return err;
			});

		return response;
	} catch (err) {
		return err;
	}
}
