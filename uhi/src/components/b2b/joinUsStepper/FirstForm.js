import React, { useEffect, useState } from 'react';
// import { Field } from 'formik';
import { TextField, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useStoreState, useStoreActions } from 'easy-peasy';
import InputAdornment from '@mui/material/InputAdornment';
import Country from '../../common/CountrySelect';
import { fetchCityData } from '../../../api/CityApi';
import Autocomplete from '@mui/material/Autocomplete';

function FirstForm({ errors, getFieldProps, touched, formik,city }) {
	const { t } = useTranslation();
	const cityList = useStoreState(s => s.btob.filters.cityList);
	const setCityList = useStoreActions(actions => actions.btob.filters.setCityList);
	const [telNo, setTelNo] = useState('');
	
	const handleSelectChange = (value) => {
		setTelNo(value.Tel_Country_Code);
		formik.setFieldValue('PrefTel', value ? value.Tel_Country_Code : '')
		formik.setFieldValue('companyCity', city)
		if (value.Country_Code) {
			const cityData = fetchCityData(value.Country_Code);
			cityData.then((result) => {
				setCityList(result);
			}).catch(() => {
				//console.log(error);
			})
		}
	}
	useEffect(() => {
		if(formik.values.companyCountry.Country_Code == ''){
			setCityList([]);
		}
	},[]);

	const handleCityChange = (_, value) => {
		const newValue = {
			CityCode: (value) ? value.CityCode : '',
			CityName: (value) ? value.CityName : '',
			CityShortCode: (value) ? value.CityShortCode : ''
		}
		formik.setFieldValue('companyCity', newValue ? newValue : '')
	}
	return (
		<>
			<Grid sm={6} xs={12} item>
				<TextField
					variant="outlined"
					fullWidth
					type='text'
					label={t('Company Name')}
					{...getFieldProps('companyName')}
					helperText={touched.companyName && errors.companyName}
					error={formik.touched.companyName && Boolean(formik.errors.companyName)}
				/>
			</Grid>
			<Grid sm={6} xs={12} item>
				<TextField
					variant="outlined"
					fullWidth
					type='text'
					label={t('Company Address')}
					{...getFieldProps('companyAddress')}
					helperText={touched.companyAddress && errors.companyAddress}
					error={formik.touched.companyAddress && Boolean(formik.errors.companyAddress)}
				/>
			</Grid>
			<Grid sm={6} xs={12} item>
				<TextField
					variant="outlined"
					fullWidth
					type='text'
					label={t('ZIP / Postal Code')}
					{...getFieldProps('companyZipCode')}
					helperText={touched.companyZipCode && errors.companyZipCode}
					error={formik.touched.companyZipCode && Boolean(formik.errors.companyZipCode)}
				/>
			</Grid>
			<Grid sm={6} xs={12} item>
				<Country
					value={formik.values.companyCountry}
					onChange={handleSelectChange}
					setLabel={t('Country')}
					setStateValue={value => formik.setFieldValue( 'companyCountry', value ? value : '')}
					error={touched.companyCountry && errors.companyCountry}
					helperText={touched.companyCountry && errors.companyCountry && errors.companyCountry.Country_Code}
				/>
			</Grid>
			<Grid sm={6} xs={12} item>
				<Autocomplete
					disablePortal
					value={formik.values.companyCity}
					options={cityList}
					getOptionLabel={(option) => option.CityName}
					getOptionSelected={(option, value) => option.CityCode === value.CityCode}
					onChange={handleCityChange}
					noOptionsText={t('Select country to provide options')}
					renderInput={(params) => (
						<TextField
							{...params}
							name='companyCity'
							label={t('City')}
							value={formik.values.companyCity.CityCode}
							error={touched.companyCity && errors.companyCity}
							helperText={touched.companyCity && errors.companyCity && errors.companyCity.CityCode}
						/>
					)}
				/>
			</Grid>
			<Grid sm={6} xs={12} item>
				<TextField
					variant="outlined"
					fullWidth
					type='text'
					label={t('Phone')}
					InputProps={{
						startAdornment: telNo && <InputAdornment position="start">{'(+' + telNo + ')'}</InputAdornment>,
					}}
					{...getFieldProps('Tel')}
					helperText={touched.Tel && errors.Tel}
					error={formik.touched.Tel && Boolean(formik.errors.Tel)}
				/>
			</Grid>
		</>
	);

}

export default FirstForm;