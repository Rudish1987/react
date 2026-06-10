import React from 'react';

// material
import { styled } from '@mui/material/styles';

import { Grid, Paper, Typography } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import { format } from 'date-fns'

import { useTranslation } from 'react-i18next';

import { useLocale } from '../../context/LocaleContext'
import { titleCase } from '../../helpers/utils'

import Constants from '../../helpers/constants';


const ItemValue = styled(Paper)(({ theme }) => ({
	textAlign: 'left',
	color: theme.palette.text.secondary,
	fontFamily: 'Montserrat',
	fontWeight: 500,
	fontSize: 14,
	lineHeight: '160%'
}));
const Item = styled(Paper)(({ theme }) => ({
	marginTop: 8,
	textAlign: 'left',
	color: theme.palette.text.secondary,
	fontFamily: 'Montserrat',
	fontWeight: 400,
	fontSize: 12,
	lineHeight: '160%'
}));

export const Summary = () => {

	const {t} = useTranslation();
	//state values
	const travelPeriod = useStoreState(s => s.btoc.filters.travelPeriod)
	const rooms = useStoreState(s => s.btoc.filters.rooms)
	const residency = useStoreState(s => s.btoc.filters.residency)
	const nationality = useStoreState(s => s.btoc.filters.nationality)
	const checkResidencySwitch = useStoreState(s => s.btoc.filters.checkResidencySwitch);

	//const stayInMakka = useStoreState(s => s.btoc.filters.nightStayInMakka)
	const stayInMadinah = useStoreState(s => s.btoc.filters.nightStayInMadinah)

	const { locale } = useLocale();

	const buildOccupancyText = () => {

		let text = '';
		let adults = rooms.reduce((a, b) => a + (b.adultsCount * b.room), 0)
		text += `  ${adults} ${adults > 1 ? t('Adults') : t('Adult')}`;
		return text;
	}

	const buildFromText = () => {
		let text = '';
		text += (checkResidencySwitch) ? ((locale.value == Constants.LANGUAGES_AR) ? nationality.Country_Name_AR : nationality.Country_Name) : ((locale.value == Constants.LANGUAGES_AR) ? residency.Country_Name_AR : residency.Country_Name)
		return titleCase(text)
	}

	const buildAccommodationText = () => {
		let text = t('Makkah');
		if( locale.value === 'ar' ){
			text = (stayInMadinah) ? t('Madinah')+', '+text : text
		}else{
			text += (stayInMadinah) ? ', '+t('Madinah') : ''
		}

		return text
	}

	const buildArrivingOnText = () => {
		let text = format(new Date(travelPeriod.from), 'd MMMM yyyy')
		if( locale.value === 'ar' ){
			text = format(new Date(travelPeriod.from), 'yyyy MMMM d')
		}
		text = text.split(' ');

		return text[0]+ ' ' + t(text[1]) + ' '+ text[2];
	}

	return (
		<Grid container spacing={2}>
			<Grid container spacing={{ xs: 2, md: 3 }}>
				<Grid item xs={12} sm={2} md={2} >
					<Item></Item>
					<Typography variant="caption" display="block" className="summary-text">
						{t('Summary')}
					</Typography>
				</Grid>
				<Grid item xs={2} className="nospacelelft">
					<Item>{t('Passengers')}</Item>
					<ItemValue className="summary-text">{t(buildOccupancyText())}</ItemValue>
				</Grid>
				<Grid item xs={6} sm={3} md={3}  >
					<Item>{t('From')}</Item>
					<ItemValue className="summary-text">{t(buildFromText())}</ItemValue>
				</Grid>
				<Grid item xs={3} className="nospacelelft">
					<Item>{t('Arriving on')}</Item>
					<ItemValue className="summary-text">{t(buildArrivingOnText())}</ItemValue>
				</Grid>
				<Grid item xs={2} className="nospacelelft">
					<Item>{t('Accommodation')}</Item>
					<ItemValue className="summary-text">{t(buildAccommodationText())}</ItemValue>
				</Grid>
			</Grid>
		</Grid>
	)
}
