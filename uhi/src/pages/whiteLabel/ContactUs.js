import React from 'react';
import StaticContent from '../../components/whiteLabel/StaticContent';
import { useLocale } from '../../context/LocaleContext';
import { useStoreState } from 'easy-peasy';
// ----------------------------------------------------------------------

export default function WlContactUs() {

	const { locale } = useLocale();
	const contactUsEnglishContent = useStoreState(s => s.whitelabel.layoutDetails.details.ContactUsEnglish);
	const contactUsArabicContent = useStoreState(s => s.whitelabel.layoutDetails.details.ContactUsArabic);
	const innerBG = useStoreState(s => s.whitelabel.layoutDetails.innerBG);

	const dataObj = {
		ar: {
			bannerTitle: 'CONTACT',
			content: contactUsArabicContent,
			image: innerBG,
			title: 'CONTACT'
		},
		en: {
			bannerTitle: 'CONTACT',
			content: contactUsEnglishContent,
			image: innerBG,
			title: 'CONTACT',
		}
	}

	return (
		<StaticContent data={dataObj[locale.value]}></StaticContent>
	);
}
