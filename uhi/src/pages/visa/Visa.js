
import React, { useEffect } from 'react';
import { Typography, Grid, Box, Container, Button } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import { useTranslation } from 'react-i18next';
import FilterList from '../../components/visa/FilterList';
import { useNavigate } from 'react-router-dom';
import {useStoreActions, useStoreState} from 'easy-peasy';
import Constants from '../../helpers/constants';
import {useCurrencyConvertionRate} from '../../context/booking/hooks';

export default function Visa() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const resetVisaTravelerState = useStoreActions(actions => actions.btob.visa.resetVisaTravelerState)
	const setValidItineraryUpto = useStoreActions(actions => actions.btob.visa.setValidItineraryUpto)
	const setValidItinerary = useStoreActions(actions => actions.btob.visa.setValidItinerary)
	const getCurrencyRates = useStoreActions(actions => actions.btob.visa.getCurrencyRates)
	const loggedinUser = useStoreState(s => s.user)
	const { getCurrencyRate } = useCurrencyConvertionRate();

	const redirectToTravellerlist = () => {
		navigate('/visa/traveler-list', { state: { itineraryDetails: {} } });
	}

	useEffect(() => {
		// reseting all inner page state
		resetVisaTravelerState();

		// reseting itinerary max add / edit / delete date
		setValidItineraryUpto(null);
		setValidItinerary(true);

		// if credit user fetch currency convertion rate
		const fetchCurrencyConversion = async () => {
			await getCurrencyRates(getCurrencyRate());
		}
		if( Constants.CUSTOMER_TYPE_CREDIT == loggedinUser.user.paymentType ){
			fetchCurrencyConversion()
		}
	}, []);

	return (
		<>
			<Box className="box-body-flex paddingTop32 paddingBottom32">
				<Container className='body-container-inner'>
					<Grid className='Visasection'>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={9}>
								<Typography variant='h4' color='grey.900'>
									{t('Visa for Saudi Arabia Kingdom')}
								</Typography>
								<Typography variant='body2' color='grey.900'>
									{t('UHI offers a streamlined system forrequesting KSA visas for group travel,simplifying the application process.')}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={3} display='flex' sx={{ justifyContent: { xs: 'left', lg: 'right', md: 'right', sm: 'right' } }}>
								<Button
									variant="contained"
									fullWidth
									size='large'
									type='submit'
									onClick={redirectToTravellerlist}
								>
									{t('REQUEST VISAS')}
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<FilterList />
				</Container>
			</Box >
		</>
	);
}
