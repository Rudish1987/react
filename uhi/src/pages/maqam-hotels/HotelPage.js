import React from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// material
import { Container, Divider, Grid, Paper, Rating, Typography } from '@mui/material';

//
import Page from '../../components/Page';
import HotelSearchProvider from '../../context/hotel/SearchContext';
import ImageGallery from '../../components/ImageGallery';

const images = [
	{
		label: 'San Francisco – Oakland Bay Bridge, United States',
		imgPath:
			'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
	},
	{
		label: 'Bird',
		imgPath:
			'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
	},
	{
		label: 'Bali, Indonesia',
		imgPath:
			'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
	},
	{
		label: 'Goč, Serbia',
		imgPath:
			'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
	},
];

const HotelPage = ({ t }) => {
	const { hotelId } = useParams()
	const [searchParams] = useSearchParams();
	const location = useLocation();
	console.log(hotelId, location, searchParams)
	return (
		<Page title={t('title')}>
			<HotelSearchProvider>
				<Container maxWidth='xl'>
					<Grid container spacing={2} mb={3}>
						<Grid item xs={12}>
							<PaperContent>
								<Typography>hotel name</Typography>
								<Rating value={4} name="hotel-rating" readOnly size="small" />
							</PaperContent>
						</Grid>
					</Grid>

					<Grid container spacing={2} mb={3}>
						<Grid item container xs={12} sm={9} rowSpacing={3}>
							<Grid item xs={12}>
								<PaperContent>
									<ImageGallery images={images} />
								</PaperContent>
							</Grid>
							<Grid item xs={12}>
								<PaperContent>
									<Typography>Modify Search</Typography>
								</PaperContent>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={3}>
							<PaperContent>
								Location and other details
							</PaperContent>
						</Grid>
					</Grid>

					<Grid container spacing={2} mb={3}>
						<Grid item container xs={12} sm={9} rowSpacing={3}>
							<Grid item xs={12}>
								<PaperContent>
									<Typography>Occupancy</Typography>
									<Divider />
								</PaperContent>
							</Grid>
							<Grid item xs={12}>
								<PaperContent>
									tariff notes
								</PaperContent>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={3}>
							<PaperContent>
								Shopping cart
							</PaperContent>
						</Grid>
					</Grid>

				</Container>
			</HotelSearchProvider>
		</Page>
	);
}

const PaperContent = ({ children }) => {
	return (
		<Paper elevation={3} sx={{ p: 4, borderRadius: 0.5 }}>
			{children}
		</Paper>
	)
}

export default withTranslation('hotel_page')(HotelPage);
