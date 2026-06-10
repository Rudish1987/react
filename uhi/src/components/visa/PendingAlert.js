import React from 'react';
import { Typography, Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import PendingIcon from '@mui/icons-material/Pending';

import '../../style/scss/btob/landing/index.scss';

export default function PendingAlert() {
	const { t } = useTranslation();
	return (
		<>
			<Grid container spacing={2} className="pendingAlert">
				<Grid item xs={1} lg={'auto'} paddingBottom='16px'><PendingIcon /></Grid>
				<Grid item xs={8} lg={8} paddingBottom='16px'>
					<Typography variant='body1'>{t('Pending Approval')}</Typography>
					<Typography variant='body1' fontWeight='400'>{t('4 Visa request have been sent and pending for government approval')}</Typography>
				</Grid>
				<Grid item xs={3} lg={3} display='flex' sx={{
					justifyContent: { lg: 'right', md: 'right', sm: 'right' }, marginTop: '14px', position: 'relative',
					bottom: '24px'
				}}>
					<Button variant="text" sx={{ color: '#0078B7' }}>CLOSE<CloseIcon sx={{ marginLeft: '10px', width: '20px', height: '20px' }} /></Button>
				</Grid>
			</Grid>
		</>
	);
}