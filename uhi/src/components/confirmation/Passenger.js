import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import FlightDetails from './FlightDetails';
import PassengerDetails from './PassengerDetails';
import PassengersExcel from './PassengersExcel';
import '../../css/passengerDetails.css';
import { Grid, Typography, Paper, Button } from '@mui/material'
import { PackageItemsListForLogin } from '../myPackage/PackageItemsListForLogin';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { PassengerStepperHeader } from '../../components/CommonHeaders/PassengerStepperHeader'
import Constants from '../../helpers/constants'
import { useNavigate } from 'react-router-dom';
import CloseItineraryButton from '../common/CloseItineraryButton';
import { useMutamerEarlyValidation, useSaveBooking } from '../../context/visa/hooks';
import { SnackBarAlert } from '../../components/common/SnackBarAlert';
import { LoadingButton } from '@mui/lab';
import { useLocale } from '../../context/LocaleContext';

const Passenger = () => {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const navigate = useNavigate();
	const [paymentButton, setPaymentButton] = React.useState(false)
	const [validateButton, setValidateButton] = React.useState(false)
	const [snackAlert, setSnackAlert] = React.useState({ 'message': 'Warning', show: false, type: 'warning' });
	const countryResult = useStoreState(actions => actions.btoc.countryResult);

	const rooms = useStoreState(actions => actions.btoc.afterBookingItineraryDetails.makkah.rooms);
	const passengerCount = rooms.reduce((a, b) => a + (b.adultsCount * b.room), 0);
	const formCount = Number(passengerCount) + 1; // total number of form is passenger count + flight count

	const confirmCount = useStoreState(actions => actions.btoc.itineraryDetails.confirmCount);
	const setConfirmCount = useStoreActions(actions => actions.btoc.itineraryDetails.setConfirmCount)
	const totalItineraryAmount = useStoreState(s => s.btoc.itineraryDetails.itineraryAmount);
	const afterBookingItineraryDetails = useStoreState(s => s.btoc.afterBookingItineraryDetails);
	const currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)
	const nationality = useStoreState(s => s.btoc.filters.nationality);
	const residency = useStoreState(s => s.btoc.filters.residency);
	const passengerInfo = useStoreState(actions => actions.btoc.itineraryDetails.passengers);
	const flightInfo = useStoreState(actions => actions.btoc.itineraryDetails.flight);
	const passengerExcelInfo = useStoreState(actions => actions.btoc.itineraryDetails.passengerExcel);
	const setPassengerExcel = useStoreActions(actions => actions.btoc.itineraryDetails.setPassengerExcel);
	const resetPassengerResult = useStoreActions(actions => actions.btoc.itineraryDetails.resetPassengerResult);
	const resetPassengerExcel = useStoreActions(actions => actions.btoc.itineraryDetails.resetPassengerExcel);
	const { visaMutamerValidation, isLoading: loadValidation } = useMutamerEarlyValidation();
	const { saveBooking, isLoading: loadSaveBooking } = useSaveBooking();
	const [excelUploadCount, setExcelUploadCount] = React.useState(0);

	const excelCountInc = () => {
		setExcelUploadCount((excelUploadCount) => excelUploadCount + 1);
	};
	useEffect(() => {
		resetPassengerExcel()
	}, [])
	useEffect(() => {

		const flightLength = Object.keys(flightInfo).length > 0 ? 1 : 0;
		const passengerLength = Object.keys(passengerInfo).length;
		setPaymentButton(false)

		setValidateButton(false)
		if ((flightLength + passengerLength) == formCount) {
			setValidateButton(true)
			resetPassengerExcel()
		}

		if( (afterBookingItineraryDetails.visa.status === 'SAVED')){
			setValidateButton(false)
			setPaymentButton(true)
		}
	}, [confirmCount])

	const passenger = (n) => {
		var passengersList = [];
		let newPassengerInfo = {};
		const getPassengerLength = Object.keys(passengerInfo).length;
		for (let i = 0; i < n; i++) {
			let isLeading = '0';
			let isfirstform = true
			let isChecked = false
			if (i == 0) isLeading = '1';
			let passengerNum = i + 1;
			if (passengerNum == 1 || getPassengerLength + 1 >= passengerNum) isfirstform = false;
			if (getPassengerLength >= passengerNum) isChecked = true;
			if (passengerExcelInfo && Object.keys(passengerExcelInfo).length > 0) {
				newPassengerInfo = {
					'isAlreadyConfirmed': 'excel',
					'passengerNum': passengerNum,
					'leading': isLeading,
					'gender': passengerExcelInfo[i] ? passengerExcelInfo[i].gender : '',
					'givenName': passengerExcelInfo[i] ? passengerExcelInfo[i].givenName : '',
					'surname': passengerExcelInfo[i] ? passengerExcelInfo[i].surname : '',
					'nationalityName': afterBookingItineraryDetails.passengerCountry.Country_Name ? afterBookingItineraryDetails.passengerCountry.Country_Name : nationality.Country_Name,
					'nationality': afterBookingItineraryDetails.passengerCountry.Country_Code ? afterBookingItineraryDetails.passengerCountry.Country_Code : nationality.Country_Code,
					'residency': afterBookingItineraryDetails.passengerCountry.Country_Code ? afterBookingItineraryDetails.passengerCountry.Country_Code : residency.Country_Code,
					'dateOfBirth': passengerExcelInfo[i] ? passengerExcelInfo[i].dateOfBirth : null,
					'passport': passengerExcelInfo[i] ? passengerExcelInfo[i].passport : '',
					'passportExpiry': passengerExcelInfo[i] ? passengerExcelInfo[i].passportExpiry : null,
					'muramNumber': passengerExcelInfo[i] ? passengerExcelInfo[i].muramNumber : '',
				};
			} else if (passengerInfo && passengerInfo.length > 0 && passengerInfo[i]) {
				newPassengerInfo = {
					'isAlreadyConfirmed': 'saved',
					'passengerNum': passengerNum,
					'leading': isLeading,
					'gender': passengerInfo[i] ? passengerInfo[i].gender : '',
					'givenName': passengerInfo[i] ? passengerInfo[i].givenName : '',
					'surname': passengerInfo[i] ? passengerInfo[i].surname : '',
					'nationalityName': afterBookingItineraryDetails.passengerCountry.Country_Name ? afterBookingItineraryDetails.passengerCountry.Country_Name : nationality.Country_Name,
					'nationality': afterBookingItineraryDetails.passengerCountry.Country_Code ? afterBookingItineraryDetails.passengerCountry.Country_Code : nationality.Country_Code,
					'residency': afterBookingItineraryDetails.passengerCountry.Country_Code ? afterBookingItineraryDetails.passengerCountry.Country_Code : residency.Country_Code,
					'dateOfBirth': passengerInfo[i] ? passengerInfo[i].dateOfBirth : null,
					'passport': passengerInfo[i] ? passengerInfo[i].passport : '',
					'passportExpiry': passengerInfo[i] ? passengerInfo[i].passportExpiry : null,
					'muramNumber': passengerInfo[i] ? passengerInfo[i].muramNumber : '',
				};
			} else {
				newPassengerInfo = {
					'isAlreadyConfirmed': 'new',
					'passengerNum': passengerNum,
					'leading': isLeading,
					'gender': '',
					'givenName': '',
					'surname': '',
					'nationalityName': afterBookingItineraryDetails.passengerCountry ? afterBookingItineraryDetails.passengerCountry.Country_Name : nationality.Country_Name,
					'nationality': afterBookingItineraryDetails.passengerCountry ? afterBookingItineraryDetails.passengerCountry.Country_Code : nationality.Country_Code,
					'residency': afterBookingItineraryDetails.passengerCountry ? afterBookingItineraryDetails.passengerCountry.Country_Code : residency.Country_Code,
					'dateOfBirth': null,
					'passport': '',
					'passportExpiry': null,
					'muramNumber': '',
				};
			}

			//Code to set nationality name in arabic
			if(locale.value === 'ar'){
				countryResult.map((data) => {
					if(data.Country_Code == newPassengerInfo.nationality){
						newPassengerInfo.nationalityName = data.Country_Name_AR
						return false;
					}
				});
			}

			passengersList.push(<PassengerDetails isLeading={isLeading} passengerNum={passengerNum} lastSubmitterForm={getPassengerLength + 1} isChecked={isChecked} key={passengerNum} isFirstForm={isfirstform} onConfirm={handleConfirmButton} passengerInfo={newPassengerInfo ? newPassengerInfo : {}} />);
		}
		return passengersList;
	}
	const handlePayment = () => {
		/*need to send on the payment page*/
		navigate(Constants.USER_PAYMENT_URL);
	}


	const handleValidate = async () => {
		let getValidateResponse = await visaMutamerValidation();
		if (getValidateResponse.status == false) {
			return false
		} else {
			let getVisaSaveBooking = await saveBooking();
			if(getVisaSaveBooking.status == false) {
				return false
			}
			setValidateButton(false)
			setPaymentButton(true)
		}
	}

	const handleConfirmButton = () => {
		setConfirmCount(confirmCount + 1)
	}

	const handlePassengerDetails = (values) => {
		let newPassengerDetails = []
		for (let i = 0; i < passengerCount; i++) {
			let newPassengerInfo = {
				'gender': values[i] ? values[i].gender : '',
				'givenName': values[i] ? values[i].givenName : '',
				'surname': values[i] ? values[i].surname : '',
				'nationalityName': afterBookingItineraryDetails.passengerCountry.Country_Name ? afterBookingItineraryDetails.passengerCountry.Country_Name : nationality.Country_Name,
				'nationality': afterBookingItineraryDetails.passengerCountry.Country_Code ? afterBookingItineraryDetails.passengerCountry.Country_Code : nationality.Country_Code,
				'residency': afterBookingItineraryDetails.passengerCountry.Country_Code ? afterBookingItineraryDetails.passengerCountry.Country_Code : residency.Country_Code,
				'dateOfBirth': values[i] ? values[i].dateOfBirth : null,
				'passport': values[i] ? values[i].passport : '',
				'passportExpiry': values[i] ? values[i].passportExpiry : null,
				'muramNumber': values[i] && values[i].gender == 'F' ? values[i].mahramPassportNumber : '',
			}
			newPassengerDetails.push(newPassengerInfo)
			excelCountInc()


		}
		if (Object.keys(flightInfo).length > 0) {
			setConfirmCount(1)
		} else {
			setConfirmCount(0)
		}
		setPaymentButton(false)
		setPassengerExcel(newPassengerDetails)
		resetPassengerResult()
	}

	return (
		<>
			<PassengerStepperHeader stepLevel={t(Constants.STEP_PASSENGER)} />
			<Grid sx={{ p: 2, backgroundColor: 'white' }} container justifyContent='center'>
				<Grid item xs={10}>
					<PackageItemsListForLogin totalItineraryAmount={totalItineraryAmount} passCurrency={currency} isExpandedPanel={false} isSaved={true} />
				</Grid>

				<Grid item xs={10}>
					<Grid sx={{ pt: 2 }}>
						<Paper>
							<Grid className="passengerHeading" sx={{ fontFamily: 'Montserrat' }}>

								<Typography sx={{ pt: 1, pb: 4, fontFamily: 'Montserrat', fontSize: '20px', fontWeight: 600 }}>{t('Passengers Details')}</Typography>
								<FlightDetails onConfirm={handleConfirmButton} />

								<PassengersExcel onClickOnContinue={handlePassengerDetails} />
								{excelUploadCount > 0 &&
									<Typography className="excelsucesstext">
										{t('Your group is successfully imported. Please carefully review each passenger and confirm all details are correct as per their passport.')}
										{t('Wrong information could result in Visa rejection')}
									</Typography>
								}
								{passenger(passengerCount)}
								<Grid item xs sm container direction="row" sx={{ pt: 3 }} spacing={2} justifyContent='end'>
									<Grid item>
										<CloseItineraryButton></CloseItineraryButton>
									</Grid>
									<Grid item>
										{paymentButton && !validateButton && <Button variant="contained" size='large' onClick={handlePayment}>{t('GO TO PAYMENT')}</Button>}
										{!paymentButton && !validateButton && <Button variant="contained" disabled size='large'>{t('Check Visa Eligibility')}</Button>}
										{!paymentButton && validateButton &&
											<LoadingButton
												fullWidth
												size="large"
												variant="contained"
												loading={loadValidation || loadSaveBooking}
												onClick={handleValidate}
												loadingIndicator={t('Validating..')}
											>
												{t('Check Visa Eligibility')}
											</LoadingButton>
										}

									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				<SnackBarAlert {...snackAlert} resetSnackAlert={setSnackAlert}></SnackBarAlert>
			</Grid>

		</>
	)
}

export default Passenger
