import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { manageRebookRedirection } from '../../helpers/utils'
import { checkMutamerInfo } from '../../api/BookingApi'
import Constants from '../../helpers/constants';

const RebookButton = ({bookingInfo, afterBookingPackageDetails}) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation()
	const returnedCode = useStoreState(actions => actions.btoc.afterBookingItineraryDetails.returnedCode)
	const failedItineraryDetails = useStoreState(actions => actions.btoc.failedItineraryDetails);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleVisaTryAgain = async () => {
		const getdata = await checkMutamerInfo(bookingInfo.returnedCode)
		if(getdata.status) {
			if(location.pathname == Constants.USER_BOOKING_CONFIRMATION) {
				navigate(0)
			} else {
				navigate(Constants.USER_BOOKING_CONFIRMATION, { state: { mainParentBookingCode: returnedCode } })
			}
		} else {
			setIsLoading(false)
		}
	}

	const handleClick =  () => {
		setIsLoading(true)
		if(bookingInfo.makkah.status == 'INCOMPLETE' || bookingInfo.madinah.status == 'INCOMPLETE' || bookingInfo.groundService.status == 'INCOMPLETE' || bookingInfo.transfer.status == 'INCOMPLETE'){
			const redirectUrl = manageRebookRedirection(failedItineraryDetails)
			navigate(redirectUrl, { state: { rebook: true } })
		}else if(afterBookingPackageDetails.visa.status == 'INCOMPLETE'){
			handleVisaTryAgain();
		}
	}
	return (
		<>
			<LoadingButton
				size="small"
				variant="text"
				loading={isLoading}
				loadingIndicator="Rebooking.."
				className="theme-font button-hover"
				onClick={() => handleClick()}
				color='primary'
			>
				{t('Book Again')}
			</LoadingButton>
		</>

	);
};

export default RebookButton;
