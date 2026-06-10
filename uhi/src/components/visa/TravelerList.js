import React, {useEffect, useState} from 'react';
import {Typography, Box, Button, IconButton, Grid, Tooltip} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import '../../style/scss/btob/landing/index.scss';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckIcon from '@mui/icons-material/Check';
import PanToolIcon from '@mui/icons-material/PanTool';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinearProgress from '@mui/material/LinearProgress'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useGetTravelersList, useRemoveTravelersList, useSendVisa } from '../../context/visa/hooks'
import NoRowsOverlay from '../common/DataTableNoRowsOverlay'
import Invoice from '../payment/Invoice';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useNavigate } from 'react-router-dom';
import SnackbarComponent from '../common/Snackbar';
import { useLocale } from '../../context/LocaleContext';
import Constants from '../../helpers/constants';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import moment from 'moment/moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuPopover from '../../components/MenuPopover';

const useStyles = makeStyles({
	root: {
		'&.MuiDataGrid-root .MuiDataGrid-columnHeader, &.MuiDataGrid-root .MuiDataGrid-cell, &.MuiDataGrid-root .MuiDataGrid-cellCheckbox:focus': {
			outline: 'none !important',
		},
		'&MuiDataGrid-overlayWrapperInner': {
			width: 'auto',
		}
	},
	statusText: {
		display: 'flex',
		alignItems: 'center',
		gap: 'var(--borderRadius, 4px)',
		flex: '1 0 0'
	},
	travelerListAciton: {
		display: 'flex',
		alignItems: 'center',
		gap: 4,
		flex: '1 0 0'
	},
	travelerListContainedBtn: {
		'&.muiltr-1fvoi60-MuiButtonBase-root-MuiButton-root': {
			'@media (max-width: 690px)': {
				fontSize: '10px'
			}
		},
	},
	travelerListOutlenedBtn: {
		'&.MuiButton-outlined': {
			'@media (max-width: 765px)': {
				height: '48px',
				padding: '6px 12px',
				fontSize: '10px',
				width: '190px'
			},
			'@media (max-width: 820px)': {
				width: '190px'
			}
		},
	},
});

export default function TravelerList({ itineraryDetails }) {
	const classes = useStyles();
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [open, setOpen] = useState(0);
	const navigate = useNavigate();
	const [selectedRows, setSelectedRows] = React.useState([]);
	const [visaTotalFee, setTotalFee] = React.useState(0);
	const [loading, setLoading] = React.useState(false)
	const themeDataGrid = React.useMemo(() => locale.value === 'ar' ? (createTheme({direction: 'rtl'})) : (createTheme({direction: 'ltr'})));

	const [approvedCount, setApprovedCount] = React.useState([])
	const [incorrectCount, setIncorrectCount] = React.useState([])
	const [validCount, setValidCount] = React.useState([])
	const [deniedCount, setDeniedCount] = React.useState([])
	const [paidCount, setPaidCount] = React.useState([])

	const [showInvoice, setShowInvoice] = React.useState(false);

	const [snackAlertOpen, setSnackAlertOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [typeOfMessage, settypeOfMessage] = React.useState('');

	const visaTravelersList = useStoreState(s => s.btob.visa.travelersList)
	const isValidItinerary = useStoreState(s => s.btob.visa.isValidItinerary)
	const getVisaTravelersList = useStoreActions(actions => actions.btob.visa.getVisaTravelersList) //set data from API response
	const setTeavelersList = useStoreActions(actions => actions.btob.visa.setTeavelersList)
	const resetPassportData = useStoreActions(actions => actions.btob.visa.resetPassportData)

	const { travelerlistVisa } = useGetTravelersList();
	const { removeVisaTraveler } = useRemoveTravelersList();
	const { sendVisaToTraveler, isLoading: isLoadingSendVisa } = useSendVisa();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleOpen = (rowNumber ,event) => {
		setOpen(rowNumber);
		setAnchorEl(event.currentTarget)
	};
	const handleClose = () => {
		setOpen(0);
	};

	// const downloadPdfRef = React.useRef();
	const commonFieldProps = {
		editable: false,
		sortable: false,
		flex: 1,
		minWidth: 100,
	}

	const columns = [
		{
			field: 'status',
			headerName: t('Status'),
			editable: false,
			sortable: false,
			flex: 1.5,
			renderCell: (params) => {
				const icons = [
					<Typography variant='body2' color='error' key='0' className='MuiDataGrid-cellContent VisaPassenger-statusText'><WarningAmberIcon/>{t('Incomplete Data')}</Typography>,
					<Typography variant='body2' color='info.main' key='1' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><CheckIcon />{t('Valid, not Sent')}</Typography>,
					<Typography variant='body2' color='success.main' key='2' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><CheckIcon/>{t('VISA Approved')}</Typography>,
					<Typography variant='body2' color='error' key='3' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><PanToolIcon/>{t('VISA Denied')}</Typography>,
					<Typography variant='body2' color='warning.dark' key='4' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><CheckIcon/>{t('Valid, Paid')}</Typography>,
					<Typography variant='body2' color='error' key='5' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><PanToolIcon/>{t('VISA Rejected')}</Typography>,
					<Typography variant='body2' color='warning.main' key='6' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><KeyboardReturnOutlinedIcon/>{t('Refunded')}</Typography>
				]
				let defaultCode = 0;
				return icons[params.row.status] || icons[defaultCode];
			},
			minWidth: 150,
		},
		{
			field: 'passport',
			headerName: t('Passport'),
			...commonFieldProps,
			renderCell: (params) => {
				let today = moment()
				let lastDay = moment(params.row.details.AdditionalDetails.dateFrom)
				let validityDays = lastDay.diff(today, 'days')

				if( params.row.status == Constants.B2B_VISA_STATUS_INCOMPLETE || params.row.status == Constants.B2B_VISA_STATUS_VALID){
					return <Typography variant='body2' color='grey.800'>{validityDays <= 0 && <Tooltip title={t('Arrival date exceeded')}><InfoOutlinedIcon fontSize={'small'} color={'error'} sx={{verticalAlign: 'top'}}/></Tooltip>} {params.row.passport}</Typography>
				} else {
					return <Typography variant='body2' color='grey.800'>{params.row.passport}</Typography>
				}
			},
		},
		{
			field: 'name',
			headerName: t('Name'),
			valueGetter: (params) =>
				`${params.row.FirstName || ''} ${params.row.LastName || ''}`,
			editable: false,
			sortable: false,
			flex: 2,
			minWidth: 200,
		},
		{
			field: 'BirthDate',
			headerName: t('Birth Date'),
			...commonFieldProps,
		},
		{
			field: 'Gender',
			headerName: t('Gender'),
			editable: false,
			sortable: false,
			flex: 1,
			minWidth: 75,
		},
		{
			field: 'nationality',
			headerName: t('Nationality'),
			...commonFieldProps,
		},
		{
			field: 'action',
			headerName: t('Action'),
			disableClickEventBubbling: true,
			renderCell: (params) => {
				if( params.row.status != Constants.B2B_VISA_STATUS_APPROVED ){
					return (
						<IconButton onClick={() => handleEditClick(params.row.AutoId)} title={t('Edit')}>
							<EditOutlinedIcon />
						</IconButton>
					);
				} else {
					return (
						<>
							<Button aria-label={t('Download')} onClick={(event) =>handleOpen(params.row.AutoId ,event)}>
								<FileDownloadOutlinedIcon />
							</Button>
							<MenuPopover
								open={open === params.row.AutoId}
								onClose={handleClose}
								anchorEl={anchorEl}
								className="menu-popove-style"
							>
								<Button fullWidth color="inherit" variant="text" className="logout-link" onClick={()=> window.open(params.row.safadetails.SafaAdditionalDetails.visa_document_url, '_blank')}>
									{t('Voucher ')}
								</Button>
								<Button fullWidth color="inherit" variant="text" className="logout-link" onClick={()=> window.open(params.row.safadetails.SafaAdditionalDetails.insurance_document_url, '_blank')}>
									{t('Insaurance ')}
								</Button>

							</MenuPopover></>
					);
				}
			},
			editable: false,
			sortable: false,
			flex: 0.5,
			minWidth: 75,
		}
	];

	//handle calculation on row select
	useEffect(() => {
		if (selectedRows.length > 0) {
			calculateTotalFees(selectedRows)
			calculateStatusCount(selectedRows)
		} else {
			setTotalFee(0)
			setIncorrectCount([])
			setValidCount([])
			setApprovedCount([])
			setDeniedCount([])
			setPaidCount([])
		}

	}, [selectedRows])

	//handle getTravelerList
	useEffect(() => {
		const fetchVisaDetails = async () => {
			await getVisaTravelersList(travelerlistVisa(itineraryDetails))
			setLoading(false)
		}

		if (itineraryDetails.itineraryId > 0) {
			setLoading(true)
			fetchVisaDetails();
		} else {
			setLoading(false)
		}
	}, [])

	//onselect row calculate fee
	const calculateTotalFees = (travelers) => {
		let today = moment()
		let totalFee = travelers.reduce((sum, traveler) => {
			let passportArivalDate = moment(traveler.details.AdditionalDetails.dateFrom)
			let diffDay = passportArivalDate.diff(today, 'days')
			if( traveler.status === Constants.B2B_VISA_STATUS_VALID && diffDay > 0){
				sum = sum + parseFloat(traveler.visaFeeWithMarkup)
			}
			return sum
		}, 0);
		setTotalFee(parseFloat(totalFee))
	}

	const calculateStatusCount = (travelers) => {
		let today = moment()
		const incorrect = travelers.filter(object => {
			let passportArivalDate = moment(object.details.AdditionalDetails.dateFrom)
			let diffDay = passportArivalDate.diff(today, 'days')

			return object.status === Constants.B2B_VISA_STATUS_INCOMPLETE || (object.status === Constants.B2B_VISA_STATUS_VALID && diffDay <= 0)
		})
		const valid = travelers.filter(object => {
			let passportArivalDate = moment(object.details.AdditionalDetails.dateFrom)
			let diffDay = passportArivalDate.diff(today, 'days')
			return object.status === Constants.B2B_VISA_STATUS_VALID && diffDay > 0
		})
		const approved = travelers.filter(object => object.status === Constants.B2B_VISA_STATUS_APPROVED)
		const denied = travelers.filter(object => object.status === Constants.B2B_VISA_STATUS_DENIED)
		const paid = travelers.filter(object => object.status === Constants.B2B_VISA_STATUS_PAID)
		setIncorrectCount(incorrect)
		setValidCount(valid)
		setApprovedCount(approved)
		setDeniedCount(denied)
		setPaidCount(paid)
	}

	//onclik remove
	const removeTraveler = () => {
		//get ID from incorrectData
		let incorrectIDs = incorrectCount.map(obj => obj.BookingCode)
		//get ID from incorrectData
		let validIDs = validCount.map(obj => obj.BookingCode)

		let removeIds = new Set(incorrectIDs.concat(validIDs))
		const newArray = visaTravelersList.filter(obj => !removeIds.has(obj.BookingCode))
		const removeIdsObject = {
			itinerary: itineraryDetails.saveParentId ? itineraryDetails.saveParentId : itineraryDetails.itineraryId,
			bookingCodes: [...removeIds]
		}
		const removeFromVisaTravelerList = async () => {
			const responseData = await removeVisaTraveler(removeIdsObject);
			if (responseData.status == true) {
				setTeavelersList(newArray)
				if(responseData.data.package && responseData.data.package.type == Constants.VISA_SAFA_STATUS_BOTH) {
					responseData.data.package.displayType = Constants.VISA_SAFA_STATUS_SAVE
				} else {
					responseData.data.package.displayType = responseData.data.package.type
				}
				setSnackAlertOpen(true);
				setSnackbarMessage(`${responseData.message}`);
				settypeOfMessage('success');
				navigate('/visa/traveler-list/' + responseData.data.package.itineraryId, { state: { itineraryDetails: responseData.data.package } });
			} else {
				setSnackAlertOpen(true);
				setSnackbarMessage(`${responseData.message}.`);
				settypeOfMessage('error');
			}
			setLoading(false)
		}
		setLoading(true)
		removeFromVisaTravelerList();
	}

	//onclick send
	const sendVisa = () => {
		//get ID from approvedData
		let approvedIDS = approvedCount.map(obj => obj.AutoId)
		const sendVisaTravelerList = async () => {
			await sendVisaToTraveler(approvedIDS)
			setLoading(false)
		}
		sendVisaTravelerList()
	}

	//edit passenger
	const handleEditClick = (index) => {
		resetPassportData()
		navigate('/visa/edit-traveller/' + index, { state: { passengerId: index, itineraryId: itineraryDetails.itineraryId } });
	}
	//download visa


	// const handleVisaDownload = async (url) => {
	// 	console.log('download', url)
	// 	AxiosDownloadFile(url, 'visa.pdf')

	// 	html2canvas(downloadPdfRef.current).then((canvas) => {
	// 		const imgData = canvas.toDataURL('image/png');

	// 		console.log('imgData', imgData)

	// 		const pdf = new jsPDF();
	// 		const imgProperties = pdf.getImageProperties(imgData);
	// 		const pdfWidth = pdf.internal.pageSize.getWidth();
	// 		const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
	// 		pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
	// 		pdf.save(`VISA_${index}.pdf`);
	// 	});
	// 	window.print();
	// }


	const DataNoRowsOverlay = () => {
		return (
			<NoRowsOverlay emptyText={t('No travellers added')}></NoRowsOverlay>
		)
	}

	const redirectToPayment = () => {
		const valid = selectedRows.filter(object => object.status === 1)
		const allIncorrect = visaTravelersList.filter(object => object.status === 0)
		const allValid = visaTravelersList.filter(object => object.status === 1)
		if (allIncorrect.length > 0) {
			setSnackAlertOpen(true);
			setSnackbarMessage(t('Either remove or fill the details of Incomplete Travelers'));
			settypeOfMessage('error');
			return;
		}
		if (allValid.length == valid.length) {
			navigate('/visa/payment', { state: { itineraryDetails, visaTotalFee: visaTotalFee } });
		} else {
			setSnackAlertOpen(true);
			setSnackbarMessage(t('Either remove or select all the Valid Travelers'));
			settypeOfMessage('error');
		}
	}

	return (
		<>
			{snackAlertOpen && <SnackbarComponent open={snackAlertOpen} onClose={() => setSnackAlertOpen(false)} message={snackbarMessage} typeOfMessage={typeOfMessage} />}
			{visaTravelersList.length > 0 && <Grid container spacing={3} paddingBottom='20px'>
				<Grid item lg={9} md={9} sm={8}>
					<Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
						<Grid item>
							<Button variant='outlined' onClick={() => setShowInvoice(true)} className={classes.travelerListOutlenedBtn} size='small' startIcon={<ReceiptIcon sx={{...(locale.value === 'ar' && {marginLeft: '10px'})}} />} disabled={(paidCount.length + approvedCount.length + deniedCount.length) === 0}>{t('Download Invoice')}</Button>
						</Grid>
					</Grid>
				</Grid>
				{isValidItinerary && <Grid item lg={3} md={3} sm={4}>
					<Grid container direction="row" justifyContent="flex-end" alignItems="center">
						<Grid item>
							<Button variant='outlined' className={classes.travelerListOutlenedBtn} size='small' startIcon={<DeleteForeverIcon />} onClick={removeTraveler} disabled={(incorrectCount.length + validCount.length) === 0}>{t('Remove')} ({incorrectCount.length + validCount.length})</Button>
						</Grid>
					</Grid>
				</Grid>}
			</Grid>}


			<Box style={{ height: visaTravelersList.length > 0 ? 'auto' : '350px' }}>
				<ThemeProvider theme={themeDataGrid}>
					<DataGrid
						rows={visaTravelersList}
						getRowId={(row) => row.AutoId}
						columns={columns}
						className={classes.root}
						checkboxSelection
						onRowSelectionModelChange={(ids) => {
							const selectedIDs = new Set(ids);
							const selectedRows = visaTravelersList.filter((row) =>
								selectedIDs.has(row.AutoId)
							);

							setSelectedRows(selectedRows);
						}}
						disableRowSelectionOnClick
						disableColumnMenu
						hideFooter
						slots={{
							noRowsOverlay: DataNoRowsOverlay,
							loadingOverlay: LinearProgress,
						}}
						loading={loading}
					/>
				</ThemeProvider>
			</Box>

			<Grid container spacing={3} paddingTop='20px'>
				<Grid item lg={4} md={3} sm={4}>
					<Grid container direction="row" justifyContent="flex-start" alignItems="center">
						<Grid item>
							<LoadingButton loading={isLoadingSendVisa} loadingPosition='end' variant='contained' size='medium' className={classes.travelerListContainedBtn} endIcon={<ArrowForwardIcon sx={{ ...(locale.value === 'ar' && { marginRight: '10px' }) }} />} disabled={approvedCount.length === 0} onClick={sendVisa}>{t('Send Visa to traveller')} ({approvedCount.length}) </LoadingButton>
						</Grid>
					</Grid>
				</Grid>
				{isValidItinerary && <Grid item lg={8} md={9} sm={8}>
					<Grid container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
						<Grid item sx={{ paddingTop: '0px!important' }}>
							<Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
								<Grid item sx={{ paddingTop: '0px!important' }}>
									<Box display='flex' flexDirection='column' alignItems='center' sx={{ p: 0.5 }}>
										<Typography variant='caption' color='grey.900'>{t('Visas')}</Typography>
										<Typography variant='body1' color='grey.900'>{validCount.length}</Typography>
									</Box>
								</Grid>
								<Grid item sx={{ paddingTop: '0px!important' }}>
									<Box display='flex' flexDirection='column' alignItems='center' sx={{ p: 0.5 }}>
										<Typography variant='caption' color='grey.900'>&nbsp;</Typography>
										<Typography variant='body1' color='grey.900'><CloseIcon /></Typography>
									</Box>
								</Grid>
								<Grid item sx={{ paddingTop: '0px!important' }}>
									<Box display='flex' flexDirection='column' alignItems='center' sx={{ p: 0.5 }}>
										<Typography variant='caption' color='grey.900'>{t('Price')}</Typography>
										<Typography variant='body1' color='grey.900'>SAR {visaTotalFee.toFixed(2)}</Typography>
									</Box>
								</Grid>
							</Grid>
						</Grid>
						<Grid item sx={{ paddingTop: '0px!important' }}>
							<Button variant='contained' className={classes.travelerListContainedBtn} size='medium' endIcon={<ArrowForwardIcon sx={{ ...(locale.value === 'ar' && { marginRight: '10px' }) }} />} disabled={validCount.length === 0} onClick={redirectToPayment}>{t('PAY AND APPLY')} </Button>
						</Grid>
					</Grid>
				</Grid>}
			</Grid>

			<Invoice showInvoice={showInvoice} setShowInvoice={setShowInvoice}></Invoice>
		</>
	);
}