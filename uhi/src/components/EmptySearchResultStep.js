import React from 'react';

// material
import { Grid, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

// import { useStoreState, useStoreActions } from 'easy-peasy';


import HotelIcon from '@mui/icons-material/Hotel';
import { styled } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroundServicesSVG from '../Assets/GroundServicesSVG'

import Constants from '../helpers/constants'


const ColorlibStepIconRoot = styled('div')(() => ({
	//backgroundColor: '#FFFFFF',
	zIndex: 1,
	width: 80,
	height: 80,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	color: '#BDBDBD',
	alignItems: 'center',
	border: '3px solid #BDBDBD',

}));
const styleIcon = {
	// transform: 'translate(-50%, -50%)',
	fontSize: 40,
	position:'relative',
	left:'12px'
};

export const EmptySearchResultStep = ({ stepLevel, handlerefresh , norefreshbutton }) => {
	const { t } = useTranslation();

	let steps = [
		t(Constants.STEP_TEXT_MAKKAH),
		t(Constants.STEP_TEXT_MADINAH),
		t(Constants.STEP_TEXT_TRANSPORTATION),
		t(Constants.STEP_TEXT_GROUNDSERVICES),
		t(Constants.STEP_TEXT_VISA_AND_PAY)
	]

	let icons = [
		<HotelIcon key={0} sx={styleIcon} />,
		<HotelIcon key={1} sx={styleIcon} />,
		<AirportShuttleIcon key={2} sx={styleIcon} />,
		<GroundServicesSVG key={3} width={40} height={40} />,
		<ListAltIcon key={4} sx={styleIcon} />,
	];

	//set step level from steps array
	const activeStep = steps.indexOf(stepLevel)
	const stepIcon = icons[activeStep]

	function refreshpage() {
		handlerefresh()
	}

	let text = t('We can’t find any ') + stepLevel.toLowerCase() + t(' matching with your search.')

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
			sx={{ mt: 10, mb: 10 }}
		>
			<ColorlibStepIconRoot>
				{stepIcon}
				<CancelOutlinedIcon sx={{ position: 'relative', top: '-15.67%', left: '23%', zIndex: 1, background: '#FFFFFF', color: '#F04F3F' }} />
			</ColorlibStepIconRoot>

			<Typography variant="h4" sx={{ color: '#757575' }}>{t('Sorry, no results found')}</Typography>
			<Typography variant="h6" sx={{ color: '#757575' }}>{t(text)}</Typography>
			{norefreshbutton && <Button variant="contained" sx={{ background: '#212121', color: '#FFFFFF', mt: 5, boxShadow: 'none' }} onClick={refreshpage}>{t('Try Again')}</Button>}
		</Grid>
	)
}