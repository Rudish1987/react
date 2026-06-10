import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { maqamRoutes } from '../../../api/TransferApi'
import { useLocale } from '../../../context/LocaleContext';

const TransferRoute = ({ value, onChange, setStateValue }) => {
	const { locale } = useLocale();
	const [transferRoutes, setallData] = useState([]);

	useEffect(() => {
		maqamRoutes().then((res) => {
			if( res.status == undefined ){
				setallData(res[locale.value])
			}
			

		});
	}, [locale])

	const { t } = useTranslation();
	const handleChange = (event) => {
		onChange(event.target.value);
		setStateValue(event.target.value);
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
					'& .MuiOutlinedInput-input': {
						color: '#11142D',
						fontSize: '12px',
					}
				}}
			>
				{Object.keys(transferRoutes).map((transferRoute) => (
					(<MenuItem sx={{ fontSize: '12px' }} value={transferRoute} key={transferRoute}>{transferRoutes[transferRoute]}</MenuItem>)
				))}
			</Select>
		</FormControl>
	);
}

export default TransferRoute;