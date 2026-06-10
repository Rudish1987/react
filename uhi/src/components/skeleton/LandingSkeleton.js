import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import {Box, Container, Grid} from '@mui/material';

export default function LandingSkeleton() {
	return (
		<Box className="box-body-flex">
			<Container className="body-container-margin paddingTop32 paddingBottom32">
				<Grid container spacing={3}>
					<Grid item xs={3}><Skeleton height={50} width={'100%'} variant="rectangle"></Skeleton></Grid>
					<Grid item xs={6}><Skeleton height={50} width={'100%'} variant="rectangle"></Skeleton></Grid>
					<Grid item xs={3}><Skeleton height={50} width={'100%'} variant="rectangle"></Skeleton></Grid>
					<Grid item xs={12}><Skeleton height={400} width={'100%'} variant="rectangle"></Skeleton></Grid>
					<Grid item xs={12}><Skeleton height={140} width={'100%'} variant="rectangle"></Skeleton></Grid>
				</Grid>
			</Container>
		</Box>
	);
}