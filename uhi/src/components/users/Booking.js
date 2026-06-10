import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Box, Grid, LinearProgress, } from '@mui/material';
import { useStoreState, useStoreActions } from 'easy-peasy';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { useNavigate } from 'react-router-dom';
import Constants from '../../helpers/constants';
import '../../css/myBookings.css';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useLocale } from '../../context/LocaleContext';
import NoRowsOverlay from '../common/DataTableNoRowsOverlay';


const MyBooking = ({ isLoading }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { locale } = useLocale();
	const themeDataGrid = React.useMemo(() => locale.value === 'ar' ? (createTheme({direction: 'rtl'})) : (createTheme({direction: 'ltr'})));
	const theme = useTheme();
	let newBookingData = useStoreState(s => s.btoc.newBookinglist);
	const resetStatePackage = useStoreActions(actions => actions.btoc.itineraryDetails.resetState);
	const resetAfterBookingPackageDetails = useStoreActions(actions => actions.btoc.resetAfterBookingpackagedetails);
	const setSavedItineraryId = useStoreActions(actions => actions.btoc.itineraryDetails.setSavedItineraryId);
	let myBookingData = newBookingData !== undefined ? newBookingData : [];
	let [tableData, setTableData] = useState(myBookingData);
	//let [tableData, setTableData] = useState(newBookingData);

	useEffect(() => {
		setTableData(myBookingData);
	}, [newBookingData])
	//useEffect(() => {
	//	setTableData(newBookingData);
	//}, [newBookingData])

	const handleClick = (bookingCode, status) => {
		/*whther its savedor confirm in both cases need to load new data in store and use that
		* so we need to reset irrespective of status
		* */
		resetStatePackage();
		resetAfterBookingPackageDetails();
		if (status == 'SAVED') {
			setSavedItineraryId(bookingCode);
			navigate(Constants.USER_PASSENGER_URL);
		} else {
			navigate(Constants.USER_BOOKING_DETAILS, { state: { mainParentBookingCode: bookingCode } });
		}
	}

	const visaBookingNoRowsOverlay = () => {
		return (
			<NoRowsOverlay emptyText={t('No Package Bookings')}></NoRowsOverlay>
		)
	}


	const columns = [
		{
			field: 'booking_code',
			headerName: t('Booking Reference'),
			flex: 1,
			minWidth: 175,
			renderCell: (params) => (
				<Grid
					onClick={() => handleClick(params.row.booking_code, params.row.booking_status)}
					style={{ cursor: 'pointer', textDecoration: 'none', color: theme.palette.grey[800] }}
				>
					{(params.row.booking_status == 'CONFIRMED-Visa Approved') &&<CheckBoxRoundedIcon className='checboxicon' />}
					{(params.row.booking_status == 'SAVED') &&<NotificationImportantIcon className='importanticon' />}
					{(params.row.booking_status == 'CONFIRMED-Visa pending') &&<WarningAmberRoundedIcon className='warningicon' />}
					{(params.row.booking_status == 'Traveled') &&<CheckBoxRoundedIcon className='checboxTraveledicon' />}
					{(params.row.booking_status == 'CANCELLED') &&<NotificationImportantIcon className='importanticon' />}
					{(params.row.booking_status == 'INCOMPLETE') &&<WarningAmberRoundedIcon className='warningicon' />}
					{params.row.booking_code}
				</Grid>
			)
		},
		{
			field: 'arrival_date',
			headerName: t('Arrival Date'),
			flex: 1,
			minWidth: 120,
		},
		{
			field: 'adults',
			headerName: t('PAX'),
			flex: 2,
			minWidth: 100,
		},
		{
			field: 'lead_first_name',
			headerName: t('Lead Passenger'),
			flex: 2,
			minWidth: 125,
		},
		{
			field: 'booking_status',
			headerName: t('Booking Status'),
			flex: 2,
			minWidth: 175,
		},
	];


	return (
		<>
			<Box sx={{marginTop: '20px'}} style={{ height: tableData.length > 0 ? 'auto' : '350px' }}>
				<ThemeProvider theme={themeDataGrid}>
					<DataGrid
						//className={classes.root}
						//rows={Object.entries(visaList).map(([id, booking]) => ({ ...booking, id }))}
						rows={Object.entries(tableData).map(([id, booking]) => ({ ...booking, id }))}
						columns={columns}
						getRowId={(row) => row.booking_code}
						pageSizeOptions={[5, 10, 25]}
						slots={{
							loadingOverlay: LinearProgress,
							noRowsOverlay: visaBookingNoRowsOverlay,
						}}
						loading={isLoading}
						disableRowSelectionOnClick
						disableColumnMenu
						hideFooter
					/>
				</ThemeProvider>
			</Box>
		</>
	);
}

export default MyBooking;