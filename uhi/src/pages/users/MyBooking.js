import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import { Container, Grid, Box, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import Booking from '../../components/users/Booking'
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useBookingList } from '../../context/booking/hooks';
import { useFormik, Form, FormikProvider } from 'formik';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useTheme } from '@mui/material/styles';

const MyBooking = () => {
	const { t } = useTranslation();
	const { getBookingList, isLoading } = useBookingList();
	const theme = useTheme();
	const bookingListLastPage = useStoreState(s => s.btoc.getBookinglistLastPage);
	const getBookingResults = useStoreActions(actions => actions.btoc.getBookingResults);
	let [pageNo, setPageNo] = useState(1);
	let [searchStatus, setSearchStatus] = useState('ALL');
	let [itinId, setItinId] = useState('');
	const setRebook = useStoreActions(actions => actions.btoc.itineraryDetails.setRebook);
	const resetFailedItineraryDetails = useStoreActions(actions => actions.btoc.resetFailedItineraryDetails);
	setRebook(false);
	resetFailedItineraryDetails()
	const handlePaginationChange = (event, value) => {
		setPageNo(value);
		fetchBookingList(value, searchStatus, itinId);
	}

	useEffect(() => {
		fetchBookingList(pageNo, searchStatus, itinId);
	}, []);

	const fetchBookingList = async (pageNo, searchStatus, itinId) => {
		setPageNo(pageNo);
		await getBookingResults(getBookingList(pageNo, searchStatus, itinId));
	}

	
	const formik = useFormik({
		initialValues: {
			BookingRef: itinId,
			BookingStatus: searchStatus,
		},
		onSubmit: values => {
			console.log('values->',values);
			fetchBookingList(pageNo, values.BookingStatus, values.BookingRef);
		},
	});

	const handleResetButtonClick = () => {
		setSearchStatus('ALL');
		setPageNo(1);
		setItinId('');
		fetchBookingList(1, searchStatus, itinId);
		formik.values['BookingRef'] = itinId;
		formik.values['BookingStatus'] = searchStatus;
	};


	return (
		<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important', minHeight: '460px', }}>
			<Page title={t('myBooking.title')}>
				<Grid className="bookingContainer" container justifyContent='center'>
					<Box sx={{width: '100%'}}>
						<Grid className="bookingInnerSec">
							<Paper>
								<Typography className="mybookingHeader">{t('My Bookings')}</Typography>
								<FormikProvider value={formik}>
									<Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
										<Grid item xs container direction="row" spacing={1}>
											<Grid item xs={12} sm={6} md={3}>
												<TextField
													fullWidth
													type="text"
													label={t('Booking Reference')}
													value={formik.values.BookingRef}
													onChange={(newValue) => {formik.setFieldValue('BookingRef', (newValue) ? newValue.target.value : '')}}
												/>
											</Grid>
											<Grid item xs={12} sm={6} md={3}>
												<FormControl fullWidth>
													<InputLabel id="demo-simple-select-label">{t('Booking Status')}</InputLabel>
													<Select
														labelId="demo-simple-select-label"
														id="demo-simple-select"
														label='Booking Status'
														value={formik.values.BookingStatus}
														onChange={(newValue) => {formik.setFieldValue('BookingStatus', (newValue) ? newValue.target.value : '')}}
													>
														<MenuItem value='ALL'>{t('ALL')}</MenuItem>
														<MenuItem value={'CONFIRMED'}>{t('CONFIRMED')}</MenuItem>
														<MenuItem value={'SAVED'}>{t('SAVED')}</MenuItem>
														<MenuItem value={'PENDING'}>{t('PENDING')}</MenuItem>
														<MenuItem value={'CANCELLED'}>{t('CANCELLED')}</MenuItem>
														<MenuItem value={'INCOMPLETE'}>{t('INCOMPLETE')}</MenuItem>
													</Select>
												</FormControl>
											</Grid>
											<Grid item xs={12} sm={6} md={3}>
												<Button
													variant="contained"
													fullWidth
													size='large'
													sx={{ boxShadow: 0, fontSize: { lg: theme.typography.overline.fontSize, xs: theme.typography.overline.fontSize, md: theme.typography.body2.fontSize, sm: theme.typography.body2.fontSize } }}
													type='submit'
												>
													{t('Filter')}
													<FilterAltIcon sx={{ fontSize: { lg: 'medium', xs: 'medium', sm: 'large', md: 'large' } }} />
												</Button>
											</Grid>
											<Grid item xs={12} sm={6} md={3}>
												<Button
													variant="contained"
													fullWidth
													size='large'
													sx={{ boxShadow: 0, fontSize: { lg: theme.typography.overline.fontSize, xs: theme.typography.overline.fontSize, md: theme.typography.body2.fontSize, sm: theme.typography.body2.fontSize } }}
													type='button'
													onClick={() => handleResetButtonClick()}
												>
													{t('Reset')}
													<RestartAltIcon sx={{ fontSize: { lg: 'medium', xs: 'medium', sm: 'large', md: 'large' } }} />
												</Button>
											</Grid>
										</Grid>
									</Form>
								</FormikProvider>
								<Booking isLoading={isLoading} />
								<Grid item xs container direction="row" spacing={1} className="pagination-sec-align">
									<Stack spacing={1}>
										<Pagination count={bookingListLastPage} showFirstButton showLastButton page={pageNo} onChange={handlePaginationChange} />
									</Stack>
								</Grid>
							</Paper>
						</Grid>
					</Box>
				</Grid>
			</Page>
		</Container>
	);
}

export default MyBooking;