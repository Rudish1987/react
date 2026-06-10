import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField, Typography, FormControlLabel, Switch } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import { useTranslation } from 'react-i18next';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormik, Form, FormikProvider } from 'formik';
import BookingList from './BookingList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useTheme, styled } from '@mui/material/styles';
import { useStoreState } from 'easy-peasy';
import { useLocale } from '../../context/LocaleContext';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import DateRangePicker from 'react-daterange-picker';
import { extendMoment } from 'moment-range';
import 'react-daterange-picker/dist/css/react-calendar.css';
import {titleCase} from '../../helpers/utils';

export default function FilterList() {
	const momentRange = extendMoment(moment);
	const today = momentRange();
	const [dateRangeRequestState, setdateRangeRequestState] = useState({
		isOpen: false,
		value: momentRange.range(today.clone().subtract(7, 'days'), today.clone())
	});
	const [dateRangeExpiryState, setDateRangeExpiryState] = useState({
		isOpen: false,
		value: momentRange.range(today.clone(), today.clone().add(7, 'days'))
	});
	const { locale } = useLocale();
	const { t } = useTranslation();
	const theme = useTheme();
	const visaTravellersList = useStoreState(s => s.btob.visa.visaList);
	const ErrorMsg = styled(Typography)(({ theme }) => ({
		textAlign: 'left',
		color: theme.palette.primary.main,
		fontFamily: 'Montserrat',
		fontWeight: 500,
		fontSize: 10,
		lineHeight: '160%'
	}));

	const travellersList = visaTravellersList !== undefined ? visaTravellersList : {};
	let statusFilter = Object.keys(travellersList).length > 0 ? travellersList[Object.keys(travellersList)[0]].statusCount : {};
	const [visaList, setVisaList] = useState(travellersList);
	const [filterLoading, setFilterLoading] = useState(false);
	const [isRequestDateRangePicker, setIsRequestDateRangePicker] = useState(false);
	const [isExpireRangePicker, setIsExpireDateRangePicker] = useState(false);

	const validate = values => {
		const errors = {}

		if (values.requestDate && values.requestExpire && values.requestDate > values.requestExpire) {
			errors.requestExpire = t('Expiry Date should be greater than Request Date')
		}
		return errors;
	}


	const formik = useFormik({
		initialValues: {
			itineraryIdOrIntRef: '',
			requestDate: null,
			requestExpire: null,
			requestDateRange: { startDateRequest: dateRangeRequestState.value.start, endDateRequest: dateRangeRequestState.value.end },
			expireDateRange: { startDateExpire: dateRangeExpiryState.value.start, endDateExpire: dateRangeExpiryState.value.end },
			statusCount: '',
		},
		validate,
		onSubmit: values => {
			setFilterLoading(true);
			values.requestDate = values.requestDate != null ? moment(values.requestDate).format('YYYY-MM-DD') : null;
			values.requestExpire = values.requestExpire != null ? moment(values.requestExpire).format('YYYY-MM-DD') : null;

			values.requestDateRange.startDateRequest = dateRangeRequestState.value.start != null ? moment(dateRangeRequestState.value.start).format('YYYY-MM-DD') : null;
			values.requestDateRange.endDateRequest = dateRangeRequestState.value.end != null ? moment(dateRangeRequestState.value.end).format('YYYY-MM-DD') : null;

			values.expireDateRange.startDateExpire = dateRangeExpiryState.value.start != null ? moment(dateRangeExpiryState.value.start).format('YYYY-MM-DD') : null;
			values.expireDateRange.endDateExpire = dateRangeExpiryState.value.end != null ? moment(dateRangeExpiryState.value.end).format('YYYY-MM-DD') : null;
			filterItems(values);
		},
	});
	const { getFieldProps } = formik;

	const handleRequestDateRangeToggle = () => {
		if (isRequestDateRangePicker == false && formik.values['requestDate'] != null) {
			formik.values['requestDate'] = null;
		}
		setIsRequestDateRangePicker(!isRequestDateRangePicker);
	}
	const handleExpireDateRangeToggle = () => {
		if (isExpireRangePicker == false && formik.values['requestExpire'] != null) {
			formik.values['requestExpire'] = null;
			formik.errors['requestExpire'] = '';
		}
		setIsExpireDateRangePicker(!isExpireRangePicker);
	}

	const handleResetButtonClick = (values) => {
		setVisaList({ ...travellersList });
		Object.keys(values).forEach(key => {
			formik.values[key] = values[key];
			formik.errors[key] = '';
		})
		if (isRequestDateRangePicker) {
			handleRequestDateRangeToggle();
		}
		if (isExpireRangePicker) {
			handleExpireDateRangeToggle();
		}
	};
	useEffect(() => {
		setVisaList({ ...travellersList });
	}, [travellersList])

	const isdateWithinRange = (dateToCheck, startDate, endDate) => {
		const checkDate = new Date(dateToCheck);
		const startRange = new Date(startDate);
		const endRange = new Date(endDate);

		return checkDate >= startRange && checkDate <= endRange
	}


	const filterItems = (values) => {
		if (values.itineraryIdOrIntRef !== null && values.itineraryIdOrIntRef !== '') {
			let tempItems = Object.values(travellersList).filter((item) => {
				return (item['itineraryId'].toString().includes(values.itineraryIdOrIntRef) || item['intRef'].toString().includes(values.itineraryIdOrIntRef));
			})
			setVisaList(tempItems);
		}
		else if (Object.values(values).length > 0) {
			let tempItems = Object.values(travellersList).filter((item) => {

				return Object.keys(values).every((key) => {
					if (values[key] !== null && values[key] !== '') {
						if (item[key] === null) {
							return false;
						}
						if (((key == 'requestDate' && !isRequestDateRangePicker) || (key == 'requestExpire' && !isExpireRangePicker)) && item[key] !== null && item[key].toString() !== values[key].toString()) {
							return false;
						}
						if (((key == 'requestDateRange' && isRequestDateRangePicker) || (key == 'expireDateRange' && isExpireRangePicker)) && item['requestDate'] !== null) {
							if (key == 'requestDateRange' && values[key].startDateRequest && values[key].endDateRequest) {
								return isdateWithinRange(item['requestDate'], values[key].startDateRequest, values[key].endDateRequest)
							}
							if (key == 'expireDateRange' && values[key].startDateExpire && values[key].endDateExpire) {
								return isdateWithinRange(item['requestExpire'], values[key].startDateExpire, values[key].endDateExpire)
							}
						}
						if (key == 'statusCount' && key != 'itineraryId' && key != 'intRef' && item[key] !== null && values['statusCount'] !== '') {
							let recordFound = false;
							let statusCountArr = Object.keys(item[key]);
							statusCountArr.map((object) => {
								if (object == values[key] && item[key][object] > 0) {
									recordFound = true;
								}
							})
							return recordFound;
						}
					}
					return true;
				})
			})
			setVisaList(tempItems);
		} else {
			setVisaList({ ...travellersList });
		}
		setFilterLoading(false);
	};


	const onSelectRequestDate = (value) => {
		setdateRangeRequestState({ ...dateRangeRequestState, isOpen: !dateRangeRequestState.isOpen, value });
	};
	const onSelectExpirationDate = (value) => {
		setDateRangeExpiryState({ ...dateRangeExpiryState, isOpen: !dateRangeExpiryState.isOpen, value });
	};

	const onToggleRequestDate = () => {
		setdateRangeRequestState({ ...dateRangeRequestState, isOpen: !dateRangeRequestState.isOpen });
	};

	const onToggleExpiryDate = () => {
		setDateRangeExpiryState({ ...dateRangeExpiryState, isOpen: !dateRangeExpiryState.isOpen });
	};

	return (
		<>
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
					<Grid className='Visasection-col'>
						<Grid container spacing={2}>
							{Object.keys(travellersList).length > 0 && (<>
								<Grid sm={12} xs={12} md={4} lg={2} item>
									<TextField
										fullWidth
										id="itineraryIdOrIntRef"
										label={t('Id or Int Ref')}
										type="text"
										{...getFieldProps('itineraryIdOrIntRef')}
										value={formik.values.itineraryIdOrIntRef}
										onChange={(newValue) => {
											formik.setFieldValue('itineraryIdOrIntRef', (newValue) ? newValue.target.value : '')
										}}
									/>
								</Grid>
								<Grid sm={6} xs={12} md={4} lg={3} item sx={{ marginTop: { xs: '-10px', md: '-30px' } }}>
									<FormControlLabel control={<Switch size='small' checked={isRequestDateRangePicker} onChange={handleRequestDateRangeToggle} />} label={<Typography variant='tooltip' color='grey.600' fontWeight='fontWeightSemiBold'>{t('Switch date range')}</Typography>} sx={{ marginBottom: '6px' }} />
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										{!isRequestDateRangePicker ?
											(<DatePicker
												fullWidth
												label={t('Request Date')}
												value={formik.values.requestDate}
												{...getFieldProps('requestDate')}
												onChange={(newValue) => {
													formik.setFieldValue('requestDate', newValue)
												}}
												renderInput={(params) => (<TextField {...params}
													sx={{
														...(locale.value === 'ar' && {
															'& .muiltr-1vu5cr0-MuiFormLabel-root-MuiInputLabel-root': {
																left: '20%'
															}
														}),
														width: '100%'
													}}
												/>)}
												inputFormat={'yyyy-MM-dd'}
												mask={'____-__-__'}
												maxDate={formik.values.requestExpire}

											/>) :
											(<>
												<TextField
													fullWidth
													id="outlined--input"
													label={t('Request Date Range')}
													value={dateRangeRequestState.value ? `${dateRangeRequestState.value.start.format('YYYY-MM-DD')} - ${dateRangeRequestState.value.end.format('YYYY-MM-DD')}` : 'No Dates Selected'}
													onClick={onToggleRequestDate}
												/>
												{dateRangeRequestState.isOpen && (
													<DateRangePicker
														fullWidth
														value={dateRangeRequestState.value}
														onSelect={onSelectRequestDate}
														singleDateRange={true}
													/>
												)}</>)
										}
									</LocalizationProvider>
								</Grid>
								<Grid sm={6} xs={12} md={4} lg={3} item sx={{ marginTop: { xs: '-10px', md: '-30px' } }}>
									<FormControlLabel control={<Switch size='small' checked={isExpireRangePicker} onChange={handleExpireDateRangeToggle} />} label={<Typography variant='tooltip' color='grey.600' fontWeight='fontWeightSemiBold'>{t('Switch date range')}</Typography>} sx={{ marginBottom: '6px' }} />
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										{!isExpireRangePicker ? (<><DatePicker
											fullWidth
											label={t('Expiry Date')}
											value={formik.values.requestExpire}
											{...getFieldProps('requestExpire')}
											onChange={(newValue) => {
												formik.setFieldValue('requestExpire', (newValue))
											}}
											renderInput={(params) => (<TextField {...params}
												sx={{
													...(locale.value === 'ar' && {
														'& .muiltr-1vu5cr0-MuiFormLabel-root-MuiInputLabel-root': {
															left: '20%'
														}
													}),
													width: '100%'
												}}
											/>)}
											inputFormat={'yyyy-MM-dd'}
											mask={'____-__-__'}
											minDate={formik.values.requestDate}
										/>
										</>) :
											(<>
												<TextField
													fullWidth
													id="outlined--input"
													label={t('Expiry Date Range')}
													value={dateRangeExpiryState.value ? `${dateRangeExpiryState.value.start.format('YYYY-MM-DD')} - ${dateRangeExpiryState.value.end.format('YYYY-MM-DD')}` : 'No Dates Selected'}
													onClick={onToggleExpiryDate}
												/>
												{dateRangeExpiryState.isOpen && (
													<DateRangePicker
														fullWidth
														value={dateRangeExpiryState.value}
														onSelect={onSelectExpirationDate}
														singleDateRange={true}
													/>
												)}</>)}
									</LocalizationProvider>
									{!isRequestDateRangePicker && !isExpireRangePicker && formik.errors.requestExpire ? <ErrorMsg> {formik.errors.requestExpire} </ErrorMsg> : ''}
								</Grid>
								<Grid sm={6} xs={12} md={4} lg={2} item>
									<FormControl
										sx={{
											width: '100%'
										}}>
										<InputLabel id="select-label">{t('Visa Status')}</InputLabel>
										<Select
											labelId="select-label"
											id="simple-select"
											label={t('Visa Status')}
											value={formik.values.statusCount}
											{...getFieldProps('statusCount')}
											onChange={(newValue) => {
												formik.setFieldValue('statusCount', (newValue) ? newValue.target.value : '')
											}}
										>
											<MenuItem value={''}>{t('None')}</MenuItem>
											{Object.keys(statusFilter).map((object, i) => <MenuItem value={object} key={i} >{titleCase(t(object))}</MenuItem>)}
										</Select>
									</FormControl>
								</Grid>
								<Grid sm={3} xs={6} md={2} lg={1} item>
									<LoadingButton
										variant="contained"
										fullWidth
										size='large'
										sx={{ boxShadow: 0, fontSize: { lg: theme.typography.overline.fontSize, xs: theme.typography.overline.fontSize, md: theme.typography.body2.fontSize, sm: theme.typography.body2.fontSize } }}
										type='submit'
										loading={filterLoading}
										loadingPosition='center'
									>
										{t('Filter')}
										<FilterAltIcon sx={{ fontSize: { lg: 'medium', xs: 'medium', sm: 'large', md: 'large' } }} />
									</LoadingButton>
								</Grid>
								<Grid sm={3} xs={6} md={2} lg={1} item>
									<Button
										variant="contained"
										fullWidth
										size='large'
										sx={{ boxShadow: 0, fontSize: { lg: theme.typography.overline.fontSize, xs: theme.typography.overline.fontSize, md: theme.typography.body2.fontSize, sm: theme.typography.body2.fontSize } }}
										type='button'
										onClick={() => handleResetButtonClick({ itineraryIdOrIntRef: '', requestDate: null, requestExpire: null, requestDateRange: { startDateRequest: null, endDateRequest: null }, expireDateRange: { startDateExpire: null, endDateExpire: null }, statusCount: '' })}
									>
										{t('Reset')}
										<RestartAltIcon sx={{ fontSize: { lg: 'medium', xs: 'medium', sm: 'large', md: 'large' } }} />
									</Button>
								</Grid></>)
							}
						</Grid>
					</Grid>
				</Form>
			</FormikProvider>
			<BookingList visaList={visaList} />
		</>
	);
}