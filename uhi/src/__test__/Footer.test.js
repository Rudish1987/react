import React from 'react';
import Footer from '../components/guests/Footer';
import renderer from 'react-test-renderer'
import {BrowserRouter as Router} from 'react-router-dom';
//test block
jest.mock('react-i18next', () => ({
	useTranslation: () => ({t: key => key})
}));
test('Create a snapshot for Footer', () => {
// create the snapshot of Footer

	const footer = renderer.create(<Router><Footer/></Router>).toJSON();
	expect(footer).toMatchSnapshot()
});