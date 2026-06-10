import React from 'react'
import {Typography} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const DisplayNameDetails = ({displayName, generalDetails}) => {
	const { t } = useTranslation();
	const theme = useTheme();
	return (
		<>
			<Typography sx={{fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightSemiBold, color: theme.palette.grey[800]}} component="div">
				{t(displayName)}
			</Typography>
			<Typography sx={{fontSize: theme.typography.body2, fontWeight: theme.typography.fontWeightRegular, color: theme.palette.grey[800]}} component="span">
				{generalDetails}
			</Typography>
		</>
	)
}

export default DisplayNameDetails
