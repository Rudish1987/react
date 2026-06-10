import React, {useEffect, useState} from 'react';
import '../../style/scss/btob/landing/index.scss';
import BtobStaticContent from '../../components/b2b/includes/BtobStaticContent'
import { useLocale } from '../../context/LocaleContext';
import { InnerAboutUsAPI } from '../../api/btob/InnerAboutUsAPI';
import Page from '../../components/Page';
import {useTranslation} from 'react-i18next';
import {Helmet} from 'react-helmet-async';

export default function BtobContactUs() {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [items, setallData] = useState({});
	useEffect(() => {
		InnerAboutUsAPI().then((res) => {
			if( res.status === true ){
				if(locale.value in res.data){
					setallData(res.data[locale.value])
				}
			}
		});
	},[locale])

	const additionalMetaTag = () => {
		return (
			<Helmet>
				<meta name="description" content="Join Umrah Holidays International, part of the dynamic WebBeds Group, for unparalleled B2B wholesale hotel rates in Makkah and a seamless Umrah platform experience. with us for growth – contact us to elevate your travel offerings."/>
				<meta name="keywords" content="B2B wholesale hotel rates Makkah, B2B Umrah Platform"/>
			</Helmet>
		)
	}

	return (
		<Page title={t('About Uhi Travel - Your B2B Umrah Platform and Wholesale Hotel Rates Specialist')} meta={additionalMetaTag()}>
			<BtobStaticContent pageContent={items}></BtobStaticContent>
		</Page>
	);
}
