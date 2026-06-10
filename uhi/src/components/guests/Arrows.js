import React from 'react';
import { useTheme } from '@mui/material/styles';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button } from '@mui/material';

function Arrow({ children, disabled, onClick }) {
	return (
		<Button
			disabled={disabled}
			onClick={onClick}
			variant="outlined"
			sx={{
				minWidth: 40, p: 1, backgroundColor: '#dc140a', color: '#ffffff', top: 145, zIndex: 1, borderRadius: 21,
				'&:hover': {
					backgroundColor: '#dc140a', color: '#ffffff',
				},
			}}
		>
			{children}
		</Button>
	);
}

export function LeftArrow() {
	const theme = useTheme();
	const {
		scrollPrev,
		isFirstItemVisible,
		visibleItemsWithoutSeparators,
		initComplete
	} = React.useContext(VisibilityContext);

	const [disabled, setDisabled] = React.useState(
		!initComplete || (initComplete && isFirstItemVisible)
	);
	React.useEffect(() => {
		// NOTE: detect if whole component visible
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isFirstItemVisible);
		}
	}, [isFirstItemVisible, visibleItemsWithoutSeparators]);

	return (
		<Arrow disabled={disabled} onClick={() => scrollPrev()}>
			{theme.direction === 'rtl' ? (<ChevronRight fontSize="small" />) : (<ChevronLeft fontSize="small" />) }
		</Arrow>
	);
}

export function RightArrow() {
	const theme = useTheme();
	const {
		scrollNext,
		isLastItemVisible,
		visibleItemsWithoutSeparators
	} = React.useContext(VisibilityContext);

	const [disabled, setDisabled] = React.useState(
		!visibleItemsWithoutSeparators.length && isLastItemVisible
	);
	React.useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			setDisabled(isLastItemVisible);
		}
	}, [isLastItemVisible, visibleItemsWithoutSeparators]);


	return (
		<Arrow disabled={disabled} onClick={() => scrollNext()}>
			{theme.direction === 'rtl' ? (<ChevronLeft fontSize="small" />) : (<ChevronRight fontSize="small" />) }
		</Arrow>
	);
}
