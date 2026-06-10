import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';
import { enUS, arSD } from '@mui/material/locale';
import arSaLocale from 'date-fns/locale/ar-SA';
import enLocale from 'date-fns/locale/en-US';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import LandingSkeleton from '../components/skeleton/LandingSkeleton';
import Constants from '../helpers/constants'

const defaultLocale = Constants.LANGUAGES_EN;

const currentLocale = localStorage.getItem('locale') || defaultLocale;
const LocaleContext = createContext(currentLocale);

const availableLocales = [
	{
		value: Constants.LANGUAGES_EN,
		label: Constants.LANGUAGES_EN_LABEL,
		icon: Constants.LANGUAGES_EN_ICON,
		muiLocale: enUS,
		locale: enLocale,
		labelShort: Constants.LANGUAGES_EN_LABEL_SHORT
	},
	{
		value: Constants.LANGUAGES_AR,
		label: Constants.LANGUAGES_AR_LABEL,
		icon: Constants.LANGUAGES_AR_ICON,
		muiLocale: arSD,
		locale: arSaLocale,
		labelShort: Constants.LANGUAGES_AR_LABEL_SHORT
	}
];

export const useLocale = () => {
	return useContext(LocaleContext)
}

const LocaleProvider = ({ children }) => {
	const [locale, setLocale] = useState(() => availableLocales.find(item => item.value === currentLocale));
	const [logo, setLogo] = useState();

	const changeLocale = (newLocale) => {
		const _locale = availableLocales.find(item => item.value === newLocale);
		localStorage.setItem('locale', _locale.value)
		setLocale(_locale)
		i18n.changeLanguage(_locale.value);
	}
	/*this code is for Api call of logo and background colour .This will change later */
	useEffect(() => {
		let fetchData = async () => {
			setLogo(Constants.LOGO);
		}

		fetchData();
	}, []);

	if (!logo) return (<LandingSkeleton></LandingSkeleton>);
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={locale.locale}>
			<LocaleContext.Provider value={{ locale, changeLocale, availableLocales, logo }}>
				{children}
			</LocaleContext.Provider>
		</LocalizationProvider>
	);
}

export default LocaleProvider;
