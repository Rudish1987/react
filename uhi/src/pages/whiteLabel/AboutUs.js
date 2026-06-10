import React from 'react';
import StaticContent from '../../components/whiteLabel/StaticContent';
import { useLocale } from '../../context/LocaleContext';
import { useStoreState } from 'easy-peasy';
// ----------------------------------------------------------------------

export default function WlAboutUs() {

	const { locale } = useLocale();
	const aboutUsEnglishContent = useStoreState(s => s.whitelabel.layoutDetails.details.AboutUsEnglish);
	const aboutUsArabicContent = useStoreState(s => s.whitelabel.layoutDetails.details.AboutUsArabic);
	const innerBG = useStoreState(s => s.whitelabel.layoutDetails.innerBG);

	const dataObj = {
		ar: {
			bannerTitle: 'ABOUT UHI',
			content: aboutUsArabicContent,
			image: innerBG,
			title: 'ABOUT UHI',
		},
		en: {
			bannerTitle: 'ABOUT UHI',
			content: aboutUsEnglishContent,
			image: innerBG,
			title: 'ABOUT UHI',
		}
	}

	return (
		<StaticContent data={dataObj[locale.value]}></StaticContent>
	);
}
