import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Box, Grid, Typography, Link } from '@mui/material';
import { styled } from '@mui/styles'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
//import { ScrollMenu } from 'react-horizontal-scrolling-menu';
//import { LeftArrow, RightArrow } from './Arrows';
//import './carousel.css'

// import { newsList } from '../../api/NewsApiUrl';
import { newsBlocks } from '../../../api/btob/NewsAPI';
import { useLocale } from '../../../context/LocaleContext';
import { useTranslation } from 'react-i18next';
import Constants from '../../../helpers/constants';

const B = styled(Box)(({theme}) => ({
	borderWidth:'1px',
	borderColor:theme.palette.grey[400] ,
	height:'300px'
}))

const Card = ({ item }) => {
	const { t } = useTranslation();
	return (
		<B component='div'>
			<Link underline='hover' key='1' target='_blank' href={Constants.BLOG_POST_URL + item.slug}>
				<img src={item.media.wixMedia.image.url ?? ''} alt='' className='carosel-img' />
				<Box sx={{ p: 1, wordWrap: 'wrap' }} className='slideContent-text'>
					<Typography variant='body1' fontWeight={'fontWeightSemiBold'} color={'grey.0'}>
						{t(item.title.length < 60 ? `${item.title}` : `${item.title.substring(0, 58)}...`)}
					</Typography>
					<Typography underline='hover' key='1' color={'grey.0'} variant={'caption'} target='_blank' href={Constants.BLOG_POST_URL + item.slug}>
						{t('Read More...')}
					</Typography>
				</Box>
			</Link>
		</B>
	)
}

// the naming can be any, depends on you.
const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 3
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3
	},
	tablet: {
		breakpoint: { max: 1024, min: 600 },
		items: 2
	},
	mobile: {
		breakpoint: { max: 600, min: 0 },
		items: 1
	}
};
const NewsSection = () => {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [items, setallData] = useState([]);


	useEffect(() => {
		newsBlocks().then((res) => {
			let isMounted = true;
			if (res.status === true) {
				if(isMounted) {
					setallData(res.data.posts)
				}
			}
			return () => {
				isMounted = false;
			}
		});
	}, [locale])

	// let carouselState = {}
	const LeftArrowFix = (arrowProps) => {
		const {carouselState, children, ...restArrowProps} = arrowProps
		return ( <ChevronLeftRoundedIcon {...restArrowProps}> {children} </ChevronLeftRoundedIcon> )
	}

	const RightArrowFix = (arrowProps) => {
		const {carouselState, children, ...restArrowProps} = arrowProps
		return ( <ChevronRightRoundedIcon {...restArrowProps}> {children} </ChevronRightRoundedIcon> )
	}

	return (
		(items.length > 0) &&
			<Grid container sx={{
				mb: 2,
				boxShadow: 'none',
				'& .react-horizontal-scrolling-menu--separator': {
					color: '#11142D',
					p: 2,
				},
	
				'& .react-horizontal-scrolling-menu--wrapper': {
					display: '-webkit-box',
					flexWrap: 'unset',
					position: 'relative',
				},
			}}>
				<Grid item xl={12} lg={12} md={12} sm={12} xs={12}   sx ={{ paddingBottom: 4 }} className='carousel-container-text' >
					<Typography variant='h4' color='grey.900' textAlign='center'>{t('UHI Travel News and Trends')}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Carousel
						arrows
						focusOnSelect={false}
						infinite
						rtl='false'
						responsive={responsive}
						containerClass='carousel-container'
						itemClass='carousel-item'
						slidesToSlide={1}
						customRightArrow={<LeftArrowFix className='carouselIcon carouselLeftIcon'/>}
						customLeftArrow={<RightArrowFix className='carouselIcon carouselRightIcon'/>}
					>
						{items.map((item, i) => (
							<Card item={item} key={`test${i}`} itemId={`test${i}`} />
						))}
					</Carousel>
				</Grid>
			</Grid>
	)
}

export default NewsSection;