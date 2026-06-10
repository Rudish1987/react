import React, { useState, useEffect } from 'react';
import { Grid, Typography, Avatar } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { TestimonialApi } from '../../../api/btob/Testimonial';
import {useLocale} from '../../../context/LocaleContext';
import { useTranslation } from 'react-i18next';

function WhatOthersThink() {

	const [items, setallData] = useState([]);
	const { locale } = useLocale();
	const { t } = useTranslation();

	useEffect(() => {
		let isMounted = true;
		TestimonialApi().then((res) => {
			if( res.status === true ){
				if(isMounted) {
					setallData(res.data)
				}
			}
		});
		return () => {
			isMounted = false;
		}
	}, [locale])

	return (
		<>
			<Grid item xs={12} sx ={{paddingTop:{ xs: 4, xl:8, lg: 8, md: 4, sm: 4 }}}>
				<Typography variant='h4' fontWeight='fontWeightSemiBold' color='grey.600' textAlign='center' gap={'20px'}>{t('What others think')}</Typography>
			</Grid>
			<Grid item xs={12} paddingX={10} className="othersthinksec">
				<Carousel
					indicatorContainerProps={{ className: 'carousel-indicator-container' }}
					activeIndicatorIconButtonProps={{ className: 'carousel-active-indicator-icon-button' }}
					navButtonsAlwaysInvisible
				>
					{items.map((item,i) => <Item key={i} item={item} />)}
				</Carousel>

				{(items.length == 0) &&
					<Typography align='center'>{t('No data found')}</Typography>
				}
			</Grid>
		</>
	)
}

function Item(props) {
	return (
		<Grid item xs={12} display='inline-flex' sx={{background: '#FFF', marginY: 4, p: 3}}>
			<Grid item xs={2} display={{ xs: 'none', md: 'block' }}>
				<Avatar alt="" src={props.item.profile} className='AvatarContainer'/>
			</Grid>
			<Grid item md={10} xs={12} sx={{p: 3}}>
				<Typography variant='subtitle2' color='grey.800'>{props.item.content}</Typography>
				<Typography variant='body1' fontWeight='fontWeightSemiBold' color='grey.800' paddingTop={2} textAlign='right'>{props.item.user}</Typography>
			</Grid>
		</Grid>
	);
}

export default WhatOthersThink;