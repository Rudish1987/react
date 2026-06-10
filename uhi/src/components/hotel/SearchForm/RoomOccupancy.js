import {
	Grid,
	IconButton,
	FormControl,
	TextField,
	MenuItem
} from '@mui/material';
import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';

const RoomOccupancy = ({ index, occupancy }) => {
	const { t } = useTranslation();
	const MAX_ROOMS = 40;
	const MAX_ADULTS = 8;
	const occupancyChange = useStoreActions(s => s.btoc.filters.occupancyChange);
	const deleteRoom = useStoreActions((s) => s.btoc.filters.removeRoom)

	const handleOccupancyChange = (data) => {
		occupancyChange({ index: data.index, type: data.type, value: data.value.target.value });
	}

	return (
		<>
			<Grid container spacing={2} sx={{
				'&.MuiBox-root': { paddingtop: '25px' },
			}}>
				<Grid item xs={12} sm={5}>
					<FormControl fullWidth>
						<TextField
							id='room'
							label={t('Rooms')}
							onChange={(v) => {
								handleOccupancyChange({ index: index, type: 'room', value: v })
							}}
							select sx={{
								'& .MuiOutlinedInput-input': {
									color: '#11142D',
									fontSize: '12px',
								},
								mt: 1
							}}
							value={occupancy.room}
							size='small'
						>
							{
								Array.from(Array(MAX_ROOMS), (_, i) => {
									var room = i + 1; // array starting with 0
										
									return <MenuItem key={room} value={room}>{room}</MenuItem>;
								})
							}
	
						</TextField>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={5}>
					<FormControl fullWidth>
						<TextField
							id='adultsCount'
							label={t('Adults')}
							onChange={(v) => {
								handleOccupancyChange({ index: index, type: 'adultsCount', value: v })
							}}
							select sx={{
								'& .MuiOutlinedInput-input': {
									color: '#11142D',
									fontSize: '12px',
								},
								mt: 1
							}}
							value={occupancy.adultsCount}
							size='small'
						>
							{Array.from(Array(MAX_ADULTS), (_, i) => {
								var adults = i + 1; // array starting with 0
								return <MenuItem key={adults} value={adults}>{adults}</MenuItem>
							})}
						</TextField>
					</FormControl>
				</Grid>
				<Grid item xs={2} lg={2} sx={{ ml: '-20px', mt: 1 }} >
					{index > 0 ? <IconButton sx={{color: '#DC140A'}} aria-label="delete" onClick={() => {
						deleteRoom({ index: index })
					}}>
						<RemoveCircleOutlineIcon />
					</IconButton> : ''}
				</Grid>
			</Grid>
		</>
	)
}

export default RoomOccupancy