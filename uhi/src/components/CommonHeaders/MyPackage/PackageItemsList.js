import React,{useState} from 'react'

// material
import {Typography, Stack, Grid,Box} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStoreState } from 'easy-peasy';
import AccommodationItemGrid from './AccommodationItemGrid';
import TransportationGrid from './TransportationGrid';
import GroundServiceGrid from './GroundServiceGrid'
import {FormatNumber} from '../../../helpers/utils'
import { useTheme } from '@mui/material/styles';

export const PackageItemsList = () => {

	const { t } = useTranslation();
	const theme = useTheme();

	const packagedetails = useStoreState(actions => actions.btoc.itineraryDetails.packagedetails)
	const currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)

	const [packageTotalAmount,setPackageTotalAmount]= useState(0);

	const changePackageTotalAmount = (newAmount) => {
		setPackageTotalAmount( prevState => prevState+newAmount)
	}

	return (
		<>
			{/* Item List */}
			<Stack sx={{ display: 'flex', alignItems: 'center', mt:2,mx:2 }}>
				<AccommodationItemGrid accommodationPackage={packagedetails.makkah} packageTotalAmount={packageTotalAmount} changePackageTotalAmount={changePackageTotalAmount} />

			</Stack>
			<Stack sx={{ display: 'flex', alignItems: 'center', mx:2 }}>
				<AccommodationItemGrid accommodationPackage={packagedetails.madinah} packageTotalAmount={packageTotalAmount} changePackageTotalAmount={changePackageTotalAmount}/>
			</Stack>
			<Stack sx={{ display: 'flex', alignItems: 'center', mx:2 }}>
				{Object.keys(packagedetails.transfer).length !==0 && <TransportationGrid transferPackage={packagedetails.transfer} changePackageTotalAmount= {changePackageTotalAmount}/>}
			</Stack>
			<Stack sx={{ display: 'flex', alignItems: 'center', mx:2 }}>
				{Object.keys(packagedetails.groundService).length !==0 && <GroundServiceGrid groundServicePackage={packagedetails.groundService} changePackageTotalAmount= {changePackageTotalAmount}/>}
			</Stack>

			{/* Total cost calculation*/}
			<Box>
				<Grid sx={{ display: 'flex', alignItems: 'center', mx:2}}>
					<Grid container
						direction="row" sx={{ mb:2 }}>
						<Grid item xs={6} lg={6} sx={{ display: 'flex', alignItems: 'center', justifyContent:'flex-start' }} >
							<Typography sx={{fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightBold, color: theme.palette.grey[800]}}>{t('Total')}</Typography>
						</Grid>
						<Grid item xs={6} lg={6} sx={{ display: 'flex', alignItems: 'center', justifyContent:'flex-end', color: '#282E36' }} >
							<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
								<Typography paragraph={true} sx={{ fontSize:14, mb:-1, color: 'Grey/900 - Main text', fontWeight:600 }}>{t(currency)}</Typography>
								<Typography paragraph={true} sx={{ fontSize:24, color: 'Grey/900 - Main text', fontWeight:600 }}>{`${FormatNumber(packageTotalAmount,2)}`}</Typography>
							</Stack>
						</Grid>

					</Grid>
				</Grid>
			</Box>

		</>
	)

}