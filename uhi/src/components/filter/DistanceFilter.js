import React, { useEffect } from 'react';
import { Slider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';

function valuetext(value) {
	return `$${value}`;
}

const minBarGape = 1;

export const DistanceFilter = ({ applyFilters, minDistance, maxDistance, setDistanceRange, distanceRange }) => {
	const { t } = useTranslation();

	const handleChange = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) {
			return;
		}

		if (activeThumb === 0) {
			setDistanceRange([Math.min(newValue[0], distanceRange[1] - minBarGape), distanceRange[1]]);
		} else {
			setDistanceRange([distanceRange[0], Math.max(newValue[1], distanceRange[0] + minBarGape)]);
		}
	};

	const handleChangeCommitted = (event, newValue) => {
		applyFilters('', newValue);
	};

	useEffect(() => {
		if (distanceRange[0] === 0 && distanceRange[1] === 0) {
			setDistanceRange([minDistance, maxDistance]);
			applyFilters('', [minDistance, maxDistance]);
		}
	}, []);


	const marks = [
		{
			value: minDistance,
			label: minDistance + ' ' + t('km'),
		},
		{
			value: maxDistance,
			label: maxDistance + ' ' + t('km'),
		},
	];

	return (
		<>
			<Container maxWidth="sm" sx={{ paddingLeft: '35px!important', paddingRight: '35px!important' }}>
				<Typography sx={{
					'fontFamily': 'Montserrat',
					'fontStyle': 'normal',
					'fontWeight': '600',
					'fontSize': '16px',
					'lineHeight': '150%',
					'letterSpacing': '0.00938em',
					'margin': '5px',
					'color': '#424242'
				}}>{t('Distance to MASJID AL-HARAM')}</Typography>
				<Slider
					size="small"
					getAriaLabel={() => 'Distance'}
					value={distanceRange}
					onChange={handleChange}
					onChangeCommitted={handleChangeCommitted}
					valueLabelDisplay="auto"
					getAriaValueText={valuetext}
					marks={marks}
					step={1}
					min={minDistance}
					max={maxDistance}
					disableSwap
				/>
			</Container>
		</>
	);
}
