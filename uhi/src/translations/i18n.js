import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { TRANSLATIONS_ARAB } from './arab/translations';
import { TRANSLATIONS_EN } from './en/translations';
import { TRANSLATIONS_HOTEL_PAGE_EN } from './en/hotel-page';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: TRANSLATIONS_EN,
				hotel_page: TRANSLATIONS_HOTEL_PAGE_EN
			},
			ar: {
				translation: TRANSLATIONS_ARAB
			}
		}
	});

// i18n.changeLanguage('en');
