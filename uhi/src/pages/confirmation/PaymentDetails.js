import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Container } from '@mui/material'
import Page from '../../components/Page';
import Payment from '../../components/confirmation/Payment'
import AgentCredit from '../../components/confirmation/AgentCredit'
import { PassengerStepperHeader } from '../../components/CommonHeaders/PassengerStepperHeader'
import { PackageItemsListForLogin } from '../../components/myPackage/PackageItemsListForLogin';
import Constants from '../../helpers/constants'
import { useStoreState } from 'easy-peasy';

import {useCheckLoggedInUser} from '../../context/authHook'

const PaymentDetails = () => {
	const { t } = useTranslation();
	let currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)
	const totalItineraryAmount = useStoreState(s => s.btoc.itineraryDetails.itineraryAmount)
	const loggedinUser = useStoreState(s => s.user)
	const defaultCurrency = useStoreState(s => s.btoc.defaultCurrency)
	if(!currency) {
		currency = defaultCurrency;
	}

	const {CheckLoggedInUser} = useCheckLoggedInUser()

	useEffect(() => {
		//update user details with credit amoount details for credit users
		const checkAuthUser = async () => {
			await CheckLoggedInUser()
		}
		if( Constants.CUSTOMER_TYPE_CREDIT == loggedinUser.user.paymentType ){
			checkAuthUser()
		}
		
	}, [])

	return (
		<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
			<Page title={t('paymentDetails.title')}>
				<PassengerStepperHeader stepLevel={t(Constants.STEP_PAYMENT)} />
				<Grid className="payment-wrapper" container justifyContent='center'>
					<Grid item xs={10}>
						<PackageItemsListForLogin totalItineraryAmount={totalItineraryAmount} passCurrency={currency} isExpandedPanel={false} isSaved={true}/>
					</Grid>

					{ Constants.CUSTOMER_TYPE_CC == loggedinUser.user.paymentType && <Payment isSaved={true}  passCurrency={currency}/> }

					{ Constants.CUSTOMER_TYPE_CREDIT == loggedinUser.user.paymentType && <AgentCredit passCurrency={currency}/> }
				</Grid >

			</Page>
		</Container>
	);
}

export default PaymentDetails;