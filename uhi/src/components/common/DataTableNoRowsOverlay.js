import React from 'react'
import { Typography, Grid } from '@mui/material'
import empty_travelers from '../../Assets/empty_traveler.svg'

export default function NoRowsOverlay(props) {
	return (
		<Grid container direction="column" justifyContent="center" alignItems="center" height='256px'>
			<Grid item>
				<img src={empty_travelers} alt=""/>
			</Grid>
			<Grid item>
				<Typography variant='body1'>{props.emptyText}</Typography>
			</Grid>
		</Grid>
	)
}