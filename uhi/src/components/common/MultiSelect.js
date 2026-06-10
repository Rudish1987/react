import React from 'react';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CancelIcon from '@mui/icons-material/Cancel';
import './select.css';


const ITEM_HEIGHT = 43;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 100,
		},
	},
};

export const MultiSelect = ({ setStateValue,listData, labelName, textLength, fieldName, fieldId }) => {
	const [selectedItem, setSelectedItem] = React.useState([]);

	const handleDelete = (removeChip) => {
		setSelectedItem((current) => {
			const removedItems = current.filter(itemRemove => itemRemove[fieldId] != removeChip[fieldId]);
			setStateValue(removedItems);
			return removedItems;
		});
	};

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setSelectedItem(
			typeof value === 'string' ? value.split(',') : value,
		);
		setStateValue(value);
	};

	return (
		<>
			<InputLabel id="demo-simple-select-label">{labelName}</InputLabel>
			<Select
				labelId="demo-multiple-chip-label"
				id="demo-multiple-chip"
				multiple
				value={selectedItem}
				onChange={handleChange}
				input={<OutlinedInput id="select-multiple-chip" label={labelName} />}
				renderValue={(selected) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected.map((value) => (
							<Chip
								title={value[fieldName]}
								key={value[fieldId]}
								variant='default'
								color='default'
								size='small'
								label={value[fieldName].length > textLength ? `${value[fieldName].substring(0, textLength)}...` : value[fieldName]}
								clickable
								deleteIcon={
									<CancelIcon
										onMouseDown={(event) => event.stopPropagation()}
									/>
								}
								onDelete={() => handleDelete(value)}
							/>

						))}
					</Box>
				)}
				MenuProps={MenuProps}
			>
				{listData.map((item) => (
					<MenuItem key={item[fieldId]} value={item}>
						<Checkbox checked={selectedItem.map(sn => sn[fieldName]).indexOf(item[fieldName]) > -1} />
						<ListItemText primary={item[fieldName]} />
					</MenuItem>
				))}
			</Select>
		</>
	)
}