import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';

import { countryList } from '../../api/CountryApi';
import { useLocale } from '../../context/LocaleContext';
import Constants from '../../helpers/constants';

const CountrySelect = ({ value, onChange, setLabel, setStateValue, error, helperText }) => {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [countries, setallData] = useState([]);

	useEffect(() => {
		countryList().then((res) => {
			if (res.status == undefined) {
				setallData(res)
			}
		});
	}, [locale])

	const handleChange = (_, value) => {
		const newValue = {
			Country_Code: (value) ? value.Country_Code : '',
			Country_Name: (value) ? '( +' + value.Tel_Country_Code + ' )' + value.Country_Name : '',
			Tel_Country_Code: (value) ? value.Tel_Country_Code : '',
			ShortCountryName: (value) ? value.ShortCountryName : '',
			Country_Name_AR: (value) ? value.Country_Name_AR : ''
		}
		onChange(newValue)
		setStateValue(newValue)

	};

	return (
		<Autocomplete
			id='country-select'
			fullWidth
			value={value}
			options={countries}
			onChange={handleChange}
			isOptionEqualToValue={(option, value) =>
				option.Country_Code === value.Country_Code
			}
			autoHighlight
			getOptionLabel={(option) => (locale.value == Constants.LANGUAGES_AR) ? '( +' + option.Tel_Country_Code + ' )' + option.Country_Name_AR : option.Country_Name}
			renderOption={(props, option) => (
				<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
					{(locale.value == Constants.LANGUAGES_AR) ? '( +' + option.Tel_Country_Code + ' )' + option.Country_Name_AR : option.Country_Name + '( +' + option.Tel_Country_Code + ' )'}
				</Box>
			)}
			renderInput={(params) => (
				<TextField
					fullWidth
					{...params}
					className="innerfield"
					label={t(setLabel)}
					value={value.code}
					inputProps={{
						...params.inputProps,
						autoComplete: 'off', // disable autocomplete and autofill
					}}
					error={error}
					helperText={helperText}
				/>
			)}
		/>
	);
}

export default CountrySelect;