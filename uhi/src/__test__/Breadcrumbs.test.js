// learn more: https://github.com/testing-library/jest-dom
//import '@testing-library/jest-dom';
import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import Breadcrumbs from '../components/Breadcrumbs';
import renderer from 'react-test-renderer';
//test block
afterEach(cleanup)
jest.mock('react-i18next', () => ({
	useTranslation: () => ({t: key => key})
}));
test('Check breadcrum initial text which will be Home', () => {
// render the component on virtual dom
	render(<Breadcrumbs breadcrumbsTitle='About Us'/>);
	//select the elements you want to interact with
	const homeLink = screen.getByTestId('homeLink');
	expect(homeLink).toHaveTextContent(/^Home$/i);
});

test('Check breadcrum Title text page text', () => {
// render the component on virtual dom
	render(<Breadcrumbs breadcrumbsTitle='About Us'/>);
	//select the elements you want to interact with
	const breadcrumbText = screen.getByTestId('breadcrumbText');
	expect(breadcrumbText).toHaveTextContent(/^About Us$/i);
});

test('Create a snapshot for About Us', () => {
	const aboutUs = renderer.create(<Breadcrumbs breadcrumbsTitle='About Us'/>).toJSON();
	expect(aboutUs).toMatchSnapshot();

});