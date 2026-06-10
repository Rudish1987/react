import React,{useEffect} from 'react'
import HotelIcon from '@mui/icons-material/Hotel'
import { Typography, Stack, Avatar, Grid} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useStoreState } from 'easy-peasy';
import { useLocale } from '../../../context/LocaleContext'
import { format, differenceInDays } from 'date-fns'
import {FormatNumber} from '../../../helpers/utils'
import Constants from '../../../helpers/constants';

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


const AccommodationItemGrid = ({accommodationPackage, packageTotalAmount, changePackageTotalAmount}) => {
	const { locale } = useLocale();
	const theme = useTheme();
	const buildTravellPeriodText = (dateFrom, dateTo) => {
		let text = '';


		let arrivingOn = new Date(dateFrom)
		let departureOn = new Date(dateTo)

		let dateDiff = differenceInDays(departureOn, arrivingOn)
		if( locale.value === Constants.LANGUAGES_EN ){
			let arrivingOnText = format(new Date(dateFrom), 'd MMMM')
			let departureOnText = format(new Date(dateTo), 'd MMMM')

			text+= arrivingOnText +' - '+departureOnText+' - '
			text += `  ${dateDiff} Night${dateDiff > 1 ? 's' : ''}`;
		}

		else if( locale.value === Constants.LANGUAGES_AR ){
			let arrivingOnText = t(format(new Date(dateFrom), 'MMMM')) + ' ' + format(new Date(dateFrom), 'd')
			let departureOnText = t(format(new Date(dateTo), 'MMMM'))+ ' ' + format(new Date(dateTo), 'd')
			let nightNumber = `Night${dateDiff > 1 ? 's' : ''}`;
			text += `${t(nightNumber)} ${dateDiff}`;
			text+= ' - '+departureOnText +' - '+arrivingOnText

		}

		return text;
	}

	const { t } = useTranslation();
	const currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)
	let roomTotal =0;
	let content = '';
	if(Object.keys(accommodationPackage).length !==0)
	{
		content = {...accommodationPackage}.rooms.map((item)=>{
			const processed = [];
			const newRooms = [];
			for (let key in item.roomTypeCodes)
			{
				const indexof = processed.indexOf(item.roomTypeCodes[key].RoomType);
				if(indexof === -1)
				{
					newRooms.push({...item.roomTypeCodes[key],count:1})
					processed.push(item.roomTypeCodes[key].RoomType)
				}
				else
				{
					newRooms[indexof].count += 1
					newRooms[indexof].roomAmount += item.roomTypeCodes[key].roomAmount
				}
				roomTotal += item.roomTypeCodes[key].roomAmount;
				packageTotalAmount = packageTotalAmount + item.roomTypeCodes[key].roomAmount
			}
			return 	(
				newRooms.map( roomTypeCode =>
					(<ParagraphStyled paragraph={true} key={roomTypeCode.RoomType}>{t(roomTypeCode.roomName)} X {roomTypeCode.count} {t('Rooms')}</ParagraphStyled>)
				)
			)
		})
	}

	useEffect(() => {
		changePackageTotalAmount(packageTotalAmount)
		/*eslint-disable-next-line react-hooks/exhaustive-deps*/
	} ,[])


	return 	(
		<>
			{content && <Grid container direction="row" sx={{ mb:0, borderBottom: '2px solid #E0E0E0' }} >
				<Grid item xs={1} lg={1} sx={{ display: 'flex', alignItems: 'flex-start', color: 'Notification/Success/Main' }} >
					<AvatarPackageList><HotelIcon/></AvatarPackageList>
				</Grid>
				<Grid item xs={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-start', pb: 0.25 }}>
					<Stack direction="column" spacing={1}>
						<Typography sx={{fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightSemiBold, color: theme.palette.grey[800]}}>{t(accommodationPackage.hotel)} ({t(accommodationPackage.DestinationName)})</Typography>
						{ content }
						<ParagraphStyled paragraph={true} sx={{direction:'ltr'}}>{ t(buildTravellPeriodText(accommodationPackage.dateFrom, accommodationPackage.dateTo)) }</ParagraphStyled>
					</Stack>
				</Grid>
				<Grid item xs={6} lg={4} sx={{ display: 'flex', alighItems: 'center', justifyContent:'flex-end' }}>
					<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
						<Typography paragraph={true} sx={{ fontSize:12, mb:-1, color: 'Grey/900 - Main text', fontWeight:600 }}>{t(currency)}</Typography>
						<Typography paragraph={true} sx={{ fontSize:20, color: 'Grey/900 - Main text', fontWeight:600 }}>{`${FormatNumber(roomTotal,2)}`}</Typography>
					</Stack>
				</Grid>
			</Grid>}
		</>
	)
}
export default AccommodationItemGrid