import * as React from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';
import KSA from '../../../Assets/KSA.svg'
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../../context/LocaleContext';


const PromoSection = () => {
	const { locale } = useLocale();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const isFullWidth = useMediaQuery((theme) => theme.breakpoints.only('xs'));
	const redirectToJoinUs = () => {
		navigate('/join-us#Company-Info');
	}
	const redirectToRequestDemo = () => {
		navigate('/request-demo');
	}

	return (
		<Grid container className="promoGrid">
			<Grid item xs={12} lg={3} xl={3} md={3} sm={3}>
				<img src={KSA} alt="" className="ksaImage" />
			</Grid>
			<Grid item xs={0} lg={1} xl={1} md={1} sm={1}></Grid>
			<Grid item xs={12} lg={8} xl={8} md={8} sm={8} sx={{ paddingX: 5 }} className="PromoContentSection">
				<Typography color='grey.900' gutterBottom variant="h4">
					{t( isFullWidth ? 'Contact us to discover how we can tailor our solutions' : 'Contact us to discover how we can tailor our solutions to meet your unique needs.' )}
				</Typography>
				<Typography color='grey.800' gutterBottom variant="body1">
					{t('Join UHI today and receive a complimentary access pass to our exclusive industry insights and trends reports. Stay ahead of the competition, make data-driven decisions, and elevate your agency\'s success.')}
				</Typography>
				<Typography color='grey.900' gutterBottom variant="body1">
					{t('Take the first step towards transformative growth!')}
				</Typography>
				<Typography color='grey.900' gutterBottom variant="h6">
					{t('For a limited time only!!!')}
				</Typography>

				<Box className="promoButtons">
					<Button onClick={redirectToRequestDemo} sx={{ ...(locale.value === 'ar' && { marginLeft: '20px',marginRight: '0px' }),...(locale.value === 'en' && { marginLeft: '0px',marginRight: '30px' }) }} className="promoDemo" variant='outlined' size='large' fullWidth={isFullWidth} color='primary'>
						{t('REQUEST A FREE DEMO')}
					</Button>

					{/*<Button className="joinusDemo" onClick={redirectToJoinUs} variant='contained' size='large' fullWidth={isFullWidth} color='primary'>*/}
					<Button className="joinusDemo" onClick={redirectToJoinUs} sx={{ ...(locale.value === 'ar' && { marginRight: '0px' }) }} variant='contained' size='large' fullWidth={isFullWidth} color='primary'>
						{t('JOIN US')}
					</Button>
				</Box>
			</Grid>
		</Grid>
	)
}

export default PromoSection;