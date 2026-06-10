import React, {useEffect} from 'react';
import {Box, Container, Grid} from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import CreditCardPayment from '../../components/payment/CreditCardPayment'
import CreditPayment from '../../components/payment/CreditPayment'
import Itenerary from '../../components/visa/Itinerary'
import Constants from '../../helpers/constants'
import {useStoreState} from 'easy-peasy';
import { useLocation, useNavigate } from 'react-router-dom';
import SnackbarComponent from '../../components/common/Snackbar';
import {useCheckLoggedInUser} from '../../context/btob/authHooks';
import LandingSkeleton from '../../components/skeleton/LandingSkeleton';

export default function Payment() {
	let itineraryDetails = {}
	let visaTotalFee = '0.00'
	const location = useLocation();
	if(location.state !== null) {
		itineraryDetails = location.state.itineraryDetails ?? {};
		visaTotalFee = location.state.visaTotalFee ?? '0.00';
	}
	const navigate = useNavigate();
	const loggedinUser = useStoreState(s => s.user)

	const { CheckLoggedInUser } = useCheckLoggedInUser()
	const [isCreditCardLoading, setCreditCardLoading] = React.useState(false);

	const [snackAlertOpen, setSnackAlertOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [typeOfMessage, settypeOfMessage] = React.useState('');

	const goBackToTravelerList = () => {
		navigate(-1);
	}

	const onApiError = (message) => {
		setSnackAlertOpen(true);
		setSnackbarMessage(message);
		settypeOfMessage('error');
	}

	useEffect(() => {
		// redirect to visa index page if someone try open this page directly from URL
		if(Object.keys(itineraryDetails).length === 0) {
			navigate('/visa')
		}
		//update user details with credit amoount details for credit users
		const checkAuthUser = async () => {
			const isLoggedIn = await CheckLoggedInUser();
			if(isLoggedIn) {
				setCreditCardLoading(true)
			} else {
				navigate('/')
			}
		}
		checkAuthUser()
	}, [])

	if (isCreditCardLoading) return (
		<>
			<Box className="box-body-flex paddingTop32 paddingBottom32">
				<Container className="body-container-inner">
					<Itenerary itineraryDetails={itineraryDetails} />
					<Grid container>
						<Grid item xs={12}>
							{snackAlertOpen && <SnackbarComponent open={snackAlertOpen} onClose={() => setSnackAlertOpen(false)} message={snackbarMessage} typeOfMessage={typeOfMessage} />}
						</Grid>
					</Grid>
					<Box className='mar-top-bottm'>
						{Constants.CUSTOMER_TYPE_CC == loggedinUser.user.paymentType && <CreditCardPayment visaTotalFee={visaTotalFee} goBackToTravelerList={goBackToTravelerList} onApiError={onApiError} />}

						{Constants.CUSTOMER_TYPE_CREDIT == loggedinUser.user.paymentType && <CreditPayment visaTotalFee={visaTotalFee} goBackToTravelerList={goBackToTravelerList} onApiError={onApiError}/>}
					</Box>
				</Container>
			</Box >
		</>);
	return (<LandingSkeleton/>);
}