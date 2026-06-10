import React from 'react';
import {render, cleanup} from '@testing-library/react';
import TravelStay from '../components/hotel/SearchForm/TravelStay'
//test block


afterEach(cleanup)
jest.mock('react-i18next', () => ({
	useTranslation: () => ({t: key => key})
}));
test('onchange travel stay', () => {
// render the component on virtual dom
	const { container} = render(<TravelStay
		value='10'
		onChange='7'
		stayCity="Makkah"
		stateValue='7'
		setStateValue='7'
	/>);
	//CHECK DIV CONTAINER
	let Makkah = container.querySelector(
		'#Makkah',
	);
	expect(Makkah).toBeInTheDocument();
	expect(Makkah).toHaveTextContent('7');

	/*Notes
	* Folow this url to test any MUI dropdown field
	* https://stackoverflow.com/questions/55184037/react-testing-library-on-change-for-material-ui-select-component
	*
	* */
})