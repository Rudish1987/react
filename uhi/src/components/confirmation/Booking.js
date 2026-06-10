import React from 'react'
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Button, Stack } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import { PackageItemsListForLogin } from '../myPackage/PackageItemsListForLogin';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Constants from '../../helpers/constants'
import { useStoreState } from 'easy-peasy';
import Visastatus from './VisaStatus';
import Invoice from './Invoice';
import Voucher from './Voucher';
import '../../css/bookingConfirmation.css';
import RebookButton from '../../components/common/RebookButton';
import moment from 'moment';

const Booking = () => {
	const { t } = useTranslation();
	const currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)
	const totalItineraryAmount = useStoreState(s => s.btoc.itineraryDetails.itineraryAmount)
	const rebook = useStoreState(s => s.btoc.itineraryDetails.rebook)
	const bookingInfo = useStoreState(actions => actions.btoc.afterBookingItineraryDetails);
	const afterBookingpackagedetails = useStoreState(actions => actions.btoc.afterBookingpackagedetails);
	const passengerLength = bookingInfo.visa.passengers.length;
	const [showInvoice, setShowInvoice] = React.useState(false);
	const [showVoucher, setShowVoucher] = React.useState(false);
	const today = moment()
	const checkInDate = bookingInfo.makkah.dateFrom

	const passenger = (n) => {
		var passengersList = [];
		for (let i = 0; i < n; i++) {
			passengersList.push(<Visastatus visaDetails={bookingInfo.visa.passengers[i]} uoStatus={bookingInfo.uoStatus} visaPackageStatus={afterBookingpackagedetails.visa.status} />)
		}
		return passengersList;
	}

	const getBookingVisaStatus = () => {
		let status = Constants.VISA_STATUS_CONFIRM;
		bookingInfo.visa.passengers.some(passenger => {
			if (bookingInfo.uoStatus == 'REJECTED') {
				status = Constants.VISA_STATUS_CANCEL;
			} else {
				if (passenger.status === Constants.VISA_STATUS_ON_REQUEST) {
					status = Constants.VISA_STATUS_ON_REQUEST;
				}
				if (passenger.status === Constants.VISA_STATUS_CANCEL) {
					status = Constants.VISA_STATUS_CANCEL;
				}
			}
		});

		if(afterBookingpackagedetails.visa.status == Constants.VISA_STATUS_INCOMPLETE) {
			status = Constants.VISA_STATUS_INCOMPLETE;
		}

		return status;
	}

	const getBookingStatus = () => {
		let status = Constants.MAQAM_BOOKING_CONFIRMED;
		if (bookingInfo.groundService.status === Constants.MAQAM_BOOKING_CANCELLED || bookingInfo.makkah.status === Constants.MAQAM_BOOKING_CANCELLED || bookingInfo.transfer.status === Constants.MAQAM_BOOKING_CANCELLED || bookingInfo.uoStatus == 'REJECTED') {
			status = Constants.MAQAM_BOOKING_CANCELLED;
		}

		if(rebook){
			status = Constants.MAQAM_BOOKING_INCOMPLETE;
		}
		return status;
	}

	let isExpand = rebook ? 'panelMyPackage' : 'false'
	return (
		<>
			<Grid container className="marTop-20">
				<Grid item xs={7}>
					<Stack direction="row" spacing={2} className="Montserratfont">
						<Grid>
							<Grid className="accordion-text">{t('Booking Reference')}</Grid>
							<Grid className="statusText">{bookingInfo.itineraryId}</Grid>
						</Grid>

						<Grid>
							<Grid className="accordion-text">{t('Booking Status')}</Grid>
							<Grid className="statusText">{t(getBookingStatus())}</Grid>
						</Grid>
						<Grid>
							<Grid className="accordion-text">{t('Visa')}</Grid>
							<Grid className="statusText">{t(getBookingVisaStatus())}</Grid>
						</Grid>
					</Stack>
				</Grid>
				<Grid item xs={5}>
					{!rebook && <Stack direction="row" spacing={2} justifyContent='end'>
						<Grid>
							<Button onClick={() => setShowInvoice(true)} variant="outlined" className="greyButtons">{t('MY INVOICE')}</Button>
						</Grid>

						<Grid>
							<Button onClick={() => setShowVoucher(true)} variant="outlined" className="greyButtons">{t('MY VOUCHER')}</Button>
						</Grid>
					</Stack>}
				</Grid>
			</Grid>
			{rebook && today.diff(checkInDate, 'days') < 0 && <Grid item xs={12} sx={{ pt: 4 }}>
				<Grid item>
					<Typography className="theme-font" variant="body">{t('Incomplete booking? Please')} </Typography>
					<RebookButton bookingInfo={bookingInfo} afterBookingPackageDetails={afterBookingpackagedetails}/>
				</Grid>
			</Grid>}
			{ !rebook && < Grid item xs={12} sx={{ pt: 2 }}>
				<Typography className="theme-font" variant="body">{t('Please submit your visa form within 24 hours of purchase the package ')} </Typography>
			</Grid>}
			<Grid item xs={12} sx={{ pt: 4 }}>
				<PackageItemsListForLogin totalItineraryAmount={totalItineraryAmount} passCurrency={currency} isExpandedPanel={isExpand} isConfirmed={true} />
			</Grid>

			{getBookingVisaStatus() == Constants.VISA_STATUS_ON_REQUEST &&
				<Grid container className="visablock">
					<Grid item className="report-visa">
						<ReportProblemIcon className="ReportProblemIcon" />
					</Grid>
					<Grid item xs={11}>
						<Typography className="bookinginnerText">{t('Visa in progress')}</Typography>
						<Typography className="bookinginnerpara">{t('We have submitted passenger information to the Ministry of Hajj and Umrah for Visa Processing. Below you will find the status of the Visa application process. Please make sure to fill out the Visa forms as soon as possible via the links below. A delay in doing so could lead to Visa rejection.')}</Typography>
					</Grid>
				</Grid>
			}
			{getBookingVisaStatus() == Constants.VISA_STATUS_CANCEL &&
				<Grid container className="visablock2">
					<Grid xs={1} direction="column">
						<CancelIcon className="CancelIcon" />
					</Grid>
					<Grid xs={11} direction="column" className="marRight-23">
						<Typography sx={{ pb: 1 }} className="bookinginnerText">{t('Denied')}</Typography>
						<Typography className="bookinginnerpara">
							{t('Your Booking was Rejected by the Umrah Operator.')}<br />
							{t('The Umrah Operator has rejected your reservation and your booking has been automatically canceled. The full amount paid will be automatically returned to your credit card. While we issue the refund immediately, it may take a few days for the amount to be returned, depending on your bank. For any questions, please contact our customer service department')}
						</Typography>
					</Grid>
				</Grid>
			}

			<Accordion className="accordion-block">
				<AccordionSummary
					className="accordion-sum"
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className="accordion-text">
						{bookingInfo.uoStatus == Constants.UO_STATUS_APPROVED ? <CheckCircleIcon className="checkcircle" /> : (bookingInfo.uoStatus == Constants.UO_STATUS_REJECTED) ? <CancelIcon className="CancelIcon" /> : <ReportProblemIcon className="ReportProblemIcon report-icon-position" />}
						{t('Umrah Operator approval')} - {t(afterBookingpackagedetails.visa.status == Constants.VISA_STATUS_INCOMPLETE ? Constants.MAQAM_BOOKING_INCOMPLETE :  bookingInfo.uoStatus)}
					</Typography>
				</AccordionSummary>
				{afterBookingpackagedetails.visa.status != Constants.VISA_STATUS_INCOMPLETE && <AccordionDetails>
					{bookingInfo.uoStatus == 'APPROVED' &&
						<Typography>
							{t('Your booking has been accepted by the Umrah Operator and the visa application will be processed. Please check your visa status in the passenger details below.')}
						</Typography>
					}
					{bookingInfo.uoStatus == 'PENDING' &&
						<Typography>
							{t('We have submitted your visa application. Please make sure to fill the Visa link immediately, as a delay could result in Visa rejection. Please also make sure to remain available on the number and e-mail provided at registration for any follow up questions. Once the form is filled, the Umrah Operator will process your request.')}
						</Typography>
					}
					{bookingInfo.uoStatus == 'REJECTED' &&
						<Typography>
							{t('The Umrah Operator has rejected your reservation and your booking has been automatically canceled. The full amount paid will be automatically returned to your credit card. While we issue the refund immediately, it may take a few days for the amount to be returned, depending on your bank. For any questions, please contact our customer service department.')}
						</Typography>
					}
				</AccordionDetails>}
			</Accordion>
			{passenger(passengerLength)}
			<Invoice showInvoice={showInvoice} setShowInvoice={setShowInvoice}></Invoice>
			<Voucher showInvoice={showVoucher} setShowInvoice={setShowVoucher}></Voucher>
		</>
	)
}
export default Booking