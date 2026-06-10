import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';

import {countryList} from '../../../api/CountryApi';
import { useLocale } from '../../../context/LocaleContext';
import { useStoreActions } from 'easy-peasy';
import Constants from '../../../helpers/constants';

const CountrySelect = ({ value, onChange, setLabel, setStateValue, isPhoneCodeRequired }) => {
	const { t } = useTranslation();

	const { locale } = useLocale();
	const [countries, setallData] = useState([]);
	const setCountryResult = useStoreActions(actions => actions.btoc.setCountryResult);

	useEffect(() => {
		countryList().then((res) => {
			if( res.status == undefined ){
				setallData(res)
				setCountryResult(res)
			}
		});
	}, [locale])


	const handleChange = (_, value) => {
		const newValue = {
			Country_Code: (value) ? value.Country_Code: '',
			Country_Name: (value) ? value.Country_Name: '',
			Tel_Country_Code: (value) ? value.Tel_Country_Code: '',
			ShortCountryName: (value) ? value.ShortCountryName: '',
			Country_Name_AR: (value) ? value.Country_Name_AR: '',
		}
		onChange(newValue)
		setStateValue(newValue)
	};

	return (
		<Autocomplete
			id='country-select'
			sx={{
				'& .MuiOutlinedInput-root': {
					color: '#11142D',
					fontSize: '12px',
					padding: '12px',
					minWidth: '170px!important',
					fontweight: '600',
				},
				'& .MuiInputLabel-root': {
					color: '#11142D',
					fontSize: '14px',
					fontweight: '600',
				}
			}}
			fullWidth
			value={value}
			options={countries}
			onChange={handleChange}
			isOptionEqualToValue={(option, value) =>
				option.Country_Code === value.Country_Code
			}
			autoHighlight
			getOptionLabel={(option) => (locale.value == Constants.LANGUAGES_AR) ? option.Country_Name_AR : option.Country_Name}
			renderOption={(props, option) => (
				<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
					<img
						loading="lazy"
						width="20"
						src={`https://flagcdn.com/w20/${option.ShortCountryName.toLowerCase()}.png`}
						srcSet={`https://flagcdn.com/w40/${option.ShortCountryName.toLowerCase()}.png 2x`}
						alt=""
					/>
					{(locale.value == Constants.LANGUAGES_AR) ? option.Country_Name_AR : option.Country_Name}  {isPhoneCodeRequired ? '('+option.Tel_Country_Code+')' : ''}
				</Box>
			)}
			renderInput={(params) => (
				<TextField sx={{
					'& .MuiOutlinedInput-input': {
						color: '#11142D',
						fontSize: '12px',
						padding: '9px',
						fontweight: '600',
					}
				}}
				fullWidth
				{...params}
				label={t(setLabel)}
				value={value.code}
				inputProps={{
					...params.inputProps,
					autoComplete: 'off', // disable autocomplete and autofill
				}}

				/>
			)}
		/>
	);
}

export default CountrySelect;