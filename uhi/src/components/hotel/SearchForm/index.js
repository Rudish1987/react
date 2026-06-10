import React, {useEffect} from 'react';
// material
import { Grid, Typography } from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { styled } from '@mui/material/styles';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { useFormik } from 'formik';

import TravelPeriod from './TravelPeriod';
import TransferRoute from './TransferRoute';
import Guests from './Guests';
import TravelStay from './TravelStay';
import ResidencyToggle from './Residency';
import Country from './country';
import { useRequestBody } from '../../../api/useRequestBody';

import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { t } from 'i18next';
import '../../../css/theme.css'

const ErrorMsg = styled(Typography)(({ theme }) => ({
	textAlign: 'left',
	color: theme.palette.primary.main,
	fontFamily: 'Montserrat',
	fontWeight: 500,
	fontSize: 10,
	lineHeight: '160%'
}));

const SearchForm = (props) => {

	const storeFilter =  useStoreState(s => s.btoc.filters);
	const routecode = useStoreState(s => s.btoc.filters.routecode);
	const rooms = useStoreState(s => s.btoc.filters.rooms);
	const roomsCount=rooms.reduce((a, b) => a + b.room, 0);
	const travelPeriod = useStoreState(s => s.btoc.filters.travelPeriod);
	const stayInMakkah = useStoreState(s => s.btoc.filters.nightStayInMakkah);
	const stayInMadinah = useStoreState(s => s.btoc.filters.nightStayInMadinah);
	const nationality = useStoreState(s => s.btoc.filters.nationality);
	const residency = useStoreState(s => s.btoc.filters.residency);
	const residencySwitch = useStoreState(s => s.btoc.filters.checkResidencySwitch);

	const checkResidencySwitch = useStoreState(s => s.btoc.filters.checkResidencySwitch);
	const setRoutecode = useStoreActions(actions => actions.btoc.filters.setRoutecode);
	const setTravelPeriod = useStoreActions(actions => actions.btoc.filters.setTravelPeriod);
	const setStayInMakkah = useStoreActions(actions => actions.btoc.filters.setStayInMakkah);
	const setStayInMadinah = useStoreActions(actions => actions.btoc.filters.setStayInMadinah);
	const setNationality = useStoreActions(actions => actions.btoc.filters.setNationality);
	const setResidency = useStoreActions(actions => actions.btoc.filters.setResidency);
	const setResidencySwitch = useStoreActions(actions => actions.btoc.filters.setResidencySwitch);
	const setSaved =  useStoreActions(actions => actions.btoc.setSaved);

	const navigate = useNavigate();
	const { prepareDataForSearch } = useRequestBody();

	const resetStatePackage = useStoreActions(actions => actions.btoc.itineraryDetails.resetState);
	const resetAfterBookingPackageDetails = useStoreActions(actions => actions.btoc.resetAfterBookingpackagedetails);
	const dateFormat = 'DD/MM/YYYY';

	useEffect(() => {

		if( travelPeriod.from === null || travelPeriod.to === null ){
			travelPeriod.from =  moment().add(2, 'days').toDate()
			travelPeriod.to =  moment().add((2+stayInMakkah), 'days').toDate()
		}

	}, [travelPeriod, stayInMakkah])

	const validate = values => {
		const errors = {}
		if (!values.dateFrom) {
			errors.dateFrom = t('Arrival date is required')
		}
		if(values.dateFrom && (values.dateFrom < new Date() || !moment(moment(values.dateFrom).format(dateFormat), dateFormat, true).isValid())){
			errors.dateFrom = t('Date is invalid')
		}
		if (values.nightStayInMakkah + values.nightStayInMadinah < 5) {
			errors.nightStayInMakkah = 'Minimum 5 Nights required'
		}
		if(!values.nationality.Country_Name) {
			if(!nationality.Country_Name){
				errors.nationality = 'Nationality is required'
			}
		}
		if(!values.checkSwitch && !values.residency.Country_Name) {
			if(!residency.Country_Name){
				errors.residency = 'Residency is required'
			}
		}
		if(values.rooms>40){
			errors.rooms='Maximum of 40 rooms can be selected'
		}
		return errors;
	}

	const formik = useFormik({
		initialValues: {
			dateFrom: travelPeriod,
			nightStayInMakkah: stayInMakkah,
			nightStayInMadinah: stayInMadinah,
			checkSwitch: residencySwitch,
			nationality: nationality,
			residency: residency,
			routecode: routecode,
			rooms: roomsCount
		},
		validate,
		onSubmit: async () => {
			resetStatePackage()
			resetAfterBookingPackageDetails();
			prepareDataForSearch();
			setSaved(false)
			navigate('/umrah-package/hotels/makkah/results');
		},
	});

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={2} {...props} sx={{
					'&.MuiBox-root': { paddingtop: '25px' },
				}}>
					<Grid item xs={12} lg={6}>
						<TravelPeriod
							value={travelPeriod}
							onChange={value => formik.setFieldValue('dateFrom', (value) ? value : '')}
							stateValue={travelPeriod}
							setStateValue={setTravelPeriod}
							makkaNights={stayInMakkah}
							madinahNights={stayInMadinah}
						/>
						{formik.errors.dateFrom ? <ErrorMsg> {formik.errors.dateFrom} </ErrorMsg> : ''}
					</Grid>
					<Grid item xs={12} lg={6}>
						<Guests
							value={storeFilter.rooms}
							setValue={() => { }}
							onChange={value => formik.setFieldValue('rooms', (value) ? value : '')}
						/>
						{formik.errors.rooms?<ErrorMsg>{formik.errors.rooms}</ErrorMsg>:''}
					</Grid>
					<Grid item xs={12} lg={6} className="padTop-32">
						<TravelStay
							value={stayInMakkah}
							onChange={value => formik.setFieldValue('nightStayInMakkah', (value) ? value.target.value : '')}
							stayCity={t('Makkah')}
							stateValue={stayInMakkah}
							setStateValue={setStayInMakkah}
						/>
						{formik.errors.nightStayInMakkah ? <ErrorMsg> {t(formik.errors.nightStayInMakkah)} </ErrorMsg> : ''}
					</Grid>
					<Grid item xs={12} lg={6} className="padTop-32">
						<TravelStay
							value={stayInMadinah}
							onChange={value => formik.setFieldValue('nightStayInMadinah', (value) ? value.target.value : '')}
							stayCity={t('Madinah')}
							stateValue={stayInMadinah}
							setStateValue={setStayInMadinah}
						/>
						{formik.errors.nightStayInMadinah ? <ErrorMsg> {formik.errors.nightStayInMadinah} </ErrorMsg> : ''}
					</Grid>
					{checkResidencySwitch && <Grid item xs={12} lg={12} className="padTop-32">
						<Country
							value={nationality}
							onChange={value => formik.setFieldValue('nationality', (value) ? value : '')}
							setLabel={t('Nationality')}
							stateValue={nationality}
							setStateValue={setNationality}
						/>
						{formik.errors.nationality ? <ErrorMsg> {t(formik.errors.nationality)} </ErrorMsg> : ''}
					</Grid>}
					{!checkResidencySwitch && <Grid item xs={12} lg={6} className="padTop-32">
						<Country
							value={nationality}
							onChange={value => formik.setFieldValue('nationality', (value) ? value : '')}
							setLabel={t('Nationality')}
							stateValue={nationality}
							setStateValue={setNationality}
						/>
						{formik.errors.nationality ? <ErrorMsg> {t(formik.errors.nationality)} </ErrorMsg> : ''}
					</Grid>}
					{!checkResidencySwitch && <Grid item xs={12} lg={6} className="padTop-32">
						<Country
							value={residency}
							onChange={value => formik.setFieldValue('residency', (value) ? value : '')}
							setLabel={t('Residency')}
							stateValue={residency}
							setStateValue={setResidency}
						/>
						{formik.errors.residency ? <ErrorMsg> {t(formik.errors.residency)} </ErrorMsg> : ''}
					</Grid>}
					<Grid item xs={12} lg={12} sx={{ pt: '0px !important' }}>
						<ResidencyToggle
							value={checkResidencySwitch}
							onChange={value => formik.setFieldValue('checkSwitch', (value) ? true : false)}
							stateValue={checkResidencySwitch}
							setStateValue={setResidencySwitch}
						/>
					</Grid>
					<Grid item xs={12} lg={12} className="padTop-8">
						<TransferRoute
							value={routecode}
							onChange={value => formik.setFieldValue('routecode', (value) ? value : '')}
							stateValue={routecode}
							setStateValue={setRoutecode}
						/>
						{formik.errors.routecode ? <ErrorMsg> {t(formik.errors.routecode)} </ErrorMsg> : ''}
					</Grid>
					<Grid item xs={12} lg={12} className="padTop-32">
						<LoadingButton className="buttonLarge" color="primary" variant="contained" fullWidth type="submit">
							{t('Search Now')}
						</LoadingButton>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};
export default SearchForm;