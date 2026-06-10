import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { maqamRoutes } from '../../../api/TransferApi'
import { useLocale } from '../../../context/LocaleContext';

const Destination = ({ value, onChange }) => {
	const { locale } = useLocale();
	const [destinations, setallData] = useState([]);

	useEffect(() => {
		maqamRoutes().then((res) => {
			setallData(res[locale.value])

		});
	}, [locale])

	const { t } = useTranslation();
	const handleChange = (event) => {
		onChange(event.target.value);
	};

	return (
		<FormControl fullWidth>
			<InputLabel id="hotel-destination-select-label">{t('Route')}</InputLabel>
			<Select
				labelId="hotel-destination-select-label"
				id="hotel-destination-select"
				value={value}
				label={t('Route')}
				onChange={handleChange}

				sx={{
					'& .muiltr-6hp17o-MuiList-root-MuiMenu-list': {
						color: '#11142D',
						fontSize: '12px'
					},

				}}
			>
				{Object.keys(destinations).map((destination) => (
					(<MenuItem
						value={destination} key={destination}>{destinations[destination]}</MenuItem>)
				))}
			</Select>
		</FormControl>
	);
}

export default Destination;