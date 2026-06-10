import React from 'react'
import {Typography} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormatNumber } from '../helpers/utils'
import { useTheme } from '@mui/material/styles';

const DisplayPrice = ({currency,price,priceText}) => {
	const { t } = useTranslation();
	const theme = useTheme();
	return (
		<>
			<Typography sx={{fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightBold, color: theme.palette.grey[800]}} component="div">
				{`${t(currency)} ${FormatNumber(price,2)}`}
			</Typography>
			<Typography sx={{fontSize: theme.typography.tooltip, fontWeight: theme.typography.fontWeightRegular, color: theme.palette.grey[800]}} component="span" >
				{t(priceText)}
			</Typography>
		</>
	)
}

export default DisplayPrice
