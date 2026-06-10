import React, {useState} from 'react';
import {Box, Button, List, Popover, TextField} from '@mui/material';
import RoomOccupancy from './RoomOccupancy';
import {useStoreActions} from 'easy-peasy';
import { useTranslation } from 'react-i18next';


const Guests = ({onChange,value: occupancy}) => {
	const clubRooms = useStoreActions(s => s.btoc.filters.clubRoom);
	const roomCount = useStoreActions(s => s.btoc.filters.setRoomCount);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	var count=0;
	const addRoom = useStoreActions(actions => actions.btoc.filters.addRoom);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		if (occupancy.reduce((a, b) => a + b.room, 0)<=40) {
			const clubbedOccupancy = Object.values(occupancy.reduce((a, b) => {
				if (a[b.adultsCount]){
					a[b.adultsCount]={room: a[b.adultsCount].room +b.room , adultsCount: b.adultsCount, children:b.children}
				} else {
					a[b.adultsCount] = {room: b.room, adultsCount: b.adultsCount, children:b.children}
				}
				return a
			}, {}))
			clubRooms(clubbedOccupancy);
		}

		/*set the conting of rooms for validation*/
		roomCount(occupancy.reduce((a, b) => a + b.room, 0));
		onChange(occupancy.reduce((a, b) => a + b.room, 0))
	};
	const { t } = useTranslation();
	const buildOccupancyText = () => {
		let text = '';

		let adults = occupancy.reduce((a, b) => a + (b.adultsCount * b.room), 0)
		let rooms = occupancy.reduce((a, b) => a + b.room, 0)
		text += `${rooms} ${t('Room')}${rooms > 1 ? 's' : ''}`;
		text += `  ${adults} ${t('Adult')}${adults > 1 ? 's' : ''}`;

		return text;
	}

	const id = open ? 'simple-popover' : undefined;

	return (
		<>
			<TextField
				aria-describedby={id}
				onClick={handleClick}
				value={buildOccupancyText()}
				fullWidth
				label={t('Travelers')}
				sx={{'& .MuiOutlinedInput-input': {
					color: '#11142D',
					fontSize: '12px',
				} }}
			/>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				PaperProps={{
					elevation: 2,
					style: {minWidth: '250px'},
				}}
			>
				{occupancy.map((r)=>{count=r.room+count})}
				<Box p={3}>
					<List sx={{
						width: '100%',
						bgcolor: 'background.paper',
						position: 'relative',
						overflow: 'auto',
						maxHeight: 300,
					}}
					>
						{occupancy.map((r, i) => <RoomOccupancy key={i} index={i} occupancy={r} num={count}/>)}
					</List>
					<Button disabled={occupancy.length > 10 || count >= 40} onClick={addRoom}>{t('+ Add Group')}</Button>
					<Button fullWidth variant="outlined" onClick={handleClose}>{t('Done')}</Button>
				</Box>
			</Popover>
		</>
	);
}

export default Guests;