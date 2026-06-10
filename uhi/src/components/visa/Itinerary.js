import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Tooltip, InputAdornment } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useInternalReferenceApi } from '../../context/visa/hooks'
import {useStoreActions, useStoreState} from 'easy-peasy'
import {titleCase} from '../../helpers/utils';
import LockIcon from '@mui/icons-material/Lock';
import LockClockIcon from '@mui/icons-material/LockClock';
import Constants from '../../helpers/constants';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export default function Itenerary({ itineraryDetails }) {
	const { t } = useTranslation();
	let currentDate = moment(new Date()).format('DD/MM/YYYY');
	let requestDate = moment(itineraryDetails.requestDate).format('DD/MM/YYYY');
	const visaTravelersList = useStoreState(s => s.btob.visa.travelersList)
	const isValidItinerary = useStoreState(s => s.btob.visa.isValidItinerary)
	const validItineraryUpto = useStoreState(s => s.btob.visa.validItineraryUpto)
	const getItineraryDetails = useStoreActions(actions => actions.btob.visa.getItineraryDetails)
	const [validityDays, setValidityDays] = useState(0)

	const [showReferenceText, setShowReferenceText] = useState(true);
	const [referenceModeEdit, setReferenceModeEdit] = useState(false);
	const [intRefDisabled, setIntRefDisabled] = useState(true);
	const [intRefValue, setIntRefValue] = useState(itineraryDetails.intRef);
	const [newIntRefValue, setNewIntRefValue] = useState(itineraryDetails.intRef);

	useEffect(() => {
		if (visaTravelersList.length > 0) {
			setIntRefDisabled(false);
		} else {
			setIntRefDisabled(true);
		}
	}, [visaTravelersList]);

	useEffect(() => {
		let today = moment()
		let lastDay = moment(validItineraryUpto)
		setValidityDays(lastDay.diff(today, 'days'))
	}, [validItineraryUpto]);

	const { intRefApi } = useInternalReferenceApi();

	const intReferenceApi = async (value) => {
		const requestPayload = {
			'itineraryId': itineraryDetails.itineraryId,
			'type': itineraryDetails.type,
			'refNumber': value
		}
		if (value != '' && value != newIntRefValue) {
			await getItineraryDetails(intRefApi(requestPayload));
		}
		setNewIntRefValue(value);
		setReferenceModeEdit(false)
		setShowReferenceText(true)
	}

	const showInternalReference = () => {
		if(intRefValue === '') {
			return(
				<>
					{t('Add')}
					<AddCircleOutlineRoundedIcon fontSize={'1rem'} sx={{marginLeft: '4px', marginRight: '4px' }} />
				</>
			)
		} else {
			return(
				<>
					{intRefValue}
					<EditIcon fontSize={'1rem'} sx={{marginLeft: '4px', marginRight: '4px' }} />
				</>
			)
		}
	}

	const handleReferenceEdit = () => {
		setReferenceModeEdit(true)
		setShowReferenceText(false)
	}

	const handleReferenceClose = () => {
		setReferenceModeEdit(false)
		setShowReferenceText(true)
	}

	const fetchItineraryWarningMsg = () => {
		if(validityDays == 0){
			return t('Itinerary will be expire today')
		} else if(validityDays == 1) {
			return t('Itinerary will be expire tomorrow')
		} else {
			return t('Itinerary will be expire within')+' '+validityDays+' '+t('days')
		}
	}

	return (
		<>
			<Grid container spacing={2}>
				<Grid item lg={2} sm={4} xs={12}>
					<Typography variant='body2' color='grey.900' fontWeight='fontWeightMedium' mb={1}>{t('Itinerary Status')}</Typography>
					<Typography variant='body1' color='grey.900' fontWeight='fontWeightSemiBold'>{itineraryDetails.itineraryId > 0 ? t(titleCase(t(itineraryDetails.displayType))) : t('Initial - not saved')}</Typography>
				</Grid>
				<Grid item lg={2} sm={4} xs={12}>
					<Typography variant='body2' color='grey.900' fontWeight='fontWeightMedium' mb={1}>{t('Itinerary ID')}</Typography>
					<Typography variant='body1' color='grey.900' fontWeight='fontWeightSemiBold'>
						{itineraryDetails.itineraryId > 0 ? itineraryDetails.itineraryId : '-------'}
						{validityDays < Constants.VISA_EXPIRE_ALERT_DAYS && isValidItinerary ? <Tooltip title={fetchItineraryWarningMsg()}><LockClockIcon fontSize={'small'} color={'warning'} sx={{verticalAlign: 'top'}}/></Tooltip> : '' }
						{!isValidItinerary && <Tooltip title={t('Itinerary expired')}><LockIcon fontSize={'small'} color={'error'} sx={{verticalAlign: 'top'}}/></Tooltip> }
					</Typography>
				</Grid>
				<Grid item lg={2} sm={4} xs={12}>
					<Typography variant='body2' color='grey.900' fontWeight='fontWeightMedium' mb={1}>{t('Internal reference')}</Typography>
					{intRefValue === undefined ? <Typography variant='body1' color='grey.900' fontWeight='fontWeightSemiBold'>-------</Typography> : ''}
					{showReferenceText && intRefValue !== undefined ? <Typography variant='body1' color='grey.900' fontWeight='fontWeightSemiBold' onClick={handleReferenceEdit} sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}} className='internal-reference'>{showInternalReference()}</Typography> : ''}
					{referenceModeEdit && <TextField
						className='validation-cls'
						size='small'
						type='text'
						label={t('Reference No')}
						disabled={intRefDisabled}
						value={intRefValue && intRefValue}
						onChange={(event) => setIntRefValue(event.target.value)}
						onBlur={(event) => intReferenceApi(event.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<CheckIcon fontSize={'small'} onClick={handleReferenceClose} sx={{cursor: 'pointer'}} />
								</InputAdornment>
							),
						}}
					/>}
				</Grid>
				<Grid item lg={2} sm={4} xs={12}>
					<Typography variant='body2' color='grey.900' fontWeight='fontWeightMedium' mb={1}>{t('Service')}</Typography>
					<Typography variant='body1' color='grey.900' fontWeight='fontWeightSemiBold'>{t('Umrah Visa only')}</Typography>
				</Grid>
				<Grid item lg={2} sm={4} xs={12}>
					<Typography variant='body2' color='grey.900' fontWeight='fontWeightMedium' mb={1}>{t('Destination')}</Typography>
					<Typography variant='body1' color='grey.900' fontWeight='fontWeightSemiBold'>{t('Saudi Arabia')}</Typography>
				</Grid>
				<Grid item lg={2} sm={4} xs={12}>
					<Typography variant='body2' color='grey.900' fontWeight='fontWeightMedium' mb={1}>{t('Request Date')}</Typography>
					<Typography variant='body1' color='grey.900' fontWeight='fontWeightSemiBold'>{itineraryDetails.itineraryId > 0 ? requestDate : currentDate}</Typography>
				</Grid>
			</Grid>
		</>
	);
}
