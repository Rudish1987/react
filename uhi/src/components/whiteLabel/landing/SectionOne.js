import * as React from 'react';
import { Grid, Typography } from '@mui/material';

import locationIcon from '../../../Assets/whiteLabel/location.svg';
import calenderIcon from '../../../Assets/whiteLabel/calender.svg';
import carIcon from '../../../Assets/whiteLabel/car.svg';


export default function SectionOne() {
	const sectionIntro = (icon, header, content) => {
		return (
			<Grid item xl={4} lg={4} md={4} sm={12} xs={12} sx={{ marginTop: 2 }} >
				<Grid item className='wlIconContainer'>
					<img src={icon} alt="icon" loading="lazy" />
				</Grid>
				<Typography sx={{ marginTop: 3,marginBottom:3 }} textAlign='center' color='grey.900'  variant='subtitle1'>{header}</Typography>
				<Typography textAlign='center' color='grey.900'  variant='body2' >{content}</Typography>
			</Grid>
		);
	}
	return (
		<Grid container xl={12} lg={12} md={12} sm={12} xs={12} spacing={4}>
			<Grid item xs={12} paddingBottom={1} >
				<Typography fontWeight='fontWeightMedium' color='grey.900' textAlign='center' variant='h2'>Section 1 Title</Typography>
			</Grid>
			{sectionIntro(locationIcon, 'Choose Location', 'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.')}
			{sectionIntro(calenderIcon, 'Pick-up Date', 'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.')}
			{sectionIntro(carIcon, 'Book your car', 'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.')}
		</Grid>
	);
}