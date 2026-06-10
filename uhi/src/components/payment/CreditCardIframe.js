import React from 'react';
import '../../css/payment.css';
import Constants from '../../helpers/constants';


export default function CreditCardIframe() {
	const embedUrl = process.env.NODE_ENV== 'development'?Constants.CREDIT_CARD_IFRAME_URL_DEV :Constants.CREDIT_CARD_IFRAME_URL_PROD;
	return (<iframe title="pay" src={embedUrl} className='iframe'/>);
}
