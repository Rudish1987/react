import React from 'react';
// material
import { Box, Paper, Typography, Container, Grid } from '@mui/material';
// components
import Page from '../components/Page';
import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/guests/Footer';
import StaticContentPageSkeleton from '../components/skeleton/StaticContentPageSkeleton'

function StaticContent({ data }) {
	return (
		<Page title={typeof (data) !== 'undefined' ? data.title : ''}>
			{typeof (data) == 'undefined' ? (
				<StaticContentPageSkeleton></StaticContentPageSkeleton>
			) : (

				<Container maxWidth='false' sx={{ paddingLeft: '0px!important', paddingRight: '0px!important' }} >
					<Paper elevation={3} sx={{
						backgroundImage: 'linear-gradient(90.02deg, rgba(19, 30, 87, 0.6) 0.02%, rgba(19, 30, 87, 0) 100%),url(' + data.image + ')',
						minHeight: 400,
						backgroundRepeat: 'round',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-end',
						borderRadius: '0px',
						color: '#ffffff',


					}}>
						<Container maxWidth='xl'>
							<Typography data-testid='dataBannerTitle' variant={'h2'} sx={{ pb: 10, pl: 9 }}>
								{data.bannerTitle}
							</Typography>
						</Container>
					</Paper>

					<Container maxWidth='xl'>
						<Paper elevation={3} sx={{
							px: 9,
							borderRadius: '0px',
							paddingTop: '20px',
							paddingBottom: '45px',
							boxShadow: 'none'
						}}>
							<Breadcrumbs breadcrumbsTitle={data.title}/>

							<Typography data-testid='dataTitle' sx={{ pt: 3 }} variant={'h2'}>
								{data.title}
							</Typography>
							<Grid >
								<Box data-testid='dataContent' dangerouslySetInnerHTML={{ __html: data.content }}></Box>
							</Grid>
						</Paper>
					</Container>


					{/*<div dangerouslySetInnerHTML={{__html: data.content}} />*/}
				</Container>
			)}
			<Footer/>
		</Page>
	);
}

export default StaticContent;