import * as React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function HeroBanner() {
	const { t } = useTranslation();
	const isFullWidth = useMediaQuery((theme) => theme.breakpoints.only('sm'));
	return (
		<Box className='heroBannerSection paddingTop120 paddingBottom120 box-body-flex'>
			<Container className='body-container-margin'>
				<Grid container spacing={4} direction="column">
					<Grid item lg={12} xl={12} md={12} sm={12} xs={12} columns={{ md: 12 }}>
						<Typography variant="h1" color="grey.0" fontWeight='bold'>
							{t('Unveil the Treasures Indo-Arabian')}
						</Typography>
						<Typography variant="h1" color="grey.0" fontWeight='bold'>
							{t('Waters with WanderQuest')}
						</Typography>
						<Typography variant="h5" color="grey.0" fontWeight='default'>
							{t('Your B2B travel partner & Gateway to Saudi Arabia')}
						</Typography>
					</Grid>
					<Grid item spacing={4} xs={12} sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', sm: 'row'} }}>
						<Grid item xs={6} sm={5} md={3} sx={{ display: 'grid' }} className="padTop-32">
							<Button variant='outlined' size='large' fullWidth={isFullWidth} color='primary'>
								{t('REQUEST A FREE DEMO')}
							</Button>
						</Grid>
						<Grid item xs={6} sm={5} md={3} sx={{ display: 'grid' }} className="padTop-32">
							<Button variant='contained' size='large' fullWidth={isFullWidth} color='primary'>
								{t('JOIN US')}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container >
		</Box>
	);
}