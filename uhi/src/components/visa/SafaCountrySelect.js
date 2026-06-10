import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useStoreState} from 'easy-peasy';
import {Box} from '@mui/material';
import {useLocale} from '../../context/LocaleContext';
import Constants from '../../helpers/constants';

export default function SafaCountrySelect({value, setLabel, setStateValue, errorMsg, helperTextMsg}) {
	const { locale } = useLocale();
	let safaCountry = useStoreState(s => s.btob.visa.safaCountry);
	const [petInputValue, setPetInputValue] = React.useState('');

	const handleChange = (_, value) => {
		const newValue = {
			natCode: (value) ? value.natCode : '',
			name: (value) ? value.name : '',
			nameAr: (value) ? value.nameAr : '',
		}
		setStateValue(newValue)
	}

	return (
		<Autocomplete
			options={safaCountry}
			fullWidth
			value={value}
			getOptionLabel={(option) => (locale.value == Constants.LANGUAGES_AR) ? option.nameAr || '' : option.name || ''}
			isOptionEqualToValue={(option, value) => option.natCode === value.natCode}
			renderOption={(props, option) => (
				<Box component='li' {...props}>
					{(locale.value == Constants.LANGUAGES_AR) ? option.nameAr : option.name}
				</Box>
			)}
			onChange={handleChange}
			inputValue={petInputValue}
			onInputChange={(event, newCountryInputValue) => {
				setPetInputValue(newCountryInputValue);
			}}
			renderInput={(params) => {
				return <TextField label={setLabel} {...params} error={errorMsg} helperText={helperTextMsg} />;
			}}
		></Autocomplete>
	);
}