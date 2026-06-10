import React, { useEffect } from 'react'
import {Grid, Typography,Button} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import '../../css/bookingConfirmation.css';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useTranslation } from 'react-i18next';
import { getMOHUlinkParams } from '../../api/BookingApi';
import { sha256 } from 'js-sha256';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Constants from '../../helpers/constants';

const Visastatus = ({visaDetails, uoStatus, visaPackageStatus}) => {
	const { t } = useTranslation();
	const [visaRequest, setvisaRequest] = React.useState({});
	useEffect(() => {
		createMOHUlink();
	},[visaRequest]);
	const createMOHUlink = () => {
		if(typeof(visaRequest.PassportNumber) != 'undefined'){
			const RequestId = visaRequest.RequestId;
			const Passport_No = visaRequest.PassportNumber;
			const Nationality_Id = visaRequest.Nationality;
			const LANG = 'en';

			const concateString = Passport_No+Nationality_Id+LANG+RequestId;

			const token = sha256(concateString);

			const url = 'https://eservices.haj.gov.sa/eservices3/VisaForm/mutamervisa/processing';
			const urlParam = '?RequestId='+RequestId+'&Passport_No='+Passport_No+'&Nationality_Id='+Nationality_Id+'&LANG='+LANG+'&Token='+token;
			window.open(url+urlParam, '_blank');
		}

	}

	const getVisaStatus = async (_, param) => {
		let payload = {
			'ItenaryId': visaDetails.parentBookingCode,
			'passNo':param
		}
		let resData = await getMOHUlinkParams(payload);
		setvisaRequest(resData);
	}

	let visaStatus = uoStatus == 'REJECTED' ? Constants.VISA_STATUS_CANCEL : visaDetails.status
	visaStatus = visaPackageStatus == Constants.VISA_STATUS_INCOMPLETE ? Constants.VISA_STATUS_INCOMPLETE : visaStatus
	
	return (<Grid className="grey-patch">
		<Typography className="visa-bubble">
			{visaStatus == Constants.VISA_STATUS_ON_REQUEST && <ReportProblemIcon className="ReportProblem"/> }
			{visaStatus == Constants.VISA_STATUS_CONFIRM && <CheckCircleIcon className="checkcircle" /> }
			{visaStatus == Constants.VISA_STATUS_CANCEL && <CancelIcon className="CancelIcon" /> }
			{visaStatus == Constants.VISA_STATUS_INCOMPLETE && <ReportProblemIcon className="ReportProblem"/> }
			{visaDetails.name} - {t('Visa')} {t(visaStatus)}<InfoOutlinedIcon className="InfoIcon"/>
		</Typography>

		{visaDetails == Constants.VISA_STATUS_ON_REQUEST && uoStatus !== 'REJECTED' &&
			<Grid className="visa-spc">
				<Grid item xs={12} align="center" sx={{p:2}}>
					<Grid className="visa-spc">
						<Button variant="contained" size='large' onClick={event => getVisaStatus(event, visaDetails.passangerNo)}>
							{t('Proceed to fill Umrah Visa Form')}
						</Button>
					</Grid>
					<Typography className="discaimer-txt">
						{t('Disclaimer')}-{t('Please make sure to fill the Visa forms as soon as possible. After the forms have been filled, your booking request will be transferred to the Umrah Operator for approval. Please make sure you are reachable on the e-mail and phone number provided at registration in case of any clarification requests.')}
					</Typography>
				</Grid>
			</Grid>
		}

	</Grid>
	)
}

export default Visastatus
