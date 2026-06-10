import React, {createContext, useState, useContext} from 'react';
import PropTypes from 'prop-types';

import {Icon} from '@iconify/react';
// material
import {createTheme, ThemeProvider as MuiThemeProvider, StyledEngineProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import { useStoreState } from 'easy-peasy';
//
import {getThemeByName} from '../theme'
import {useLocale} from './LocaleContext'
import componentsOverride from '../theme/overrides';
import Constants from '../helpers/constants'


import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';


const curThemeName = localStorage.getItem('appTheme') || 'lightTheme';

const ThemeContext = createContext(curThemeName);

export const useTheme = () => {
	return useContext(ThemeContext)
}
// Create rtl cache
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
	key: 'muiltr',
	stylisPlugins: [prefixer],
});

const ThemeProvider = ({children}) => {
	const [themeName, setThemeName] = useState(curThemeName);
	const {locale} = useLocale();
	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)
	const isWhiteLabel = useStoreState(s => s.whitelabel.isWhiteLabel)

	const _theme = getThemeByName(themeName);
	const theme = createTheme(_theme, locale.muiLocale);
	theme.components = componentsOverride(theme);
	

	const themeWithLocale = React.useMemo(
		() => {
			
			_theme.direction = 'ltr';
			if (locale.value === Constants.LANGUAGES_AR) {
				_theme.direction = 'rtl';
			}
			document.body.setAttribute('dir', _theme.direction);

			
			theme.palette.primary.main = isWhiteLabel ? layoutDetails.details.colors.ThemeColor : theme.palette.primary.main;
			return theme;
		},
		[themeName, locale]
	)

	const _setThemeName = (name) => {
		localStorage.setItem('appTheme', name);
		setThemeName(name)
	};

	const toggleTheme = () => {
		if (themeName === 'lightTheme')
			_setThemeName('darkTheme');
		else
			_setThemeName('lightTheme');
	};

	const themeIcon = themeName === 'lightTheme' ? <Icon icon="eva:moon-fill"/> : <Icon icon="eva:sun-fill"/>;

	return (

		<ThemeContext.Provider value={{toggleTheme, themeIcon}}>
			<StyledEngineProvider injectFirst>
				<CssBaseline/>
				<CacheProvider value={themeWithLocale.direction === 'rtl' ? cacheRtl : cacheLtr}>
					<MuiThemeProvider theme={themeWithLocale}>
						{children}
					</MuiThemeProvider>
				</CacheProvider>
			</StyledEngineProvider>
		</ThemeContext.Provider>

	);
};

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export default ThemeProvider;
