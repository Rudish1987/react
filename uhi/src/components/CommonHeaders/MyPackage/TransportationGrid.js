import React, { useEffect } from 'react'
import { Typography, Stack, Avatar, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useTranslation } from 'react-i18next'
import { useStoreState } from 'easy-peasy';
import { FormatNumber, BuildTravellPeriodText } from '../../../helpers/utils'

const AvatarPackageList = styled(Avatar)(() => ({
	color: '#00B760',
	border: '2px solid #00B760 !important',
	backgroundColor: '#FFFFFF',
	width: 24,
	height: 24,
	'& .MuiSvgIcon-root': {
		fontSize: '1rem',
	},
}));

const ParagraphStyled = styled(Typography)(() => ({
	fontWeight: 400,
	fontSize: 12,
	color: '#424242'
}));


const TransportationGrid = ({ transferPackage, changePackageTotalAmount }) => {
	const { t } = useTranslation();
	const currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)

	useEffect(() => {
		changePackageTotalAmount(FormatNumber(transferPackage.totalPrice))
		/*eslint-disable-next-line react-hooks/exhaustive-deps*/
	}, [])

	return (
		<>
			<Grid container direction="row" sx={{ pb: 2, borderBottom: '2px solid #E0E0E0' }} >
				<Grid item xs={1} lg={1} sx={{ display: 'flex', alignItems: 'flex-start', color: 'Notification/Success/Main' }} >
					<AvatarPackageList><DirectionsCarIcon /></AvatarPackageList>
				</Grid>
				<Grid item xs={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start', pb: 0.25 }}>
					<Stack direction="column" spacing={1}>
						<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text', textTransform: 'capitalize' }}>{t('Transportation')}</Typography>
						<Typography variant="subtitle2" sx={{ fontWeight: 400, fontSize: 12, color: 'Grey/900 - Main text', textTransform: 'capitalize' }}>{t(transferPackage.supplier)}</Typography>
						<ParagraphStyled paragraph={true} sx={{direction:'ltr'}}>{t(BuildTravellPeriodText(transferPackage.dateFrom, transferPackage.dateTo, 'Day'))}</ParagraphStyled>
					</Stack>
				</Grid>
				<Grid item xs={6} lg={4} sx={{ display: 'flex', alighItems: 'center', justifyContent: 'flex-end' }}>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
						<Typography paragraph={true} sx={{ fontSize: 12, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(currency)}</Typography>
						<Typography paragraph={true} sx={{ fontSize: 20, color: 'Grey/900 - Main text', fontWeight: 600 }}>{`${FormatNumber(transferPackage.totalPrice)}`}</Typography>
					</Stack>
				</Grid>
			</Grid>
		</>
	)
}
export default TransportationGrid
