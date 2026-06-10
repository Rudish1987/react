import React, {useEffect} from 'react'
import { Typography, Stack, Grid, Box, AccordionDetails, AccordionSummary } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStoreState } from 'easy-peasy';
import '../../css/bookingConfirmation.css';
import Constants from '../../helpers/constants';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckIcon from '@mui/icons-material/Check';
import PanToolIcon from '@mui/icons-material/PanTool';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocale } from '../../context/LocaleContext';

const useStyles = makeStyles({
	root: {
		'&.MuiDataGrid-root .MuiDataGrid-columnHeader, &.MuiDataGrid-root .MuiDataGrid-cell, &.MuiDataGrid-root .MuiDataGrid-cellCheckbox:focus': {
			outline: 'none !important',
		},
		'&MuiDataGrid-overlayWrapperInner':{
			width: 'auto',
		}
	},
});

export const InvoiceDetails = () => {
	const classes = useStyles();
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [visaTotalFee, setTotalFee] = React.useState(0);
	const visaTravelersList = useStoreState(s => s.btob.visa.travelersList)
	const [tableListToDownload, setTableListToDownload] = React.useState(visaTravelersList);
	const themeDataGrid = React.useMemo(() => locale.value === 'ar' ? (createTheme({direction: 'rtl'})) : (createTheme({direction: 'ltr'})));

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
			flex: 1.5,
			renderCell: (params) => {
				const icons = [
					<Typography variant='body2' color='error' key='0' className='MuiDataGrid-cellContent VisaPassenger-statusText'><WarningAmberIcon/>{t('Incomplete Data')}</Typography>,
					<Typography variant='body2' color='info.main' key='1' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><CheckIcon />{t('Valid , not Sent')}</Typography>,
					<Typography variant='body2' color='success.main' key='2' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><CheckIcon/>{t('VISA Approved')}</Typography>,
					<Typography variant='body2' color='error' key='3' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><PanToolIcon/>{t('VISA Denied')}</Typography>,
					<Typography variant='body2' color='warning.dark' key='4' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><CheckIcon/>{t('Valid, Paid')}</Typography>,
					<Typography variant='body2' color='error' key='5' className='MuiDataGrid-cellContent  VisaPassenger-statusText'><PanToolIcon/>{t('VISA Rejected')}</Typography>
				]
				let defaultCode = 0;
				return icons[params.row.status] || icons[defaultCode];
			},
			minWidth: 150,
			editable: false,
			sortable: false,
		},
		{
			field: 'passport',
			headerName: t('Passport'),
			...commonFieldProps,
		},
		{
			field: 'name',
			headerName: t('Name'),
			valueGetter: (params) =>
				`${params.row.FirstName || ''} ${params.row.LastName || ''}`,
			flex: 2,
			editable: false,
			sortable: false,
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
			flex: 1,
			minWidth: 75,
			editable: false,
			sortable: false,
		},
		{
			field: 'nationality',
			headerName: t('Nationality'),
			...commonFieldProps,
		},
	];

	useEffect(() => {
		const calculateTotalFees = (travelers) => {
			let totalFee = travelers.reduce((sum, traveler) => {
				if( traveler.status === Constants.B2B_VISA_STATUS_APPROVED ||  traveler.status === Constants.B2B_VISA_STATUS_DENIED || traveler.status === Constants.B2B_VISA_STATUS_PAID || traveler.status === Constants.B2B_VISA_STATUS_REJECTED){
					sum = sum + parseFloat(traveler.visaFeeWithMarkup)
				}
				return sum
			},0);
			setTotalFee(parseFloat(totalFee))
		}
		calculateTotalFees(visaTravelersList);

		const listToBeDownloaded = (travelers) => {
			const list = travelers.filter(object => object.status === 2 || object.status === 3 || object.status === 4 || object.status === 5 )
			setTableListToDownload(list);
		}
		listToBeDownloaded(visaTravelersList);
	},[])

	return (
		<>
			<AccordionSummary className="invoice-tbl">
				<Grid container direction="row">
					<Grid item xs={12} lg={4}>
						<Typography className="invoice-tbl-title">{t('Invoice Details')}</Typography>
					</Grid>
				</Grid>
			</AccordionSummary>
			<AccordionDetails sx={{ px: 0, pb: 0, pt: 3 }}>

				<Stack style={{ height: visaTravelersList.length > 0 ? 'auto' : '350px'}}>
					<ThemeProvider theme={themeDataGrid}>
						<DataGrid
							rows={tableListToDownload}
							getRowId={(row) => row.AutoId}
							columns={columns}
							className={classes.root}
							disableRowSelectionOnClick
							disableColumnMenu
							hideFooter
						/>
					</ThemeProvider>
				</Stack>

				{/* Total cost calculation*/}
				<Box sx={{ bgcolor: '#F5F5F5', pt: 2 }}>
					<Grid sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
						<Grid container
							direction="row" sx={{ mb: 2 }}>
							<Grid item xs={10} lg={10} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} >
								<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text' }}>{t('Total')}</Typography>
							</Grid>
							<Grid item xs={2} lg={2} sx={{ display: 'flex', alignItems: 'center', color: '#282E36' }} >
								<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
									<Typography paragraph={true} sx={{ fontSize: 14, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(Constants.B2B_DEFAULT_CURRENCY)}</Typography>
									<Typography paragraph={true} sx={{ fontSize: 24, color: 'Grey/900 - Main text', fontWeight: 600 }}>{visaTotalFee.toFixed(2)}</Typography>
								</Stack>
							</Grid>

						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</>
	)

}