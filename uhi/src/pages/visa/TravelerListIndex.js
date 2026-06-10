import React, { useEffect, useState } from 'react';
import { Grid, Box, Container, Button } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import Itenerary from '../../components/visa/Itinerary'
import TravelerList from '../../components/visa/TravelerList';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useGetRequestVisaList } from '../../context/visa/hooks';
import AlertSnackbarComponent  from '../../components/common/AlertSnackbar';
import Constants from '../../helpers/constants';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import PanToolIcon from '@mui/icons-material/PanTool';
import PendingIcon from '@mui/icons-material/Pending';
import { useLocale } from '../../context/LocaleContext';
import {titleCase} from '../../helpers/utils';
import SnackbarComponent from '../../components/common/Snackbar';

export default function TravelerListIndex() {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const location = useLocation();
	let itineraryDetails = {};
	if(location.state !== null) {
		itineraryDetails = location.state.itineraryDetails ?? {};
	}

	const resetPassportData = useStoreActions(actions => actions.btob.visa.resetPassportData);
	const getRequestList = useStoreActions(actions => actions.btob.visa.getRequestList);
	const requestList = useStoreState(s => s.btob.visa.requestList);
	const travelersList = useStoreState(s => s.btob.visa.travelersList);
	const isValidItinerary = useStoreState(s => s.btob.visa.isValidItinerary);
	const { getRequestVisaList } = useGetRequestVisaList();
	const confirmMsg = useStoreState(s => s.btob.visa.confirmMsg)
	const setConfirmMsg = useStoreActions(actions => actions.btob.visa.setConfirmMsg)

	let navigate = useNavigate();
	const [requestState, setRequestState] = useState(0);
	const [alertCount, setAlertCount] = useState({});
	const [pendingSnackAlertOpen, setPendingSnackAlertOpen] = React.useState(true);
	const [incompleteSnackAlertOpen, setIncompleteSnackAlertOpen] = React.useState(true);
	const [deniedSnackAlertOpen, setDeniedSnackAlertOpen] = React.useState(true);

	const [snackAlertOpen, setSnackAlertOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [typeOfMessage, settypeOfMessage] = React.useState('');

	useEffect(() => {
		// redirect to visa index page if someone try open this page directly from URL
		if(itineraryDetails === false) {
			navigate('/visa')
		}

		setRequestState(0);
		const requestList = async () => {
			await getRequestList(getRequestVisaList());
			setRequestState(1);
		}
		if(Object.keys(itineraryDetails).length === 0 || itineraryDetails.type == Constants.VISA_SAFA_STATUS_CONFIRM) {
			requestList()
		}
	},[])

	useEffect(() => {
		if(Object.keys(travelersList).length > 0) {
			let alertList = {
				'incomplete': 0,
				'valid': 0,
				'approved': 0,
				'denied': 0,
				'paid': 0,
				'rejected': 0,
			}
			travelersList.map((list) => {
				if(list.status == Constants.B2B_VISA_STATUS_INCOMPLETE) {
					alertList.incomplete += 1;
				}
				if(list.status == Constants.B2B_VISA_STATUS_VALID) {
					alertList.valid += 1;
				}
				if(list.status == Constants.B2B_VISA_STATUS_APPROVED) {
					alertList.approved += 1;
				}
				if(list.status == Constants.B2B_VISA_STATUS_DENIED) {
					alertList.denied += 1;
				}
				if(list.status == Constants.B2B_VISA_STATUS_PAID) {
					alertList.paid += 1;
				}
				if(list.status == Constants.B2B_VISA_STATUS_REJECTED) {
					alertList.rejected += 1;
				}
			})
			setAlertCount(alertList)
		}
	}, [travelersList]);

	useEffect(() => {
		if(confirmMsg.status) {
			setSnackAlertOpen(true);
			setSnackbarMessage(confirmMsg.description);
			settypeOfMessage(confirmMsg.type);
			setConfirmMsg({})
		}
	}, [confirmMsg]);

	const addTravelerRoute = () => {
		if (requestState == 1 && Object.keys(requestList).length == 0) {
			setSnackAlertOpen(true);
			setSnackbarMessage(t('Currently we are facing some issue. Please try after sometime.'));
			settypeOfMessage('error');
		} else {
			resetPassportData()
			navigate('/visa/add-traveller', {state: {passengerId: 0, itineraryId: itineraryDetails.itineraryId ?? 0 }});
		}
	}

	const fetchPaidTextAlert = alertCount.paid && alertCount.paid + ' ' + t('Visa request have been sent and pending for government approval')
	const fetchIncompleteTextAlert = alertCount.incomplete && alertCount.incomplete + ' ' + t('Visa requests are incomplete yet')
	const fetchDeniedTextAlert = alertCount.denied && alertCount.denied + ' ' + t('Visa request is denied')
	const fetchRejectedTextAlert = alertCount.rejected && alertCount.rejected + ' ' + t('Visa request is rejected')

	return (
		<Box className="box-body-flex paddingTop32 paddingBottom32">
			<Container className='body-container-inner'>
				<Page title={t('visaTravelerList.title')}>
					<Grid container>
						<Grid item xs={12}>
							{snackAlertOpen && <SnackbarComponent open={snackAlertOpen} onClose={() => setSnackAlertOpen(false)} message={snackbarMessage} typeOfMessage={typeOfMessage} />}
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12} sm={12}>
							<Itenerary itineraryDetails={itineraryDetails} />
						</Grid>
						{isValidItinerary && <Grid item xs={12} sm={12} paddingTop='20px'>
							<Button variant='contained' onClick={addTravelerRoute} size='medium' >{t('ADD TRAVELLER')}</Button>
						</Grid>}
						<Grid container paddingTop='20px' paddingBottom='20px'>
							{Object.keys(alertCount).length > 0 && alertCount.paid > 0 && (<Grid item xs={12}>
								<AlertSnackbarComponent open={pendingSnackAlertOpen} onClose={() => setPendingSnackAlertOpen(false)} typeOfMessage='info' title={t('Pending Approval')} messageText={fetchPaidTextAlert} icon={<PendingIcon sx={{...(locale.value === 'ar' && {marginLeft: '12px'})}} />} />
							</Grid>)}
							{Object.keys(alertCount).length > 0 && alertCount.incomplete > 0 && (<Grid item xs={12}>
								<AlertSnackbarComponent open={incompleteSnackAlertOpen} onClose={() => setIncompleteSnackAlertOpen(false)}  typeOfMessage='warning' title={titleCase(t('incomplete'))} messageText={fetchIncompleteTextAlert} icon={<WarningAmberOutlinedIcon sx={{...(locale.value === 'ar' && {marginLeft: '12px'})}}/>} />
							</Grid>)}
							{Object.keys(alertCount).length > 0 && alertCount.denied > 0 && (<Grid item xs={12}>
								<AlertSnackbarComponent open={deniedSnackAlertOpen} onClose={() => setDeniedSnackAlertOpen(false)}  typeOfMessage='error' title={titleCase(t('denied'))} messageText={fetchDeniedTextAlert} icon={<PanToolIcon sx={{...(locale.value === 'ar' && {marginLeft: '12px'})}}/>} />
							</Grid>)}
							{Object.keys(alertCount).length > 0 && alertCount.rejected > 0 && (<Grid item xs={12}>
								<AlertSnackbarComponent open={deniedSnackAlertOpen} onClose={() => setDeniedSnackAlertOpen(false)}  typeOfMessage='error' title={titleCase(t('rejected'))} messageText={fetchRejectedTextAlert} icon={<PanToolIcon sx={{...(locale.value === 'ar' && {marginLeft: '12px'})}}/>} />
							</Grid>)}
						</Grid>
						<Grid item xs={12} sm={12}>
							<TravelerList itineraryDetails={itineraryDetails}/>
						</Grid>
					</Grid>
				</Page>
			</Container>
		</Box>
	);
}