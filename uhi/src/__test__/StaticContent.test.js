import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import StaticContent from '../components/StaticContent';
import renderer from 'react-test-renderer';
import {HelmetProvider} from 'react-helmet-async';
//test block
afterEach(cleanup);
jest.mock('react-i18next', () => ({
	useTranslation: () => ({t: (key) => key}),
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

const mockRequest = () => {
	return {
		bannerTitle: 'Benefits',
		image: 'https:/google/makkah.jpg',
		title: 'Benefits',
		content: 'content',
	};
};

test('Check static content title', () => {
	const benefits = mockRequest();
	// render the component on virtual dom
	render(
		<HelmetProvider>
			<StaticContent data={benefits}/>
		</HelmetProvider>
	);
	//select the elements you want to interact with
	const dataTitle = screen.getByTestId('dataTitle');
	expect(dataTitle).toHaveTextContent(benefits.title);
});

test('Create a snapshot for Static Content', () => {
	const staticContent = renderer
		.create(
			<HelmetProvider>
				<StaticContent data={mockRequest()}/>
			</HelmetProvider>
		)
		.toJSON();
	expect(staticContent).toMatchSnapshot();
});
