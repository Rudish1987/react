import React from 'react';
import {
	Box,
	Button, Collapse, IconButton,
	Paper,
	Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { format } from 'date-fns';
import { t } from 'i18next';

const RoomTypeList = ({rooms}) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Room Type</TableCell>
						<TableCell align="right">Board Basis</TableCell>
						<TableCell align="right">Included Services</TableCell>
						<TableCell align="right">&nbsp;</TableCell>
						<TableCell align="right" colSpan={2}>Total Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rooms.map(room => (<RoomTableRow key={room.id} room={room} />))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const RoomTableRow = ({ room }) => {
	const [open, setOpen] = React.useState(false);

	const handleBookClick = () => {}

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell><Typography>{room.name}</Typography></TableCell>
				<TableCell align="right"><Typography>{room.boardBasis}</Typography></TableCell>
				<TableCell align="right"><Typography>{room.name}</Typography></TableCell>
				<TableCell align="right">icons</TableCell>
				<TableCell align="right"><Typography>{room.price.value} {room.price.currency}</Typography></TableCell>
				<TableCell align="right">
					<Button onClick={handleBookClick}>{t('BOOK NOW')}</Button>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>{t('Date')}</TableCell>
										<TableCell>{t('Price')}</TableCell>
										<TableCell align="right">Bravo Points</TableCell>
										<TableCell align="right">Availability</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{room.dailyRates.map((rate, _index) => (
										<TableRow key={`${room.id}-${_index}`}>
											<TableCell component="th" scope="row">
												{format(rate.date, 'yyyy-mm-dd')}
											</TableCell>
											<TableCell>{rate.price.currency} {rate.price.value}</TableCell>
											<TableCell align="right">{rate.bravoPoints}</TableCell>
											<TableCell align="right">
												Room Available
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}

export default RoomTypeList;
