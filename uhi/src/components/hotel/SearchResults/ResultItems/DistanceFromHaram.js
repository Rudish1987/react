import React from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Typography } from '@mui/material';
import Constants from '../../../../helpers/constants'
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const DistanceFromHaram = ({ geo }) => {
	const { t } = useTranslation();
	const theme = useTheme();

	const distance = (Math.round((2 * 6371 * Math.asin(Math.sqrt(Math.pow((Math.sin((Constants.KAABA_LATITUDE * (3.14159 / 180) - geo.lat * (3.14159 / 180)) / 2)), 2) + Math.cos(Constants.KAABA_LATITUDE * (3.14159 / 180)) * Math.cos(geo.lat * (3.14159 / 180)) * Math.pow(Math.sin(((Constants.KAABA_LONGTITUDE * (3.14159 / 180) - geo.lng * (3.14159 / 180)) / 2)), 2)))) * 100) / 100).toFixed(2);

	return (
		<Typography sx={{fontSize: theme.typography.body2, fontWeight: theme.typography.fontWeightRegular, color: theme.palette.grey[800]}}><LocationOnOutlinedIcon sx={{fontSize: theme.typography.body2, color: theme.palette.grey[800]}} /> {`${distance}Km ${t('from')} Masjid al-Haram`}</Typography>
	)

}


export default DistanceFromHaram;