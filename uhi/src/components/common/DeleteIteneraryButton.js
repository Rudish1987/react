import React, { useState } from 'react';
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AlertDialog from './AlertDialog';

const DeleteIteneraryButton = () => {
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
	const dialogContent = t('You booking process is not complete, if you cancel your package now you are going to loose all the information, nothing will be stored.')
	const agreeBtnText = t('Confirm Cancellation')
	const disAgreeBtnText = t('Go Back')
	const dialogConfirmtext = t('Do you want to proceed with the cancellation?')

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

export default DeleteIteneraryButton
