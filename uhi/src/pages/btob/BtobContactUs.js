import React, {useEffect, useState} from 'react';
import '../../style/scss/btob/landing/index.scss';
import BtobStaticContent from '../../components/b2b/includes/BtobStaticContent'
import { useLocale } from '../../context/LocaleContext';
import { InnerContactUsAPI } from '../../api/btob/InnerContactUsAPI';
import Page from '../../components/Page';
import {useTranslation} from 'react-i18next';

export default function BtobContactUs() {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [items, setallData] = useState({});
	useEffect(() => {
		InnerContactUsAPI().then((res) => {
			if( res.status === true ){
				if(locale.value in res.data){
					setallData(res.data[locale.value])
				}
			}
		});
	},[locale])

	return (
		<Page title={t('UHI Travel')}>
			<BtobStaticContent pageContent={items}></BtobStaticContent>
		</Page>
	);
}
