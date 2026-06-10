import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function SocialProof() {
	return (
		<Grid container xl={12} lg={12} md={12} sm={12} xs={12} spacing={4}>
			<Grid item xs={12} paddingBottom={4} >
				<Typography fontWeight='fontWeightMedium' color='grey.800' textAlign='left' variant="h6">Section 3 Title</Typography>
			</Grid>
			<Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
				<Card variant="outlined" >
					<CardContent width>
						<Typography color='grey.800' textAlign='left' variant='h5'>
                            24+
						</Typography>
						<Typography textAlign='left' color='grey.700' variant='body2' >
                            Burger Blisses across the country
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
				<Card variant="outlined" >
					<CardContent>
						<Typography color='grey.800' textAlign='left' variant='h5'>
                            17M
						</Typography>
						<Typography  textAlign='left' color='grey.700' variant='body2'>
                            Burger eaters and counting
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xl={4} lg={4} md={4} sm={12} xs={12} >
				<Card variant="outlined" >
					<CardContent>
						<Typography color='grey.800' textAlign='left' variant='h5'>
                            +95%
						</Typography>
						<Typography textAlign='left' color='grey.700' variant='body2'>
                            Customer satisfaction
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}