import React, { useEffect } from 'react';
import { Typography, Grid, Box , LinearProgress,Pagination, Tooltip } from '@mui/material';
import { DataGrid, GridPagination, useGridApiContext, useGridSelector, gridPageCountSelector } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import PanToolIcon from '@mui/icons-material/PanTool';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PendingIcon from '@mui/icons-material/Pending';
//import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import NoRowsOverlay from '../common/DataTableNoRowsOverlay';
import { useGetVisaBookingList } from '../../context/visa/hooks';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import Constants from '../../helpers/constants';
import {titleCase} from '../../helpers/utils';
import LockIcon from '@mui/icons-material/Lock';
import LockClockIcon from '@mui/icons-material/LockClock';
import moment from 'moment/moment';
import { useLocale } from '../../context/LocaleContext';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

function PaginationData({ page, onPageChange, className }) {
	const apiRef = useGridApiContext();
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);


	return (
		<Pagination
			color='primary'
			variant='outlined'
			className={className}
			count={pageCount}
			page={page + 1}
			onChange={(event, newPage) => {
				onPageChange(event, newPage - 1);
			}}
		/>
	);
}

function CustomPagination(props) {
	const { t } = useTranslation();
	return <GridPagination labelRowsPerPage={t('Rows per page')} labelDisplayedRows={({ from, to, count }) => {return '' + from + '-' + to + ' ' + t('of') + ' ' + count}} ActionsComponent={PaginationData} {...props} />;
}


export default function BookingList({ visaList }) {

	const { locale } = useLocale();

	const themeDataGrid = React.useMemo(() => locale.value === 'ar' ? (createTheme({direction: 'rtl'})) : (createTheme({direction: 'ltr'})));
	const { getVisaList, isLoading: isLoadingSendVisa } = useGetVisaBookingList();
	const getVisaTravelersList = useStoreActions(actions => actions.btob.visa.getVisaList)
	useEffect(() => {
		const getBookingList = async () => {
			await getVisaTravelersList(getVisaList());
		}
		getBookingList();
	}, []);
	const { t } = useTranslation();
	const theme = useTheme();
	const navigate = useNavigate();

	const useStyles = makeStyles({
		root: {
			'& .muiltr-t89xny-MuiDataGrid-columnHeaderTitle': {
				[theme.breakpoints.down('md')]: {
					fontSize: '12px !important',
				},
				color: theme.palette.grey[800],
				fontSize: theme.typography.body2,
				fontWeight: theme.typography.fontWeightBold,
				fontFamily: theme.FONT_PRIMARY
			},
			'& .MuiDataGrid-columnHeaders': {
				background: theme.palette.grey[300],
				border: '1px solid',
				borderColor: theme.palette.grey[400],
				borderRadius: 'inherit'
			},
			'& .MuiDataGrid-columnHeaderTitle': {
				color: theme.palette.grey[800],
				fontSize: theme.typography.body2,
				fontWeight: theme.typography.fontWeightBold,
				fontFamily: theme.FONT_PRIMARY
			},
			'& .MuiDataGrid-row': {
				borderBottom: '2px solid',
				borderBottomColor: theme.palette.grey[400]
			},
			'&.MuiDataGrid-root .MuiDataGrid-columnHeader, &.MuiDataGrid-root .MuiDataGrid-cell, &.MuiDataGrid-root .MuiDataGrid-cellCheckbox:focus': {
				outline: 'none !important',
			},
			'& .MuiDataGrid-columnSeparator': {
				display: 'none !important',
			},
			border: 'none !important',
			height: Object.keys(visaList).length > 0 ? 'auto' : '350px',
		},
	});
	const classes = useStyles();
	const handleItineraryClick = (params) => {
		let itineraryDetails = params.row;
		itineraryDetails.displayType = params.row.type == Constants.VISA_SAFA_STATUS_BOTH ? Constants.VISA_SAFA_STATUS_SAVE : params.row.type;
		navigate('/visa/traveler-list' + '/' + itineraryDetails.itineraryId, { state : {itineraryDetails}});
	}
	const visaBookingNoRowsOverlay = () => {
		return (
			<NoRowsOverlay emptyText={t('No Visa Bookings')}></NoRowsOverlay>
		)
	}

	const showAlertMsg = (params) => {
		if(params) {
			let today = moment()
			let lastDay = moment(params.requestExpire)
			let validityDays = lastDay.diff(today, 'days')

			if (validityDays < 0) {
				return (<Tooltip title={t('Itinerary expired')}><LockIcon fontSize={'small'} color={'error'} sx={{verticalAlign: 'top'}}/></Tooltip>)
			} else if (validityDays == 0) {
				return <Tooltip title={t('Itinerary will be expire today')}><LockClockIcon fontSize={'small'} color={'warning'} sx={{verticalAlign: 'top'}}/></Tooltip>
			} else if (validityDays == 1) {
				return <Tooltip title={t('Itinerary will be expire tomorrow')}><LockClockIcon fontSize={'small'} color={'warning'} sx={{verticalAlign: 'top'}}/></Tooltip>
			} else if (validityDays > 1 && validityDays < Constants.VISA_EXPIRE_ALERT_DAYS) {
				return <Tooltip title={t('Itinerary will be expire within') + ' ' + validityDays + ' ' + t('days')}><LockClockIcon fontSize={'small'} color={'warning'} sx={{verticalAlign: 'top'}}/></Tooltip>
			}
		}
	}

	const columns = [
		{
			field: 'itineraryId',
			headerName: t('Itenirary Id'),
			flex: 1.5,
			minWidth: 100,
			cellClassName: 'itenirarynumbertitle',
			renderCell: (params) => (
				<Grid
					onClick={() => handleItineraryClick(params)}
					style={{ cursor: 'pointer', textDecoration: 'none', color: theme.palette.grey[800] }}
				>
					{showAlertMsg(params.row)}
					{params.row.itineraryId}
				</Grid>
			)
		},
		{
			field: 'intRef',
			headerName: t('Int Ref'),
			flex: 1,
			minWidth: 100,
		},
		{
			field: 'passengerCount',
			headerName: t('Travellers'),
			flex: 1,
			minWidth: 100,
		},
		{
			field: 'leadPassenger',
			headerName: t('Lead Passenger'),
			flex: 2,
			minWidth: 125,
		},
		{
			field: 'requestDate',
			headerName: t('Request Date'),
			flex: 2,
			minWidth: 125,
		},
		{
			field: 'requestExpire',
			headerName: t('Request Expire Date'),
			flex: 2,
			minWidth: 175,
		},
		{
			field: 'statusCount',
			headerName: t('Status'),
			flex: 1,
			sortable: false,
			minWidth: 250,
			renderCell: (params) => {
				return (
					<>
						<Tooltip title={titleCase(t('incomplete'))}>
							<Typography variant='body2' color='error' className='MuiDataGrid-cellContent VisaPassenger-statusText'>
								<WarningAmberIcon /> {params.row.statusCount.incomplete}
							</Typography>
						</Tooltip>
						<Tooltip title={titleCase(t('valid'))}>
							<Typography variant='body2' color='info.main' className='MuiDataGrid-cellContent VisaPassenger-statusText'>
								<CheckIcon /> {params.row.statusCount.valid}
							</Typography>
						</Tooltip>
						<Tooltip title={titleCase(t('paid'))}>
							<Typography variant='body2' color='warning.dark' className='MuiDataGrid-cellContent VisaPassenger-statusText'>
								<PendingIcon /> {params.row.statusCount.paid}
							</Typography>
						</Tooltip>
						<Tooltip title={titleCase(t('denied'))+'/'+titleCase(t('rejected'))}>
							<Typography variant='body2' color='error' className='MuiDataGrid-cellContent VisaPassenger-statusText'>
								<PanToolIcon /> {params.row.statusCount.denied + params.row.statusCount.rejected}
							</Typography>
						</Tooltip>
						<Tooltip title={titleCase(t('refund'))}>
							<Typography variant='body2' color='warning.main' className='MuiDataGrid-cellContent VisaPassenger-statusText'>
								<KeyboardReturnOutlinedIcon /> {params.row.statusCount.refunded}
							</Typography>
						</Tooltip>
						<Tooltip title={titleCase(t('approved'))}>
							<Typography variant='body2' color='success.main' className='MuiDataGrid-cellContent VisaPassenger-statusText'>
								<CheckIcon /> {params.row.statusCount.approved}
							</Typography>
						</Tooltip>
					</>
				);

			},
		},
	];


	return (
		<Box>
			<ThemeProvider theme={themeDataGrid}>
				<DataGrid
					className={classes.root}
					rows={Object.entries(visaList).map(([id,booking]) => ({ ...booking, id}))}
					columns={columns}
					getRowId={(row) => row.itineraryId}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
						sorting: {
							sortModel: [{ field: 'requestDate', sort: 'desc' }],
						},
					}}
					pageSizeOptions={[5, 10, 25]}
					slots={{
						loadingOverlay: LinearProgress,
						noRowsOverlay: visaBookingNoRowsOverlay,
						pagination: CustomPagination,
					}}
					hideFooter={Object.entries(visaList).length > 0 ? false : true}
					loading={isLoadingSendVisa}
					disableColumnMenu
				/>
			</ThemeProvider>
		</Box>
	);
}