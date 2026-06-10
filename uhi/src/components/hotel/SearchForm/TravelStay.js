import React from 'react';
import { FormControl, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MIN_STAY = 31;

const TravelStay = ({ onChange, stayCity, stateValue: stay, setStateValue: setStay, }) => {
	const [stateValue, setStateValue] = React.useState([stay]);

	const handleChangeStay = (newValue) => {
		onChange(newValue)
		setStateValue(newValue.target.value)
		setStay(newValue.target.value)
	}
	const { t } = useTranslation();
	return (
		<FormControl fullWidth>
			<TextField
				id={stayCity}
				label={t('Stay in') +' '+ stayCity}
				select
				sx={{'& .MuiOutlinedInput-input': {
					color: '#11142D',
					fontSize: '12px',
				},
				mt:1}}
				value={stateValue}
				onChange={handleChangeStay}
			>
				{Array.from(Array(MIN_STAY), (_, i) => {
					if(stayCity === t('Makkah')) {
						i = i + 1;
						if(i < MIN_STAY){
							return <MenuItem key={i} value={i}>{i} {((i > 1) ? t('Nights') : t('Night'))}</MenuItem>
						}
					} else {
						return <MenuItem key={i} value={i}>{i} {((i > 1) ? t('Nights') : t('Night'))}</MenuItem>
					}

				})}
			</TextField>
		</FormControl>


	);
}
export default TravelStay;
