import React from 'react';

// material
import { Typography, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import HotelIcon from '@mui/icons-material/Hotel';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
//import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroundServicesSVG from '../../../Assets/GroundServicesSVG'

import ListAltIcon from '@mui/icons-material/ListAlt';
import AvatarGroup from '@mui/material/AvatarGroup';

import { useTranslation } from 'react-i18next';

const AvatarStyled = styled(Avatar)(() => ({
	color: '#BDBDBD',
	border: '2px solid #BDBDBD !important',
	backgroundColor: '#FFFFFF',
	width: 50,
	height: 50
}));

export const EmptyPackage = () => {
	const { t } = useTranslation();

	return (
		<Stack sx={{ display: 'flex', justifyContent: 'center', height: 200, alignItems: 'center' }}>
			<AvatarGroup total={5} spacing="small">
				<AvatarStyled><HotelIcon /></AvatarStyled>
				<AvatarStyled><HotelIcon /></AvatarStyled>
				<AvatarStyled><AirportShuttleIcon /></AvatarStyled>
				<AvatarStyled><GroundServicesSVG /></AvatarStyled>
				<AvatarStyled><ListAltIcon /></AvatarStyled>
			</AvatarGroup>


			<Stack direction="row" spacing={2}>
				<Typography sx={{ fontWeight: 600, fontSize: 23, color: '#BDBDBD' }}>{t('Your package is empty')}</Typography>
			</Stack>
		</Stack>
	)
}