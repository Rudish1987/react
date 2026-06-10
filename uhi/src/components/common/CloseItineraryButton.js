import React, { useState } from 'react';
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AlertDialog from './AlertDialog';

const CloseItineraryButton = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [dialogopen, setDialogOpen] = useState(false);

	const handleConfirmCancel = async() => {
		navigate('/')
	}
	const handleDisagree = () => {
		setDialogOpen(false)
	}

	const dialogTitle = t('Package Cancellation')
	const dialogContent = t('Your booking has confirmed, You can get this booking under My Booking page')
	const agreeBtnText = t('Confirm')
	const disAgreeBtnText = t('Go Back')
	const dialogConfirmtext = t('Do you want to proceed?')

	const cancelIteneraryAlert = () => {
		setDialogOpen(true)
	}

	return (
		<>
			<Button variant="outlined" size='large' sx={{ color: (theme) => theme.palette.primary.main, border: `1px solid ${(theme) => theme.palette.primary.main}` }} onClick={cancelIteneraryAlert}>{t('Cancel')}</Button>
			<AlertDialog dialogopen={dialogopen} handleAgree={handleConfirmCancel} handleDisagree={handleDisagree} dialogTitle={dialogTitle} dialogContent={dialogContent} agreeBtnText={agreeBtnText} disAgreeBtnText={disAgreeBtnText} dialogConfirmtext={dialogConfirmtext}></AlertDialog>
		</>
	)
}

export default CloseItineraryButton
