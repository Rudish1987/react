import React, {useEffect} from 'react';
import { Grid, Box, Container } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import ScanPassportSection from '../../components/visa/ScanPassportSection';
import UploadPassportSection from '../../components/visa/UploadPassportSection';
import PassportFormSection from '../../components/visa/PassportFormSection';
import { useGetSafaSalutationList, useGetSafaCountryList, useEditPassportDetails } from '../../context/visa/hooks';
import LandingSkeleton from '../../components/skeleton/LandingSkeleton';
import {useStoreActions} from 'easy-peasy';
// import {useStoreActions, useStoreState} from 'easy-peasy';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../helpers/utils'
import SnackbarComponent from '../../components/common/Snackbar';

export default function AddTraveller() {
	// const requestList = useStoreState(s => s.btob.visa.requestList);
	const getSafaSalutation = useStoreActions(actions => actions.btob.getSafaSalutation);
	const getSafaCountry = useStoreActions(actions => actions.btob.visa.getSafaCountry);
	const getPassportData = useStoreActions(actions => actions.btob.visa.getPassportData);
	const setItineraryId = useStoreActions(actions => actions.btob.visa.setItineraryId);
	const { getSafaSalutationList, isLoading : isLoadingSalutation } = useGetSafaSalutationList();
	const { getSafaCountryList, isLoading : isLoadingSafaCountry } = useGetSafaCountryList();
	const { editPassportDetails, isLoading : isLoadingEditPassenger } = useEditPassportDetails();

	const [snackAlertOpen, setSnackAlertOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [typeOfMessage, settypeOfMessage] = React.useState('');
	
	const navigate = useNavigate();
	let passengerId = false
	let itineraryId = false
	const location = useLocation();
	if(location.state !== null) {
		passengerId = location.state.passengerId ?? false;
		itineraryId = location.state.itineraryId ?? false;
	}

	useEffect(()=>{
		// redirect to visa index page if someone try open this page directly from URL
		if(itineraryId === false) {
			navigate('/visa')
		}
		// if(Object.keys(requestList).length == 0 || itineraryId > 0) {
		//
		// }
		const fetchExtraDetails = async () => {
			await getSafaSalutation(getSafaSalutationList());
			await getSafaCountry(getSafaCountryList());
		}
		fetchExtraDetails()

		const fetchEditPassenger = async () => {
			await getPassportData(editPassportDetails(passengerId))
		}
		if(passengerId > 0) {
			fetchEditPassenger()
		}
		setItineraryId(itineraryId)
	},[]);

	const handleBackButton = () => {
		navigate(-1);
	}

	const handleErrorMessage = (message) => {
		scrollToTop()
		setSnackAlertOpen(true);
		setSnackbarMessage(message);
		settypeOfMessage('error');
	}

	if(passengerId > 0) {
		if(isLoadingEditPassenger) return (<LandingSkeleton/>)
	}

	if (!isLoadingSalutation && !isLoadingSafaCountry) return (
		<Box className="box-body-flex paddingBottom32">
			<Container className="body-container-inner">
				<Grid container spacing={2} sx={{ marginTop: '20px' }}>
					{snackAlertOpen && <Grid item xs={12}>
						<SnackbarComponent open={snackAlertOpen} onClose={() => setSnackAlertOpen(false)} message={snackbarMessage} typeOfMessage={typeOfMessage} />
					</Grid>}
					<ScanPassportSection onBackButton={handleBackButton} onError={handleErrorMessage} />
					<UploadPassportSection />
					<PassportFormSection onBackButton={handleBackButton}  onError={handleErrorMessage} />
				</Grid>
			</Container>
		</Box >);
	return (<LandingSkeleton/>);
}