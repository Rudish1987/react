import React from 'react';

// material
import { Box, Rating, Grid, Typography, ButtonBase, Chip } from '@mui/material';
import { DiamondOutlined, CollectionsOutlined } from '@mui/icons-material';
import { FormatNumber, scrollToTop } from '../../../../helpers/utils';
import Constants from '../../../../helpers/constants';
import { useTranslation } from 'react-i18next';
import { styled, useTheme } from '@mui/material/styles';
import DistanceFromHaram from './DistanceFromHaram';
import RoomResultsRow from './RoomResultsRow';
import { useStoreState } from 'easy-peasy';
import DisplayPrice from '../../../DisplayPrice';
import SelectButton from '../../../SelectButton';
import { SnackBarAlert } from '../../../common/SnackBarAlert';
import StarIcon from '@mui/icons-material/Star';

const Img = styled('img')({
	margin: 'auto',
	display: 'block',
	maxWidth: '100%',
	height: '314px',
	borderRadius: '5px',
});

const ResultRow = ({
	hotel,
	currency,
	onBookClick,
	onOpenGallery,
	selectedRooms,
	configureSelectedRooms,
	disableSelect,
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const { rooms: searchedRoom } = useStoreState((s) => s.btoc.filters);
	const roomCount = useStoreState((s) => s.btoc.filters.roomCount);
	const hotelid = hotel['@attributes'].hotelid;
	const [snackAlert, setSnackAlert] = React.useState({
		message: 'Warning',
		show: false,
		type: 'warning',
	});

	const handleBookClick = (parameters) => {
		scrollToTop();
		const getSelectedRoom = getSelectedRooms(parameters, selectedRooms);
		if (parameters.type != 'one' && roomCount != getSelectedRoom) {
			setSnackAlert({
				message: t('Please select correct number of rooms'),
				show: true,
				type: 'error',
			});
		} else {
			onBookClick({ ...parameters, hotel: hotel });
		}
	};

	const prepareAllocationsArray = () => {
		const rooms =
			Number(hotel.rooms['@attributes'].count) > 1
				? hotel.rooms.room
				: [hotel.rooms.room];
		const allocations = {};
		const finalAllocations = [];
		let incrementer = 0;
		for (let j = 0; j < rooms.length; j++) {
			const roomtypes =
				Number(rooms[j]['@attributes'].count) > 1
					? rooms[j].roomType
					: [rooms[j].roomType];
			allocations[j] = {};
			for (let i = 0; i < roomtypes.length; i++) {
				let roomCode = roomtypes[i]['@attributes'].roomtypecode;
				const rateBasis =
					Number(roomtypes[i].rateBases['@attributes'].count) > 1
						? roomtypes[i].rateBases.rateBasis
						: [roomtypes[i].rateBases.rateBasis];
				allocations[j][roomCode] = {};
				for (let k = 0; k < rateBasis.length; k++) {
					let ratetype = rateBasis[k]['@attributes'].id;
					if (allocations[j][roomCode][ratetype] === undefined) {
						allocations[j][roomCode][ratetype] = [];
					}
					allocations[j][roomCode][ratetype].push(
						rateBasis[k].allocationDetails
					);
				}
			}
		}
		for (let j in searchedRoom) {
			for (let i = 0; i < searchedRoom[j].room; i++) {
				if (allocations[incrementer] !== undefined) {
					if (finalAllocations[j] === undefined) {
						finalAllocations[j] = allocations[incrementer];
					} else {
						for (let key in finalAllocations[j]) {
							for (let key2 in finalAllocations[j][key]) {
								if(allocations[incrementer][key] !== undefined && allocations[incrementer][key][key2] !== undefined)
								{
									finalAllocations[j][key][key2].push(
										...allocations[incrementer][key][key2]
									);}
							}
						}
					}
				}
				incrementer++;
			}
		}
		return finalAllocations;
	};
	const handleOpenGalleryClick = () => {
		let images = [];
		if (hotel.images) {
			let hotelImages = hotel.images.hotelImages.image;
			if (Array.isArray(hotelImages)) {
				hotelImages.forEach(function (image) {
					let imgObj = {
						original: image.url,
						thumbnail: image.url,
					};
					images.push(imgObj);
				});
			} else {
				let imgObj = {
					original: hotelImages.url,
					thumbnail: hotelImages.url,
				};
				images.push(imgObj);
			}
			onOpenGallery(images);
		}
	};
	const grouped = searchedRoom.length > 1 ? true : false;

	const getSelectedRooms = (parameters, selectedRooms) => {
		let totalRoomSelected = 0;
		if (parameters.type != 'one') {
			if (selectedRooms.hotels[parameters.hotelId] !== undefined) {
				for (let key in selectedRooms.hotels[parameters.hotelId].rooms) {
					for (let key2 in selectedRooms.hotels[parameters.hotelId].rooms[key]
						.roomTypeCodes) {
						totalRoomSelected +=
							selectedRooms.hotels[parameters.hotelId].rooms[key].roomTypeCodes[
								key2
							].selectedRoom;
					}
				}
			}
		}
		return totalRoomSelected;
	};
	const createRoomsArray = () => {
		if (Number(hotel.rooms['@attributes'].count) === 1) {
			return [hotel.rooms.room];
		}
		if (grouped) {
			let groupRooms = [];
			let processedRooms = [];
			let rooms = [...hotel.rooms.room];
			for (let i = 0; i < searchedRoom.length; i++) {
				for (let j = 0; j < rooms.length; j++) {
					if (
						searchedRoom[i].adultsCount ===
						Number(rooms[j]['@attributes'].adults) &&
						processedRooms.indexOf(
							`${i}_${searchedRoom[i].room}_${searchedRoom[i].adultsCount}`
						) === -1
					) {
						groupRooms.push(rooms[j]);
						processedRooms.push(
							`${i}_${searchedRoom[i].room}_${searchedRoom[i].adultsCount}`
						);
					}
				}
			}
			return groupRooms;
		} else {
			return [hotel.rooms.room[0]];
		}
	};
	const calculateAmount = () => {
		let totalAmount = 0;
		if (
			Object.keys(selectedRooms.hotels).length !== 0 &&
			selectedRooms.hotels[hotelid] !== undefined
		) {
			for (let key in selectedRooms.hotels[hotelid].rooms) {
				for (let key2 in selectedRooms.hotels[hotelid].rooms[key]
					.roomTypeCodes) {
					totalAmount +=
						selectedRooms.hotels[hotelid].rooms[key].roomTypeCodes[key2]
							.selectedRoom *
						selectedRooms.hotels[hotelid].rooms[key].roomTypeCodes[key2]
							.roomAmount;
				}
			}
		}
		return totalAmount;
	};
	const totalAmount = calculateAmount();
	const hotelRoomsArray = createRoomsArray();
	const allocationsArray = prepareAllocationsArray();
	const handleRoomsSelected = (selectedRoomData) => {
		const x = { hotelid: hotelid, rooms: [] };
		if (
			selectedRooms.hotels[hotelid] !== undefined &&
			selectedRooms.hotels[hotelid].rooms.length &&
			selectedRooms.hotels[hotelid].hotelid === hotelid
		) {
			let tempRooms = [...selectedRooms.hotels[hotelid].rooms];
			for (let key in tempRooms) {
				if (
					tempRooms[key].room === selectedRoomData.room &&
					tempRooms[key].adultsCount === selectedRoomData.adultsCount
				) {
					tempRooms[key] = selectedRoomData;
					selectedRoomData = {};
				}
			}
			x.rooms =
				Object.keys(selectedRoomData).length !== 0
					? [...tempRooms, selectedRoomData]
					: tempRooms;
		} else {
			x.rooms = [selectedRoomData];
		}
		configureSelectedRooms(x);
	};
	return (
		<Grid item xs={12} className="pad-botm-16">
			<Box
				sx={{
					p: 2,
					margin: 'auto',
					flexGrow: 1,
					backgroundColor: '#fff',
					border: '1px solid #BDBDBD',
					borderRadius: 1
				}}
			>
				<Grid item container sm spacing={2} xs={12}>
					<Grid item container direction='column' xs={3}>
						<Grid item xs onClick={handleOpenGalleryClick}>
							<ButtonBase sx={{ position: 'relative' }}>
								<Box
									className="img-size"
									component={Img}
									src={hotel.images ? hotel.images.hotelImages.thumb : ''}
									alt={hotel.hotelName}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = '/static/images/No-image-Accomodation.png';
									}}
								/>
								{hotel.exclusive === 'yes' && (
									<Chip
										label='Exclusive'
										icon={<DiamondOutlined style={{ color: '#fff' }} />}
										sx={{
											position: 'absolute',
											left: '16px',
											top: '16px',
											color: 'white',
											background: 'rgba(40, 46, 54, 0.6)',
										}}
									/>
								)}
								{hotel.images && (
									<Chip
										label={
											Array.isArray(hotel.images.hotelImages.image)
												? hotel.images.hotelImages.image.length
												: [hotel.images.hotelImages.image].length
										}
										icon={<CollectionsOutlined style={{ color: '#fff' }} />}
										sx={{
											position: 'absolute',
											left: '16px',
											bottom: '16px',
											color: 'white',
											background: 'rgba(40, 46, 54, 0.6)',
										}}
									/>
								)}
							</ButtonBase>
						</Grid>
					</Grid>
					<Grid item container sm direction='column' spacing={2} xs={9}>
						<Grid item xs sm container>
							<Grid item xs>
								<Grid item xs container direction="row" wrap='nowrap' sx={{ minWidth: '600px' }}>
									<Typography sx={{fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightSemiBold, color: theme.palette.grey[800]}} gutterBottom component="div">
										{hotel.hotelName}
									</Typography>
									<Rating
										value={Constants.RATINGS[Number(hotel.rating)]}
										name='hotel-rating'
										readOnly
										size='small'
										emptyIcon={<StarIcon style={{ opacity: 0 }} fontSize="inherit" />}
										sx={{ pl: 1, pt: '4px' }}
									/>
								</Grid>
								<Grid item xs>
									<DistanceFromHaram geo={hotel.geoPoint} />
								</Grid>
							</Grid>
							<Grid item xs textAlign='right'>
								<Typography sx={{fontSize: theme.typography.body2, fontWeight: theme.typography.fontWeightRegular, color: theme.palette.grey[800]}} component='div'>
									{t(Constants.FROMTEXT)}
								</Typography>
								<Typography sx={{fontSize: theme.typography.subtitle1, fontWeight: theme.typography.fontWeightSemiBold, color: theme.palette.grey[800]}} component="div">
									{t(currency)} {FormatNumber(hotel.from, 2)}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs wrap='nowrap' sm container direction='column'>
							{hotelRoomsArray.map((hotelRooms, idx) => (
								<RoomResultsRow
									key={idx}
									hotelId={hotelid}
									handleBookClickHandler={handleBookClick}
									hotel={hotel}
									hotelRooms={hotelRooms}
									currency={currency}
									searchedRoom={searchedRoom[idx]}
									allocations={allocationsArray[idx]}
									grouped={grouped}
									selectedRooms={
										selectedRooms.hotels[hotelid] !== undefined
											? selectedRooms.hotels[hotelid]
											: {}
									}
									manageRoomsSelected={handleRoomsSelected}
									disableSelect={disableSelect}
								/>
							))}
							{grouped && (

								<Grid container item xs className="alignRight">
									< Grid item container direction='column' xs className="alignment-left">
										{totalAmount > 0 && (
											<DisplayPrice
												currency={currency}
												price={totalAmount}
												priceText={t('Total + Inclusive of Taxes')}
											/>
										)}
									</Grid>

									<SelectButton
										className="result-select"
										disableSelect={disableSelect}
										handleFunction={() =>
											handleBookClick({ type: 'group', hotelId: hotelid })
										}
									/>
								</Grid>


							)}


						</Grid>
					</Grid>
				</Grid>
			</Box >
			<SnackBarAlert
				{...snackAlert}
				resetSnackAlert={setSnackAlert}
			></SnackBarAlert>
		</Grid >
	);
};

export default React.memo(ResultRow);
