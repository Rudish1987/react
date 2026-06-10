import * as React from 'react';
import { Box, Container, Grid, Typography,Stack } from '@mui/material';
import Breadcrumbs from '../Breadcrumbs';
import Page from '../Page';
import StaticContentPageSkeleton from '../skeleton/StaticContentPageSkeleton';
import { styled } from '@mui/material/styles';

export default function StaticContent({ data }) {
	const BackgroundImgStyle = styled('div')(({ theme }) => ({
		backgroundImage: 'linear-gradient(90.02deg, rgba(19, 30, 87, 0.6) 0.02%, rgba(19, 30, 87, 0) 100%),url(' + data.image + ')',
		color: theme.palette.grey[0],
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundColor: '#ffffff!important'
	}));
	return (
		<>
			<Page title={typeof (data) !== 'undefined' ? data.title : ''}>
				{typeof (data) == 'undefined' ? (
					<StaticContentPageSkeleton></StaticContentPageSkeleton>
				) : (
					<>
						<BackgroundImgStyle>
							<Box className="heroBannerSection box-body-flex">
								<Container className="body-container-margin paddingTop120" >
									<Typography data-testid='dataBannerTitle' variant={'h2'} sx={{ paddingY: 15 }}>
										{data.bannerTitle}
									</Typography>
								</Container>
							</Box>
						</BackgroundImgStyle>
						<Box className='box-body-flex'>
							<Container className='body-container-margin paddingTop80'>
								<Breadcrumbs breadcrumbsTitle={data.title} />

								<Typography data-testid='dataTitle' sx={{ pt: 3 }} variant={'h2'} color={'grey.900'}>
									{data.title}
								</Typography>
								<Grid >
									<Stack data-testid='dataContent' color={'grey.900'} dangerouslySetInnerHTML={{ __html: data.content }}></Stack>
								</Grid>
							</Container >
						</Box>
					</>
				)}
			</Page>
		</>
	);
}