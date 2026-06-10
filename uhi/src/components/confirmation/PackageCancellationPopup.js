import React from 'react'
import {Button,Grid,Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useTranslation} from 'react-i18next';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 800,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4
};

export default function PackageCancellationPopup() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const {t} = useTranslation();

	return (
		<>
			<Grid>
				<Button onClick={handleOpen}>Cancel Package</Button>
				<Grid justify='center'>

					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography sx={{fontWeight:600,px:2,pt:1,pb:3,fontSize:'20px'}}>{t('Package Cancellation')}</Typography>
							<Typography sx={{fontWeight:500,pb:3,px:2,fontSize:'16px'}}>{t('Your booking process is not complete, if you cancel your package now you are going to loose all the information, nothing will be stored.')}</Typography>
							<Typography sx={{fontWeight:600,pb:3,px:2,fontSize:'16px'}}>{t('Do you want to proceed with the cancellation?')}</Typography>
							<Grid item xs sm container direction="row" spacing={2} justifyContent='end'>
								<Grid item>
									<Button variant="contained" onClick={handleClose}>{t('GO BACK')}</Button>
								</Grid>
								<Grid item>
									<Button variant="outlined">{t('CONFIRM CANCELLATION')}</Button>
								</Grid>
							</Grid>
						</Box>
					</Modal>
				</Grid>
			</Grid>
		</>
	);
}
