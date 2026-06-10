import React, { useState } from 'react';
import { Typography, Popover, Box, Stack, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CancellationPolicies from './CancellationPolicies';
import { ErrorOutline } from '@mui/icons-material'


const RateType = ({ rateBases, currency }) => {
	const { t } = useTranslation();
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	let content;
	let type;
	if (rateBases.cancellation === 'Within Cancellation Deadline' || rateBases.withinCancellationDeadline === 'yes') {
		content = <Grid item container direction="row" sx={{ justifyContent: 'center' }}>
			<Typography onMouseEnter={handleClick} onMouseLeave={handleClose} className="result-policy" variant="subtitle2" component="div">
				<ErrorOutline style={{ color: '#dc140a', mx: '2px', marginRight: '4px' }} />
				{t('Non Refundable')}
			</Typography>
		</Grid>
		type = 'within'
	} else {
		content = <Grid item container direction="row" sx={{ justifyContent: 'center' }}>
			<Typography onMouseEnter={handleClick} onMouseLeave={handleClose} className="result-policy" variant="subtitle2" component="div">
				<ErrorOutline style={{ color: '#dc140a', mx: '2px', marginRight: '4px' }} />
				{t('Non Refundable')}
			</Typography>
		</Grid>
		/*Dont remove this commnted Code .As per business it requires late .Developed for UH-2540*/
		//type = 'flexible'
		type = 'within'
	}

	return (
		<>
			{content}
			<Popover
				id={id}
				open={open}
				style={{ pointerEvents: 'none' }}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Box sx={{ width: 300, p: 1, backgroundColor: '#ededed' }}>
					<Stack spacing={2} sx={{ borderBottom: '2px solid #E0E0E0' }}>
						<Typography variant="caption" component="div" sx={{ color: (theme) => theme.palette.primary.main }}>{t('Cancellation Policy')}</Typography>
					</Stack>
					<CancellationPolicies cancellationRules={rateBases.cancellationRules} type={type} currency={currency} />
				</Box>
			</Popover>
		</>
	);
}

export default RateType;