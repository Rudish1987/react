import React, { useState, useEffect } from 'react';

// material
import { Box, Grid, Typography, ButtonBase, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import TransferResultsRow from './TransferResultRow';
import { useLocale } from '../../../../context/LocaleContext';
import Constants from '../../../../helpers/constants';
import { FormatNumber } from '../../../../helpers/utils';

const Img = styled('img')({
	margin: 'auto',
	display: 'block',
	maxWidth: '100%',
	maxHeight: '100%',
	borderRadius: 1,
});

const ResultRow = ({ transfer, currency, onBookClick, disableSelect }) => {
	const { t } = useTranslation();
	const theme = useTheme();

	const handleBookClick = (parameters) => {
		onBookClick({ ...parameters, transfer: transfer });
	};
	const { locale } = useLocale();
	const [showMore, setShowMore] = useState(null);
	const [showLess, setShowLess] = useState(null);
	const [vehicleResults, showVehicleResults] = useState([]);
	const [completeResults, setCompleteResults] = useState([]);

	useEffect(() => {
		const loadInitialVehicles = () => {
			const vehicles = [].concat.apply([], transfer);
			if (vehicles.length > 2) {
				setShowMore(true);
			}
			setCompleteResults(vehicles);
			showVehicleResults(vehicles.slice(0, 2));
		};

		loadInitialVehicles();
	}, [transfer]);

	const handleShowMore = () => {
		showVehicleResults(completeResults);
		setShowMore(false);
		setShowLess(true);
	};

	const handleShowLess = () => {
		showVehicleResults(completeResults.slice(0, 2));
		setShowMore(true);
		setShowLess(false);
	};
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
						<Grid item xs>
							<ButtonBase sx={{ position: 'relative' }}>
								<Box
									className="img-size"
									component={Img}
									src={transfer ? transfer[0].transferTypeImage : ''}
									alt={transfer.transferName}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = '/static/images/car.png';
									}}
								/>
							</ButtonBase>
						</Grid>
					</Grid>
					<Grid item container sm direction='column' spacing={2} xs={9}>
						<Grid item xs sm container>
							<Grid item xs>
								<Grid item xs container direction='row' wrap='nowrap'>
									<Typography sx={{fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightSemiBold, color: theme.palette.grey[800]}} gutterBottom component='div'>
										{transfer
											? locale.value == Constants.LANGUAGES_AR
												? transfer[0].transferTypeNameAR
												: transfer[0].vehicleBrand
											: ''}
									</Typography>
								</Grid>
								<Grid item xs className="theme-font">
									{transfer
										? locale.value == Constants.LANGUAGES_AR
											? transfer[0].companyNameAR
											: transfer[0].companyName
										: ''}
								</Grid>
								<Grid
									item
									xs
									sx={{
										backgroundColor: '#E0E0E0',
										width: '98px',
										height: '36px',
										paddingTop: '10px',
										fontSize: '12px',
										fontWeight: '600',
										marginTop: '10px',
										borderRadius: '5px',
										textAlign: 'center',
										fontFamily: 'Montserrat, sans-serif !important'
									}}
								>
									{transfer
										? locale.value == Constants.LANGUAGES_AR
											? transfer[0].categoryNameAR
											: transfer[0].categoryName
										: ''}
								</Grid>
							</Grid>
							<Grid item xs textAlign='right'>
								<Typography sx={{fontSize: theme.typography.body2, fontWeight: theme.typography.fontWeightRegular, color: theme.palette.grey[800]}} component='div'>
									{t('From')}
								</Typography>
								<Typography sx={{fontSize: theme.typography.subtitle1, fontWeight: theme.typography.fontWeightSemiBold, color: theme.palette.grey[800]}} component='div'>
									{t(currency)} {transfer ? FormatNumber(transfer[0].total, 2) : 0}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs wrap='nowrap' sm container direction='column'>
							{vehicleResults.map((transfersVehicle, idx) => (
								<TransferResultsRow
									key={idx}
									transfer={transfersVehicle}
									currency={currency}
									onBookClick={handleBookClick}
									disableSelect={disableSelect}
								/>
							))}
							{showMore && (
								<Grid item xs align='center'>
									<Button
										variant='text'
										size='medium'
										endIcon={<ArrowDropDown />}
										onClick={handleShowMore}
										sx={{ color: 'black' }}
									>
										{t('More Vehicles')}
									</Button>
								</Grid>
							)}
							{showLess && (
								<Grid item xs align='center'>
									<Button
										variant='text'
										size='medium'
										endIcon={<ArrowDropUp />}
										onClick={handleShowLess}
										sx={{ color: 'black' }}
									>
										{t('Less Vehicles')}
									</Button>
								</Grid>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};

export default React.memo(ResultRow);