import React from 'react'
import HotelIcon from '@mui/icons-material/Hotel'
import { Typography, Avatar, Grid, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { format, differenceInDays } from 'date-fns'
import { FormatNumber } from '../../helpers/utils'
import RateType from '../common/RateType';
import Constants from '../../helpers/constants';
// import RebookButton from '../common/RebookButton';
import { useStoreState } from 'easy-peasy';
import { useLocale } from '../../context/LocaleContext'

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


export default function Accommodation({ accommodationPackage, hasActions = true, currency }) {

	const { locale } = useLocale();
	const rebook = useStoreState(actions => actions.btoc.itineraryDetails.rebook)
	const buildTravellPeriodText = (dateFrom, dateTo) => {
		let text = '';

		let arrivingOn = new Date(dateFrom)
		let departureOn = new Date(dateTo)

		let dateDiff = differenceInDays(departureOn, arrivingOn)

		if (locale.value === 'en') {
			let arrivingOnText = format(new Date(dateFrom), 'd MMMM')
			let departureOnText = format(new Date(dateTo), 'd MMMM')

			text += arrivingOnText + ' - ' + departureOnText + ' - '
			text += `  ${dateDiff} Night${dateDiff > 1 ? 's' : ''}`;
		}

		else if (locale.value === 'ar') {
			let arrivingOnText = t(format(new Date(dateFrom), 'MMMM')) + ' ' + format(new Date(dateFrom), 'd')
			let departureOnText = t(format(new Date(dateTo), 'MMMM')) + ' ' + format(new Date(dateTo), 'd')
			text += `${t(`Night${dateDiff > 1 ? 's' : ''}`)} ${dateDiff}`;
			text += ' - ' + departureOnText + ' - ' + arrivingOnText

		}

		return text;
	}

	const { t } = useTranslation();
	let roomTotal = 0;
	let content = '';
	if (Object.keys(accommodationPackage).length !== 0) {
		content = React.Children.toArray({ ...accommodationPackage }.rooms.map(item => {
			const processed = [];
			const newRooms = [];
			for (let key in item.roomTypeCodes) {
				const indexof = processed.indexOf(item.roomTypeCodes[key].RoomType);
				if (indexof === -1) {
					newRooms.push({ ...item.roomTypeCodes[key], count: 1 })
					processed.push(item.roomTypeCodes[key].RoomType)
				}
				else {
					newRooms[indexof].count += 1
					newRooms[indexof].roomAmount += item.roomTypeCodes[key].roomAmount
				}
				roomTotal += Number(item.roomTypeCodes[key].roomAmount);
			}
			return (
				newRooms.map(roomTypeCode =>
					(<><Grid item xs={6} sx={{ py: '0 !important' }}><ParagraphStyled paragraph={true} key={roomTypeCode.RoomType}>{t(roomTypeCode.roomName)} X {roomTypeCode.count} {t('Rooms')}</ParagraphStyled></Grid><Grid item xs={6} sx={{ py: '0 !important' }}><RateType rateBases={roomTypeCode} currency={currency} /></Grid></>)
				)
			)
		}))
	}
	let accomodationIncomplete = false;
	if (accommodationPackage.status === 'INCOMPLETE') {
		accomodationIncomplete = true;
	}
	return (
		<>
			{content && <Grid container item direction="row" xs={12} sx={{ mb: 2, borderBottom: '2px solid #E0E0E0' }} >
				<Grid item sx={{ marginRight: '10px', maxWidth: '4%', display: 'flex', alignItems: 'flex-start', color: 'Notification/Success/Main' }} >
					<AvatarPackageList><HotelIcon /></AvatarPackageList>
				</Grid>
				<Grid item xs={rebook ? 6 : 8} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
					<Grid container spacing={2} columns={12}>
						<Grid item xs={12}>
							<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text', textTransform: 'capitalize' }}>{t(accommodationPackage.hotel)} ({t(accommodationPackage.DestinationName)})</Typography>
						</Grid>
						{hasActions && content}
						<Grid item xs={12} sx={{ py: '0 !important' }}>
							<ParagraphStyled paragraph={true}>{t(buildTravellPeriodText(accommodationPackage.dateFrom, accommodationPackage.dateTo))}</ParagraphStyled>
						</Grid>
					</Grid>
				</Grid>
				{rebook && <Grid item xs={2} sx={{ display: 'flex', paddingLeft: '13%' }}>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
						<Typography className={(accomodationIncomplete) ? 'addredcolor' : ''} paragraph={true} sx={{ fontSize: 12, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(accommodationPackage.status ?? Constants.MAQAM_BOOKING_SAVED)}</Typography>
					</Stack>
				</Grid>}
				<Grid item xs={3} sx={{ display: 'flex', paddingLeft: '13%' }}>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
						<Typography paragraph={true} sx={{ fontSize: 12, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(currency)}</Typography>
						<Typography paragraph={true} sx={{ fontSize: 20, color: 'Grey/900 - Main text', fontWeight: 600 }}>{`${FormatNumber(roomTotal, 2)}`}</Typography>
					</Stack>
				</Grid>
			</Grid>}
		</>
	)
}
