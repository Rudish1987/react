import { useStoreState } from 'easy-peasy';
import { FormatNumber } from '../helpers/utils';

export const useAccommodationResult = () => {
	const { rooms: searchedRoom } = useStoreState((s) => s.btoc.filters);

	const prepareAccommodationList = (values) => {
		if (values.length == 0) {
			return false;
		}
		let roomTypeCode = 0;
		let boardBasis = 0;
		let selectedRoom = {};
		const grouped = searchedRoom.length > 1 ? true : false;

		values.map((value) => {
			const x = { hotelid: value['@attributes'].hotelid, rooms: [] };
			const prepareAllocationsArray = () => {
				const rooms =
					Number(value.rooms['@attributes'].count) > 1
						? value.rooms.room
						: [value.rooms.room];
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
			const allocationsArray = prepareAllocationsArray();

			const prepareRoomAmountArray = () => {
				const rooms =
					Number(value.rooms['@attributes'].count) > 1
						? value.rooms.room
						: [value.rooms.room];
				const amount = {};
				const finalAmount = [];
				let incrementer = 0;
				for (let j = 0; j < rooms.length; j++) {
					const roomtypes =
						Number(rooms[j]['@attributes'].count) > 1
							? rooms[j].roomType
							: [rooms[j].roomType];
					amount[j] = {};
					for (let i = 0; i < roomtypes.length; i++) {
						let roomCode = roomtypes[i]['@attributes'].roomtypecode;
						const rateBasis =
							Number(roomtypes[i].rateBases['@attributes'].count) > 1
								? roomtypes[i].rateBases.rateBasis
								: [roomtypes[i].rateBases.rateBasis];
						amount[j][roomCode] = {};
						for (let k = 0; k < rateBasis.length; k++) {
							let ratetype = rateBasis[k]['@attributes'].id;
							if (amount[j][roomCode][ratetype] === undefined) {
								amount[j][roomCode][ratetype] = [];
							}
							amount[j][roomCode][ratetype] = FormatNumber(rateBasis[k].total)
						}
					}
				}
				for (let j in searchedRoom) {
					for (let i = 0; i < searchedRoom[j].room; i++) {
						if (amount[incrementer] !== undefined) {
							if (finalAmount[j] === undefined) {
								finalAmount[j] = amount[incrementer];
							} else {
								for (let key in finalAmount[j]) {
									for (let key2 in finalAmount[j][key]) {
										if(amount[incrementer][key] !== undefined && amount[incrementer][key][key2] !== undefined){
											finalAmount[j][key][key2] = amount[incrementer][key][key2]
										}
									}
								}
							}
						}
						incrementer++;
					}
				}
				return finalAmount;
			};
			const roomAmountArray = prepareRoomAmountArray();

			const prepareHotelRoomsArray = () => {
				if (Number(value.rooms['@attributes'].count) === 1) {
					return [value.rooms.room];
				}
				if (grouped) {
					let groupRooms = [];
					let processedRooms = [];
					let rooms = [...value.rooms.room];
					for (let i = 0; i < searchedRoom.length; i++) {
						for (let j = 0; j < rooms.length; j++) {
							if (
								searchedRoom[i].adultsCount === Number(rooms[j]['@attributes'].adults) &&
								processedRooms.indexOf(`${i}_${searchedRoom[i].room}_${searchedRoom[i].adultsCount}`) === -1
							) {
								groupRooms.push(rooms[j]);
								processedRooms.push(`${i}_${searchedRoom[i].room}_${searchedRoom[i].adultsCount}`);
							}
						}
					}
					return groupRooms;
				} else {
					return [value.rooms.room[0]];
				}
			};

			searchedRoom.map((searchReq, idx) => {
				x.rooms[idx] = { ...searchedRoom[idx], roomTypeCodes: [] };
				const hotelRoom = prepareHotelRoomsArray()
				const roomType = hotelRoom[idx].roomType.length > 1 ? hotelRoom[idx].roomType : [hotelRoom[idx].roomType]
				roomTypeCode = roomType[0]['@attributes'].roomtypecode;
				boardBasis = roomType[0]['rateBases'].rateBasis.length > 1 ? roomType[0]['rateBases'].rateBasis[0]['@attributes'].id : roomType[0]['rateBases'].rateBasis['@attributes'].id;
				
				x.rooms[idx].roomTypeCodes.push({
					RoomType: roomTypeCode,
					roomAmount: Object.keys(roomAmountArray[idx]).length == 0 ? 0 : roomAmountArray[idx][roomTypeCode][boardBasis],
					roomRateBasis: boardBasis,
					selectedRoom: searchReq.room,
					roomToken: Object.keys(allocationsArray[idx]).length == 0 ? [] :  allocationsArray[idx][roomTypeCode][boardBasis],
					roomName: roomType[0].name,
					withinCancellationDeadline: roomType[0]['rateBases'].rateBasis.length > 1 ? roomType[0]['rateBases'].rateBasis[0].withinCancellationDeadline : roomType[0]['rateBases'].rateBasis.withinCancellationDeadline,
					cancellationRules: roomType[0]['rateBases'].rateBasis.length > 1 ? roomType[0]['rateBases'].rateBasis[0].cancellationRules : roomType[0]['rateBases'].rateBasis.cancellationRules,
				})
				selectedRoom[x.hotelid] = x;
			})
		})
		return selectedRoom;
	}

	return {
		prepareAccommodationList
	}
}