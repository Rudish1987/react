import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Box, Paper, Typography, Link } from '@mui/material';
import { styled } from '@mui/styles'

//import { ScrollMenu } from 'react-horizontal-scrolling-menu';
//import { LeftArrow, RightArrow } from './Arrows';
import './carousel.css'

// import { newsList } from '../../api/NewsApiUrl';
import { postsList } from '../../api/NewsApiUrl';
import { useLocale } from '../../context/LocaleContext';
import { useTranslation } from 'react-i18next';
import Constants from '../../helpers/constants';

const B = styled(Box)(({ theme }) => ({
	width: 420,
	height: 400,
	[theme.breakpoints.down('sm')]: {
		width: 350
	},
	backgroundColor: '#F8F8F8',
	padding: '32px',
	borderColor: '1px solid #DDDDDD'
}))

const Card = ({ item }) => {
	const { t } = useTranslation();
	return (
		<B component='div'>
			<Link underline="hover" key="1" target="_blank" href={Constants.BLOG_POST_URL + item.slug}>
				<img src={item.media.wixMedia.image.url ?? ''} alt='' className="carosel-img" />
			</Link>
			<Box sx={{ p: 1, wordWrap: 'wrap' }} className="slideContent-text">
				<Typography variant='body2' className="newssection-title">
					{item.title.length < 60 ? `${item.title}` : `${item.title.substring(0, 58)}...`}
				</Typography>
				<Typography variant='body2' className="newssection-content">
					{item.excerpt}
				</Typography>
				<Link underline="hover" key="1" className="breadcrums-link readmore-link" target="_blank" href={Constants.BLOG_POST_URL + item.slug}>
					{t('Read More')}
				</Link>
			</Box>
		</B>
	)
}
const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 5
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};
const NewsSection = () => {
	const { t } = useTranslation();
	// const [items] = useState(news)
	const { locale } = useLocale();
	const [items, setallData] = useState([]);


	useEffect(() => {
		let isMounted = true;
		postsList().then((res) => {
			if( res.status == undefined ){
				if(isMounted) {
					setallData(res.posts)
				}
			}
		});
		return () => {
			isMounted = false;
		}
	}, [locale])

	return (
		<Paper elevation={3} sx={{
			paddingLeft: '46px',
			paddingRight: '46px',
			minHeight: 400,
			mb: 2,
			py: 3,
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
			<Typography sx={{ fontSize: 24, mb: 3 }} variant={'h3'}>
				{t('News Center')}
			</Typography>
			{(items.length > 0) &&
			<Carousel
				arrows
				centerMode={false}
				focusOnSelect={false}
				infinite
				itemClass="slideContent"
				rtl={false}
				responsive={responsive}>
				{items.map((item, i) => (
					<Card item={item} key={`test${i}`} itemId={`test${i}`} />
				))}
			</Carousel>
			}
			{(items.length == 0) &&
				<Typography align='center'>{t('No data found')}</Typography>
			}
		</Paper>
	)
}

export default NewsSection;