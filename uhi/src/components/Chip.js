import React from 'react'

// material
import { Chip } from '@mui/material'
import { styled } from '@mui/material/styles'

const ChipStyled = styled(Chip)(() => ({
	fontWeight: 400,
	fontSize: 12,
	margin: '4px 4px'
}));

export const MuiChip = ({ labelId, label, isChecked, onChipClick }) => {

	const handleClick = (text) => {
		let isSelected = !isChecked
		onChipClick(text, isSelected)
	}

	return (
		<>
			<ChipStyled
				label={label}
				color={isChecked ? 'primary' : 'default'}
				variant="outlined"
				onClick={() => handleClick(labelId)}
			/>
		</>
	)

}