import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import defaultImage from '../../../Assets/whiteLabel/defaultImage.svg';

export default function SectionTwo() {
	
	const sectionTwo = (img, header, content) => {
		return (
			<Grid item xs={12} display='inline-flex' spacing={2}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
					<Typography sx={{marginBottom:1 }} textAlign='left' color='grey.800'  variant='subtitle1'>{header}</Typography>
					<Typography sx={{marginBottom:2 }} textAlign='left' color='grey.700'  variant='body2' >{content}</Typography>
					<Button variant="outlined" color='inherit' sx={ { borderRadius: 28 } }>Do something</Button>
				</Grid>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
					<img src={img} alt='img' />
				</Grid>
			</Grid>
		);
	}
	return (
		<>
			<Grid container direction='row' spacing={8}>
				<Grid item xs={12}>
					<Grid><Typography fontWeight='fontWeightMedium' color='grey.800' textAlign='left' variant='h2'>Section 2 Title</Typography></Grid>
				</Grid>
				{sectionTwo(defaultImage, 'Lorem Ipsum is simply dummy', 'Welcome to Burger Bliss, where we take your cravings to a whole new level! Our mouthwatering burgers are made from 100% beef and are served on freshly baked buns.')}
				{sectionTwo(defaultImage, 'Lorem Ipsum is simply dummy', 'Welcome to Burger Bliss, where we take your cravings to a whole new level! Our mouthwatering burgers are made from 100% beef and are served on freshly baked buns.')}
				{sectionTwo(defaultImage, 'Lorem Ipsum is simply dummy', 'Welcome to Burger Bliss, where we take your cravings to a whole new level! Our mouthwatering burgers are made from 100% beef and are served on freshly baked buns.')}
			</Grid>
		</>
	);
}