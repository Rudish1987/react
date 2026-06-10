import React from 'react';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import { LoadingButton } from '@mui/lab';
import { useStoreState } from 'easy-peasy';
import { useCancelItinerary } from '../../context/booking/hooks';
import Constants from '../../helpers/constants';

const BookingCancelButton = ({ service, status }) => {
	const { t } = useTranslation();
	const { getCancelItinerary, isLoading, isSubmitted } = useCancelItinerary();
	const afterBookingItineraryDetails = useStoreState(actions => actions.btoc.afterBookingItineraryDetails)

	const handleCancelButton = async () => {
		const values = { serviceId: service, itineraryId: afterBookingItineraryDetails.parentBookingCode };
		await getCancelItinerary(values);
	}

	if (status == Constants.MAQAM_BOOKING_CANCELLED) {
		return (
			<Chip label={t(Constants.MAQAM_BOOKING_CANCELLED)} sx={{ fontSize: '10px' }} />
		);
	}

	return (
		<>
			{isSubmitted && <Chip label={t(Constants.MAQAM_BOOKING_CANCELLED)} sx={{ fontSize: '10px' }} />}
			{!isSubmitted && <LoadingButton
				size="small"
				variant="outlined"
				loading={isLoading}
				loadingIndicator="Cancelling.."
				sx={{ color: (theme) => theme.palette.primary.main, border: `1px solid ${(theme) => theme.palette.primary.main}` }}
				onClick={handleCancelButton}
			>
				{t('CANCEL')}
			</LoadingButton>}
		</>

	);
};

export default BookingCancelButton;
