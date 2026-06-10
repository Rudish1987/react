import React, { useState, useEffect } from 'react';
// material
import {
	Paper,
	Grid,
	Button,
	FormControl,
	TextField,
	MenuItem,
} from '@mui/material';

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import RateType from '../../../../components/common/RateType';
import { useStoreState } from 'easy-peasy';
import DisplayPrice from '../../../DisplayPrice';
import SelectButton from '../../../SelectButton';
import DisplayNameDetails from '../../../DisplayNameDetails';
import { FormatNumber, scrollToTop } from '../../../../helpers/utils';
import Constants from '../../../../helpers/constants';
import { useLocale } from '../../../../context/LocaleContext';

const RoomResultsRow = ({
	hotelRooms,
	hotelId,
	currency,
	handleBookClickHandler,
	searchedRoom,
	grouped,
	selectedRooms,
	manageRoomsSelected,
	allocations,
	disableSelect,
}) => {
	const { t } = useTranslation();
	const { adultsCount } = searchedRoom;
	const { locale } = useLocale();
	const [roomSelected, setRoomSelected] = useState([]);
	const [showMore, setShowMore] = useState(null);
	const [showLess, setShowLess] = useState(null);
	const [roomResults, showRoomResults] = useState([]);
	const [completeResults, setCompleteResults] = useState([]);

	const filters = useStoreState((s) => s.btoc.filters);
	useEffect(()=>{
		if(Object.keys(selectedRooms).length===0)
			setRoomSelected([])
	},[selectedRooms])
	useEffect(() => {

		let roomTypes = Array.isArray(hotelRooms.roomType)
			? hotelRooms.roomType
			: [hotelRooms.roomType];
		if (grouped) {
			roomTypes = roomTypes.filter(
				(roomType) => Number(roomType.roomInfo.maxOccupancy) >= adultsCount
			);
		}
		const roomMappingResults = roomTypes.map((roomType) => {
			let rateBases = Array.isArray(roomType.rateBases.rateBasis)
				? roomType.rateBases.rateBasis
				: [roomType.rateBases.rateBasis];

			return rateBases.reduce((acc, current) => {
				let newRoomType = JSON.parse(JSON.stringify(roomType));

				delete newRoomType[rateBases];
				newRoomType.rateBases = current;
				acc.push(newRoomType);
				return acc;
			}, []);
		});

		const rooms = [].concat.apply([], roomMappingResults);
		setCompleteResults(rooms);
		if (rooms.length > 3) {
			setShowMore(true);
		}
		showRoomResults(rooms.slice(0, 3));
	}, [hotelRooms, grouped, adultsCount]);

	const handleShowMore = () => {
		showRoomResults(completeResults);
		setShowMore(false);
		setShowLess(true);
	};

	const handleShowLess = () => {
		showRoomResults(completeResults.slice(0, 3));
		setShowMore(true);
		setShowLess(false);
	};

	//handle select button click
	const prepareSingleRoomData = (roomSelected) => {
		const roomTypeCodesArr = [];

		//create room array for saveRoom API call
		filters.rooms.map((hotelRoom) => {
			let room = {
				room: hotelRoom.room,
				adultsCount: hotelRoom.adultsCount,
				children: hotelRoom.children,
				roomTypeCodes: [
					{
						roomName: roomSelected.name,
						RoomType: roomSelected['@attributes'].roomtypecode,
						roomToken: roomSelected['rateBases'].allocationDetails,
						roomRateBasis: roomSelected['rateBases']['@attributes'].id,
						roomAmount: FormatNumber(roomSelected.rateBases.total),
						withinCancellationDeadline:
							roomSelected['rateBases'].withinCancellationDeadline,
						cancellationRules: roomSelected['rateBases'].cancellationRules,
					},
				],
			};
			roomTypeCodesArr.push(room);
		});
		return roomTypeCodesArr;
	};

	const handleSelect = (parameters) => {
		scrollToTop();

		let roomData = [];
		if (parameters.type === 'one') {
			roomData = prepareSingleRoomData(parameters.room);
		}
		handleBookClickHandler({
			type: parameters.type,
			roomData: roomData,
			hotelId: hotelId,
		});
	};

	const calculateAmount = () => {
		let totalAmount = 0;
		if (Object.keys(selectedRooms).length !== 0) {
			for (let key in selectedRooms.rooms) {
				for (let key2 in selectedRooms.rooms[key].roomTypeCodes) {
					totalAmount +=
						selectedRooms.rooms[key].roomTypeCodes[key2].selectedRoom *
						selectedRooms.rooms[key].roomTypeCodes[key2].roomAmount;
				}
			}
		}
		return totalAmount;
	};
	const totalAmount = calculateAmount();
	const handleChangeStay = (event, idx) => {
		if(!selectedRooms)
			event.target.value=0;
		setRoomSelected((prevState) => {
			let totalRooms = prevState.reduce((a, b) => a + b, 0);

			const newRooms = prevState.map((nr) => {
				if (totalRooms + event.target.value > searchedRoom.room) {
					totalRooms -= nr;
					return nr >= event.target.value ? nr - event.target.value : 0;
				}
				return nr;
			});
			newRooms[idx] = event.target.value;
			const selected = { ...searchedRoom, roomTypeCodes: [] };
			newRooms.forEach((value, index) => {
				const roomTypeCode = roomResults[index]['@attributes'].roomtypecode;
				const boardBasis = roomResults[index].rateBases['@attributes'].id;
				selected.roomTypeCodes.push({
					RoomType: roomTypeCode,
					roomAmount: FormatNumber(roomResults[index].rateBases.total),
					roomRateBasis: boardBasis,
					selectedRoom: value,
					roomToken: allocations[roomTypeCode][boardBasis].slice(0, value),
					roomName: roomResults[index].name,
					withinCancellationDeadline:
						roomResults[index].rateBases.withinCancellationDeadline,
					cancellationRules: roomResults[index].rateBases.cancellationRules,
				});
			});
			manageRoomsSelected(selected);
			return newRooms;
		});
	};

	return (
		<Grid item sm xs={12}>
			{grouped &&
				`${t('Select')} ${searchedRoom.room} ${searchedRoom.room > 1 ? t('Rooms for'):t('Room for')} ${searchedRoom.adultsCount} ${t('Adults')}`}
			{roomResults.map((room, idx) => {
				const roomSelectedCount = idx == 0 && roomSelected.length == 0 ? searchedRoom.room : 0;
				return (
					<Paper
						key={`room_${room['@attributes'].roomtypecode}_${idx}`}
						elevation={0}
						sx={{
							p: 2,
							marginBottom: 1,
							flexGrow: 1,
							backgroundColor: '#ededed',
							alignItems: 'center center',
						}}
					>
						<Grid
							item
							xs
							sm
							container
							direction='row'
							spacing={2}
							alignItems='center'
							justifyContent='space-between'
						>
							<Grid item container direction='column' xs={3}>
								<DisplayNameDetails
									displayName={room.name}
									generalDetails={room.rateBases['@attributes'].description}
								/>
							</Grid>
							<Grid item xs={3}>
								<RateType rateBases={room.rateBases} currency={currency} />
							</Grid>
							{(searchedRoom.room > 1 || grouped) && (
								<Grid item xs={2} align='center'>
									<FormControl size='medium' sx={{ width: '65%' }}>
										<TextField
											id='rooms'
											label={t('Rooms')}
											onChange={(event) => handleChangeStay(event, idx)}
											select
											sx={{
												'& .MuiOutlinedInput-input': {
													fontSize: '12px',
												},
												mt: 1,
											}}
											value={roomSelected[idx] || roomSelectedCount || 0}
											size='small'
										>
											{Array.from(Array(searchedRoom.room + 1), (_, i) => {
												var roomDropdown = i; // array starting with 0
												return (
													<MenuItem key={roomDropdown} value={roomDropdown}>
														{roomDropdown}
													</MenuItem>
												);
											})}
										</TextField>
									</FormControl>
								</Grid>
							)}

							<Grid
								item
								xs={4}
								container
								direction='row'
								alignItems='center'
								justifyContent='flex-end'
							>
              
								{locale.value === Constants.LANGUAGES_EN &&
								<Grid item container direction='column' xs className="alignRight alignment-left">
									<DisplayPrice
										currency={currency}
										price={FormatNumber(room.rateBases.total, 2)}
										priceText={'Inclusive of Taxes'}
									/>
								</Grid>
								}
								{locale.value === Constants.LANGUAGES_AR &&
								<Grid item container direction='column' xs className="alignRight AlignmentLeft">
									<DisplayPrice
										currency={currency}
										price={FormatNumber(room.rateBases.total, 2)}
										priceText={'Inclusive of Taxes'}
									/>
								</Grid>
								}
								{!grouped && searchedRoom.room == 1 && (
									<SelectButton
										disableSelect={disableSelect}
										handleFunction={() =>
											handleSelect({ type: 'one', room: room })
										}
									/>
								)}
							</Grid>
						</Grid>
					</Paper>
				);
			})}
			{showMore && (
				<Grid item xs align='center'>
					<Button
						variant='text'
						size='medium'
						endIcon={<ArrowDropDown />}
						onClick={handleShowMore}
						sx={{ color: 'black' }}
					>
						{t('Show More')}
					</Button>
				</Grid>
			)}
			{showLess && (
				<Grid item xs align='center'>
					<Button
						variant='text'
						size='medium'
						endIcon={<ArrowDropUp />}
						onClick={handleShowLess}
						sx={{ color: 'black' }}
					>
						{t('Show Less')}
					</Button>
				</Grid>
			)}
			{!grouped && searchedRoom.room > 1 && (
				<Grid container item xs>
					<Grid item container direction='column' xs className="alignRight alignment-left">
						{totalAmount > 0 && (
							<DisplayPrice
								currency={currency}
								price={totalAmount}
								priceText={t('Total + Inclusive of Taxes')}
							/>
						)}
					</Grid>
					<SelectButton
						disableSelect={disableSelect}
						handleFunction={() => handleSelect({ type: 'multiple' })}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default RoomResultsRow;
