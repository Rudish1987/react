import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const TravelPeriod = ({ value: travelPeriod, onChange, setStateValue: setTravelPeriod, makkaNights, madinahNights }) => {
	const handleChangeDatePicker = (newValue) => {
		onChange(newValue)
		setTravelPeriod({ from: moment(newValue).format('YYYY-MM-DD'), to: moment(newValue).add(parseInt(makkaNights) + parseInt(madinahNights + 1), 'days').format('YYYY-MM-DD') })
	}
	/*add 45 days with current date*/
	let maxDate = new Date(); // Now
	maxDate.setDate(maxDate.getDate() + 45); // Set now + 45 days as the new date
	const { t } = useTranslation();
	return (
		<FormControl fullWidth>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label={t('Arrival Date')}
					name='dateFrom'
					value={travelPeriod.from ?? moment().add(2, 'days').toDate()}
					onChange={handleChangeDatePicker}
					renderInput={(params) => <TextField
						fullWidth
						{...params} />}
					inputFormat={'dd/MM/yyyy'}
					minDate={new Date()}
					maxDate = {maxDate}
				/>
			</LocalizationProvider>
		</FormControl>
	);
}

export default TravelPeriod;