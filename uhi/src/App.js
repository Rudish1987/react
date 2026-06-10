import React from 'react';
import './translations/i18n';

import DomainProvider from './context/DomainContext'
import ThemeProvider from './context/ThemeContext';
import LocaleProvider from './context/LocaleContext';
import AuthProvider from './context/AuthContext'

import ScrollToTop from './components/ScrollToTop';
import GlobalStyles from './theme/globalStyles';

import Router from './routes'
import { useStoreRehydrated } from 'easy-peasy';

function App() {
	const isRehydrated = useStoreRehydrated();

	return isRehydrated ? (
		<AuthProvider>
			<DomainProvider>
				<LocaleProvider>
					<ThemeProvider>
						<ScrollToTop />
						<GlobalStyles />
						<Router />
					</ThemeProvider>
				</LocaleProvider>
			</DomainProvider>
		</AuthProvider>
	) : (<div>Loading...</div>);
}

export default App;
