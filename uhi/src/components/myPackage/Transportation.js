import React from 'react'
import { Typography, Avatar, Grid, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useTranslation } from 'react-i18next'
import { FormatNumber, BuildTravellPeriodText } from '../../helpers/utils'
import RateType from '../common/RateType'
import { useStoreState } from 'easy-peasy';
// import Constants from '../../helpers/constants';
// import RebookButton from '../common/RebookButton';
// import Constants from '../../helpers/constants';
// import BookingCancelButton from '../common/BookingCancelButton';

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


const Transportation = ({ transferPackage, hasActions = true, checkoutDate, currency }) => {
	const { t } = useTranslation();
	const rebook = useStoreState(actions => actions.btoc.itineraryDetails.rebook)
	let content = (<><Grid item xs={6} sx={{ py: '0 !important' }}><Typography variant="subtitle2" sx={{ fontWeight: 400, fontSize: 12, color: 'Grey/900 - Main text', textTransform: 'capitalize' }}>{t(transferPackage.supplier)}</Typography></Grid><Grid item xs={6} sx={{ py: '0 !important' }}><RateType rateBases={transferPackage} currency={currency} /></Grid></>)
	let transportIncomplete = false;
	if (transferPackage.status === 'INCOMPLETE') {
		transportIncomplete = true;
	}

	return (
		<>
			<Grid container direction="row" sx={{ pb: 2, borderBottom: '2px solid #E0E0E0' }} >
				<Grid item sx={{ marginRight: '10px', maxWidth: '4%', display: 'flex', alignItems: 'flex-start', color: 'Notification/Success/Main' }} >
					<AvatarPackageList><DirectionsCarIcon /></AvatarPackageList>
				</Grid>
				<Grid item xs={rebook ? 6 : 8} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
					<Grid container spacing={2} columns={12}>
						<Grid item xs={12}>
							<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text', textTransform: 'capitalize' }}>{t('Transportation')}</Typography>
						</Grid>
						{hasActions && content}
						<Grid item xs={12} sx={{ py: '0 !important' }}>
							<ParagraphStyled paragraph={true}>{t(BuildTravellPeriodText(transferPackage.dateFrom, checkoutDate, 'Day'))}</ParagraphStyled>
						</Grid>
					</Grid>
				</Grid>
				{rebook && <Grid item xs={2} sx={{ display: 'flex', paddingLeft: '13%' }}>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
						<Typography className={(transportIncomplete) ? 'addredcolor' : ''} paragraph={true} sx={{ fontSize: 12, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(transferPackage.status ?? 'SAVED')}</Typography>
					</Stack>
				</Grid>}
				<Grid item xs={3} sx={{ display: 'flex', paddingLeft: '13%' }}>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
						<Typography paragraph={true} sx={{ fontSize: 12, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(currency)}</Typography>
						<Typography paragraph={true} sx={{ fontSize: 20, color: 'Grey/900 - Main text', fontWeight: 600 }}>{`${FormatNumber(transferPackage.totalPrice)}`}</Typography>
					</Stack>
				</Grid>
			</Grid>
		</>
	)
}
export default Transportation
