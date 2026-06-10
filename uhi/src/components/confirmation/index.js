import React from 'react'
import { Box, Grid } from '@mui/material'
import { Summary } from '../CommonHeaders/Summary';
import { StepperHeader } from '../CommonHeaders/StepperHeader';
import Constants from '../../helpers/constants'
import { PackageItemsListForLogin } from '../myPackage/PackageItemsListForLogin';
import { useParams } from 'react-router-dom'
import LoginForm from '../forms/LoginForm';
// import RegisterForm from '../forms/RegisterForm';
// import VerficationForm from '../forms/VerficationForm';
import { useStoreState } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';

const Confirmation = () => {
	const { t } = useTranslation();
	const currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)
	const totalItineraryAmount = useStoreState(s => s.btoc.itineraryDetails.itineraryAmount)
	// const user = useStoreState(s => s.user);

	const isAuth = useStoreState(s => s.isAuth);

	const { step } = useParams()
	let isExpand = step === 'login' ? 'panelMyPackage' : 'false'

	return (
		<Box sx={{ backgroundColor: '#F5F5F5', p: 0 }}>
			<Grid container spacing={2} sx={{ bgcolor: '#fff', pl: 6, pt: 1, pb: 1, borderBottom: '2px solid #EEEEEE' }}>
				<Grid item xs={12} lg={7}>
					<Summary />
				</Grid>
			</Grid>
			<StepperHeader stepLevel={t(Constants.STEP_CONFIRMATION)} />
			<Grid sx={{ p: 2, backgroundColor: 'white' }} container justifyContent='center' spacing={2}>
				<Grid item xs={10}>
					<PackageItemsListForLogin totalItineraryAmount={totalItineraryAmount} passCurrency={currency} isExpandedPanel={isExpand} />
				</Grid>
				{isAuth && <Grid item xs={10} sx={{textAlign: 'center', m:10}}><CircularProgress /></Grid>}
				{!isAuth && <Grid item xs={10} sx={{ my: 2 }}>
					<LoginForm />
					{/* {step === 'login' && <LoginForm />}
					{step === 'register' && <RegisterForm />}
					{step === 'verification' && <VerficationForm />} */}
				</Grid>}
			</Grid>
		</Box>
	)
}

export default Confirmation
