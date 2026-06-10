import React, { useEffect, useState } from 'react';
import { TextField, Grid, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { getSalutations } from '../../../api/SalutationApi';

function SecondForm({ errors, getFieldProps, touched, formik }) {
	const { t } = useTranslation();
	const [salutation, setSalutation] = useState([]);
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: 180
			},
		},
	};

	useEffect(() => {
		const salutations = getSalutations();
		salutations.then((result) => {
			if (result.statusCode != 500) {
				setSalutation(result)
			}
		}).catch(() => {
			//console.log(error);
		})
	}, []);

	return (

		<>
			<Grid item md={12} xs={12}>
				<FormControl fullWidth>
					<InputLabel id="salutation-label">{t('Salutation')}</InputLabel>
					<Select
						label={t('Salutation')}
						labelId="salutation-label"
						fullWidth
						value={formik.values.title}
						onChange={(newValue) => {
							formik.setFieldValue('title', (newValue) ? newValue.target.value : '')
						}}
						MenuProps={MenuProps}
						error={formik.touched.title && Boolean(formik.errors.title)}
					>
						{salutation.map(function (item, i) {
							return (<MenuItem key={i} value={item.id}>{t(item.Description)}</MenuItem>)
						})}
					</Select>
					{formik.touched.title && formik.errors.title ? (
						<FormHelperText sx={{ color: (theme) => theme.palette.primary.main }} >
							{formik.touched.title && formik.errors.title}
						</FormHelperText>
					) : null}
				</FormControl>
			</Grid>
			<Grid item sm={6} xs={12}>
				<TextField
					variant="outlined"
					fullWidth
					type='text'
					label={t('First Name')}
					{...getFieldProps('firstName')}
					helperText={touched.firstName && errors.firstName}
					error={formik.touched.firstName && Boolean(formik.errors.firstName)}
				/>
			</Grid>
			<Grid item sm={6} xs={12}>
				<TextField
					variant="outlined"
					fullWidth
					type='text'
					label={t('Last Name')}
					{...getFieldProps('lastName')}
					helperText={touched.lastName && errors.lastName}
					error={formik.touched.lastName && Boolean(formik.errors.lastName)}
				/>
			</Grid>
			<Grid item sm={6} xs={12}>
				<TextField
					variant="outlined"
					fullWidth
					type='text'
					label={t('E-mail')}
					{...getFieldProps('emailAddress')}
					helperText={touched.emailAddress && errors.emailAddress}
					error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
				/>
			</Grid>
			<Grid item sm={6} xs={12}>
				<TextField
					variant="outlined"
					fullWidth
					type='text'
					label={t('E-mail Confirmation')}
					{...getFieldProps('emailAddress_confirmation')}
					helperText={touched.emailAddress_confirmation && errors.emailAddress_confirmation}
					error={formik.touched.emailAddress_confirmation && Boolean(formik.errors.emailAddress_confirmation)}
				/>
			</Grid>
		</>

	);

}


export default SecondForm;