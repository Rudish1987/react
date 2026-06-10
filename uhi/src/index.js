import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import 'simplebar/src/simplebar.css';

//
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from '../src/Store';
import { StoreProvider } from 'easy-peasy';

ReactDOM.render(
	<HelmetProvider>
		<BrowserRouter>
			<StoreProvider store={store}>
				<App />
			</StoreProvider>
		</BrowserRouter>
	</HelmetProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
