import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import '../../css/styles.css'

export default function AlertDialog({dialogopen, handleAgree, handleDisagree, dialogTitle, dialogContent, agreeBtnText, disAgreeBtnText, dialogConfirmtext='' }) {
	
	const { t } = useTranslation();

	const [open, setOpen] = useState(dialogopen);

	const handleDialogAgree = () => {
		setOpen(false)
		handleAgree()
	}

	useEffect(() => {
		setOpen(dialogopen)
	}, [dialogopen])

	const handleDialogClose = () => {
		handleDisagree()
	}
    
	return (
		<>
			<Dialog
				open={open}
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{t(dialogTitle)}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{t(dialogContent)}
					</DialogContentText>
					{ dialogConfirmtext && <Typography variant="h6" sx={{color:'#212121', mt:2}}>{t(dialogConfirmtext)}</Typography> }
					
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} sx={{textTransform:'uppercase', marginLeft: '8px'}}  variant="contained" size='large'>{t(disAgreeBtnText)}</Button>
					<Button onClick={handleDialogAgree} variant="outlined" size='large' sx={{ color: (theme) => theme.palette.primary.main, border: `1px solid ${(theme) => theme.palette.primary.main}`, textTransform:'uppercase' }}>
						{t(agreeBtnText)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
