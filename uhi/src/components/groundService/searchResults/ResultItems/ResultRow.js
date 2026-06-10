import React, { useEffect, useState } from 'react';

// material
import { Box, Grid, Typography, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import Constants from '../../../../helpers/constants';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../../../context/LocaleContext';
import GroundServiceResultRow from './GroundServiceResultRow';
import { FormatNumber } from '../../../../helpers/utils';

const Img = styled('img')({
	margin: 'auto',
	display: 'block',
	maxWidth: '100%',
	maxHeight: '100%',
	borderRadius: 1,
});

const ResultRow = ({
	groundService,
	currency,
	totalPax,
	totalStay,
	onBookClick,
	disableSelect,
}) => {
	const [items, setItems] = useState([]);
	let groundServ = groundService[0] ?? groundService;
	const tourCount = groundServ.package.length;
	const { t } = useTranslation();
	const { locale } = useLocale();

	const handleBookClick = (parameters) => {
		onBookClick({ ...parameters, tour: groundService });
	};

	useEffect(() => {
		const tourResults =
			tourCount > 0
				? tourCount > 1
					? groundServ.package
					: [groundServ.package]
				: [];
		setItems(tourResults.slice(0, Constants.PERPAGE));
	}, [groundService]);

	return (
		<Grid item xs={12}>
			<Box
				sx={{
					padding:'16px 16px 16px 0px',
					margin: 'auto',
					flexGrow: 1,
					backgroundColor: '#fff',
					border: '1px solid grey',
					borderRadius: 1,
				}}
			>
				<Grid item container sm spacing={2} xs={12}>
					<Grid item container direction='column' xs={3}>
						<Grid item xs sx={{ textAlign: 'center' }}>
							<ButtonBase sx={{ position: 'relative' }}>
								<Box
									className="img-size"
									component={Img}
									src={
										groundServ.images.tourImages.image ? (Array.isArray(groundServ.images.tourImages.image) ? groundServ.images.tourImages.image[0] : groundServ.images.tourImages.image) : ''
									}
									alt={groundServ.tourName}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = '/static/images/GS_no_image.png';
									}}
								/>
							</ButtonBase>
						</Grid>
					</Grid>
					<Grid item container sm direction='column' spacing={2} xs={9}>
						<Grid item xs sm container>
							<Grid item xs>
								<Grid item xs container direction='row' wrap='nowrap'>
									<Typography gutterBottom variant='h6' component='div'>
										{locale.value == Constants.LANGUAGES_AR
											? groundServ.tourNameAR
											: groundServ.tourName}
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs textAlign='right'>
								<Typography variant='body2' component='div'>
									{t('From')}
								</Typography>
								<Typography variant='h4' component='div'>
									{t(currency)} {FormatNumber(groundServ.from, 2)}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs wrap='nowrap' sm container direction='column'>
							{items.map((tour) => {
								return (
									<GroundServiceResultRow
										key={tour.packageID}
										tourDet={tour}
										currency={currency}
										totalPax={totalPax}
										totalStay={totalStay}
										onBookClick={handleBookClick}
										disableSelect={disableSelect}
									/>
								);
							})}
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};

export default React.memo(ResultRow);
