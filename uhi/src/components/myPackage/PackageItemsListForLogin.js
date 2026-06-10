import React, {useEffect} from 'react'

// material
import { Typography, Stack, Grid, Box, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { FormatNumber, getRebookItinerary } from '../../helpers/utils';

import { useTranslation } from 'react-i18next'
import { useStoreState } from 'easy-peasy';
import Accommodation from './Accommodation';
import Transportation from './Transportation';
import GroundService from './GroundService';
import Visa from './Visa';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../css/bookingConfirmation.css';

export const PackageItemsListForLogin = ({ isExpandedPanel, isConfirmed, hasActions = true}) => {
	const { t } = useTranslation();
	const [expanded, setExpanded] = React.useState(hasActions ? isExpandedPanel : 'panelMyPackage');
	const packagedetails = useStoreState(actions => actions.btoc.itineraryDetails.packagedetails)
	const afterBookingpackagedetails = useStoreState(actions => actions.btoc.afterBookingpackagedetails)
	const defaulturrency = useStoreState(actions => actions.btoc.defaultCurrency)
	const rooms = useStoreState(s => s.btoc.filters.rooms);
	const passengerNum = rooms.reduce((a, b) => a + (b.adultsCount * b.room), 0);
	let Currency = defaulturrency;
	let ItineraryAmount = 0;
	let itineraryPackage;
	let passengerCount = afterBookingpackagedetails.groundService.paxCount ? afterBookingpackagedetails.groundService.paxCount : passengerNum;
	
	const reBookItinerary = getRebookItinerary(afterBookingpackagedetails, packagedetails, passengerCount);
	ItineraryAmount = reBookItinerary.itineraryAmount
	itineraryPackage = reBookItinerary.itinerary

	ItineraryAmount = isNaN(ItineraryAmount) ? 0 : ItineraryAmount
	useEffect(()=>{
		setExpanded(isExpandedPanel)
	}, [isExpandedPanel])

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	if (!hasActions) {
		return (
			<>
				<AccordionSummary className="invoice-tbl">
					<Grid container direction="row">
						<Grid item xs={12} lg={4}>
							<Typography className="invoice-tbl-title">{t('Invoice Details')}</Typography>
						</Grid>
					</Grid>
				</AccordionSummary>
				<AccordionDetails sx={{ px: 0, pb: 0, pt: 3 }}>
					<Stack sx={{ display: 'flex', alignItems: 'center', mt: 2, mx: 2 }}>
						<Accommodation accommodationPackage={afterBookingpackagedetails.makkah}  hasActions={hasActions} currency={Currency}  />
					</Stack>
					<Stack sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
						<Accommodation accommodationPackage={afterBookingpackagedetails.madinah}  hasActions={hasActions} currency={Currency}  />
					</Stack>
					<Stack sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
						{Object.keys(afterBookingpackagedetails.transfer).length !== 0 && <Transportation transferPackage={afterBookingpackagedetails.transfer} checkoutDate={afterBookingpackagedetails.groundService.dateTo}  hasActions={hasActions} currency={Currency} />}
					</Stack>
					<Stack sx={{ display: 'flex', alignItems: 'center', mt: 2, mx: 2 }}>
						{Object.keys(afterBookingpackagedetails.groundService).length !== 0 && <GroundService groundServicePackage={afterBookingpackagedetails.groundService}  hasActions={hasActions} currency={Currency} />}
					</Stack>
					<Stack sx={{ display: 'flex', alignItems: 'center', mt: 2, mx: 2 }}>
						{Object.keys(afterBookingpackagedetails.visa).length !== 0 && <Visa visaPackage={afterBookingpackagedetails.visa}  hasActions={hasActions} currency={Currency} passengerCount={passengerCount}/>}
					</Stack>

					{/* Total cost calculation*/}
					<Box sx={{ bgcolor: '#F5F5F5', pt: 2 }}>
						<Grid sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
							<Grid container
								direction="row" sx={{ mb: 2 }}>
								<Grid item xs={10} lg={10} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} >
									<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text' }}>{t('Total')}</Typography>
								</Grid>
								<Grid item xs={2} lg={2} sx={{ display: 'flex', alignItems: 'center', color: '#282E36' }} >
									<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
										<Typography paragraph={true} sx={{ fontSize: 14, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(Currency)}</Typography>
										<Typography paragraph={true} sx={{ fontSize: 24, color: 'Grey/900 - Main text', fontWeight: 600 }}>{FormatNumber(ItineraryAmount, 2)}</Typography>
									</Stack>
								</Grid>

							</Grid>
						</Grid>
					</Box>
				</AccordionDetails>
			</>
		)
	}
	
	return (
		<>
			<Accordion sx={{ border: 1, borderColor: '#E0E0E0' }} expanded={expanded === 'panelMyPackage'} onChange={handleChange('panelMyPackage')} >
				<AccordionSummary
					sx={{ width: '100%', backgroundColor: '#F5F5F5' }}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Grid container direction="row">
						<Grid item xs={12} lg={4} sx={{ display: 'flex', alignItems: 'flex-end', color: 'Secondary/Dark' }} >
							<Typography sx={{ fontWeight: 600, fontSize: '20px', fontFamily: 'Montserrat' }}>{t('My package')}</Typography>
						</Grid>

						<Grid item xs={4} lg={8} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'end', pb: 0.25 }}>
							{!expanded && <><Typography sx={{ fontWeight: 600, fontSize: 13 }}>{t(Currency)}&nbsp;</Typography><Typography sx={{ display: 'flex', fontWeight: 600 }}>{FormatNumber(ItineraryAmount, 2)}</Typography></>}
						</Grid>
					</Grid>
				</AccordionSummary>
				<AccordionDetails sx={{ px: 0, pb: 0, pt: 3 }}>
					<Stack sx={{ display: 'flex', alignItems: 'center', mt: 2, mx: 2 }}>
						<Accommodation accommodationPackage={itineraryPackage.makkah} currency={Currency} />
					</Stack>
					<Stack sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
						<Accommodation accommodationPackage={itineraryPackage.madinah} currency={Currency} />
					</Stack>
					<Stack sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
						<Transportation transferPackage={itineraryPackage.transfer} checkoutDate={itineraryPackage.transfer.dateTo} currency={Currency}/>
					</Stack>
					<Stack sx={{ display: 'flex', alignItems: 'center', mt: 2, mx: 2 }}>
						<GroundService groundServicePackage={itineraryPackage.groundService} currency={Currency}/>
					</Stack>
					<Stack sx={{ display: 'flex', alignItems: 'center', mt: 2, mx: 2 }}>
						<Visa visaPackage={itineraryPackage.visa} isConfirmed={isConfirmed}  passengerCount={passengerCount} currency={Currency}/>
					</Stack>

					{/* Total cost calculation*/}
					<Box sx={{ bgcolor: '#F5F5F5', pt: 2 ,borderTop:'1px solid #E0E0E0'}}>
						<Grid sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
							<Grid container
								direction="row" sx={{ mb: 2 }}>
								<Grid item xs={10} lg={10} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', maxWidth: '82.333333% !important' }} >
									<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text' }}>{t('Total')}</Typography>
								</Grid>
								<Grid item xs={2} lg={2} sx={{ display: 'flex', alignItems: 'center', color: '#282E36' }} >
									<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
										<Typography paragraph={true} sx={{ fontSize: 14, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(Currency)}</Typography>
										<Typography paragraph={true} sx={{ fontSize: 24, color: 'Grey/900 - Main text', fontWeight: 600 }}>
											{FormatNumber(ItineraryAmount, 2)}
										</Typography>
									</Stack>
								</Grid>

							</Grid>
						</Grid>
					</Box>
				</AccordionDetails>
			</Accordion>
			{/* Item List */}


		</>
	)

}