import { Box, Button, Grid } from '@mui/material';
import ScanIcon from '../../Assets/scanicon.png';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import passportimage from '../../Assets/passportimage.png';
import DialogActions from '@mui/material/DialogActions';
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { LoadingButton } from '@mui/lab';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useGetScannedPassportDetails } from '../../context/visa/hooks'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useLocale } from '../../context/LocaleContext';
import Constants from '../../helpers/constants';

const ScanDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(3),
	},
}));

const ScanPassportSection = ({ onBackButton, onError }) => {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [open, setOpen] = React.useState(false);
	const [scannedPassport, setScannedPassport] = useState(passportimage);
	const [isCalledApi, setIsCalledApi] = useState(false);
	const passportData = useStoreState(actions => actions.btob.visa.passportData);
	const isValidItinerary = useStoreState(s => s.btob.visa.isValidItinerary);
	const getPassportData = useStoreActions(actions => actions.btob.visa.getPassportData);
	const { scannedPassportDetails, isLoading } = useGetScannedPassportDetails();

	const handleClickOpen = () => {
		setScannedPassport(passportimage)
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const inputFileRef = useRef(null);
	const uploadPassport = () => {
		inputFileRef.current.click();
	}
	const uploadScannedPassport = async (event) => {
		const fileObj = event.target.files && event.target.files[0];
		if (!fileObj) {
			return;
		}

		const passportImg = event.target.files[0];
		if (!passportImg) {
			handleClose();
			onError('Please select passport image');
			return;
		}

		if (!passportImg.type.startsWith('image/')) {
			handleClose();
			onError('Invalid file type, Please select an image');
			return;
		}
		const maxSize = 5 * 1024 * 1024;
		if (passportImg.size > maxSize) {
			handleClose();
			onError('File size exceeds the limit (5MB). Please select a smaller image.');
			return;
		}
		setScannedPassport(URL.createObjectURL(passportImg));

		const formData = new FormData();
		formData.append('photo', passportImg);

		await getPassportData(scannedPassportDetails(formData))
		setIsCalledApi(true)
		handleClose();
	}

	useEffect(() => {
		if (isCalledApi && passportData.passportNumber == '') {
			handleClose();
			onError(t('There is some issue with this image. Please try with different image.'));
			return;
		}
	}, [isCalledApi]);

	const disableScanPassportButton = () => {
		if (passportData.visaStatus && [Constants.B2B_VISA_STATUS_PAID, Constants.B2B_VISA_STATUS_APPROVED, Constants.B2B_VISA_STATUS_DENIED, Constants.B2B_VISA_STATUS_REJECTED].includes(passportData.visaStatus)) {
			return true;
		}
		return false;
	}

	return (
		<Grid item xs={12}><Grid container>
			<Grid item xs={10} sm={4}>
				{isValidItinerary && <Button
					variant="outlinedSecondary"
					fullWidth
					size='large'
					type='submit'
					onClick={handleClickOpen}
					disabled={disableScanPassportButton()}
				>
					<img src={ScanIcon} alt="" width='18px' height='22px' className='icon-spc'/>
					{t('Passport Scan')}
				</Button>}
			</Grid>
			<Grid item xs={2} sm={8} textAlign='right' sx={{
				...(locale.value === 'ar' && {
					textAlign: 'left'
				})
			}}>
				<Button variant='text' color='secondary' onClick={onBackButton} >
					<CloseIcon />
				</Button>
			</Grid>
			<ScanDialog
				onClose={handleClose}
				open={open}
			>
				<DialogTitle sx={{ m: 0, p: 2 }}>
					{t('Add new traveller')}
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
						...(locale.value === 'ar' && {
							position: 'absolute',
							top: '8px',
							right: '87%'
						}
						)
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent dividers className='passportscandialog' sx={{ width: { lg: '600', md: '600px', sm: '600px', xs: 'none' } }}
				>
					<Box>
						<img src={scannedPassport} alt="" />
					</Box>
				</DialogContent>
				<DialogActions className='passportscandialog'>
					<input style={{ display: 'none' }} ref={inputFileRef} type='file' onChange={uploadScannedPassport} />
					<LoadingButton
						color="primary"
						variant="contained"
						endIcon={<ArrowForwardOutlinedIcon sx={{
							...(locale.value === 'ar' && {
								marginRight: '5px'
							})
						}} />}
						loading={isLoading}
						loadingPosition="end"
						onClick={uploadPassport}
					>
						<span>{t('UPLOAD PASSPORT')}</span>
					</LoadingButton>
				</DialogActions>
			</ScanDialog>
		</Grid></Grid >
	)
}

export default ScanPassportSection;