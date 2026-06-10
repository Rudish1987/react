import React,{useState} from 'react';
import {Typography, Popover, Box, Stack, Grid} from '@mui/material';
import CancellationPolicies from './CancellationPolicies';
import {ErrorOutline} from '@mui/icons-material'
import {useTranslation} from 'react-i18next';


const RateType = ({rateBases,currency}) => {

	const [anchorEl, setAnchorEl] = useState(null);
	const [hover,sethover]=useState(false);
	const { t } = useTranslation();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		sethover(true)
	};

	const handleClose = () => {
		setAnchorEl(null);
		sethover(false)
	};

	const id = hover ? 'simple-popover' : undefined;

	let content;
	let type;
	if(rateBases.withinCancellationDeadline ==='no' && rateBases.cancellationRules['@attributes'].count>0)
	{
		content = <Grid item container direction="row" sx={{justifyContent:'center'}}>
			<ErrorOutline onMouseEnter={handleClick} onMouseLeave={handleClose} style={{ color: '#dc140a',cursor:'pointer' }}/>
			<Typography variant="subtitle2" component="div">
				{t('Non Refundable')}
			</Typography></Grid>
		/*Dont remove this commnted Code .As per business it requires late .Developed for UH-2540*/
		//type = 'flexible'
		type = 'within'
	}
	else
	{
		content = <Grid item container direction="row" sx={{justifyContent:'center'}}>
			<ErrorOutline onMouseEnter={handleClick} onMouseLeave={handleClose} style={{ color: '#dc140a',cursor:'pointer' }}/>
			<Typography variant="subtitle2" component="div">
				{t('Non Refundable')}
			</Typography>
		</Grid>
		type='within'
	}

	return (
		<>
			{content}
			<Popover
				id={id}
				open={hover}
				anchorEl={anchorEl}

				style={{ pointerEvents: 'none' }}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Box sx={{ width: 300, p : 1, backgroundColor: '#ededed'}}>
					<Stack spacing={2} sx={{ borderBottom: '2px solid #E0E0E0' }}>
						<Typography variant="caption" component="div" sx={{color: (theme) => theme.palette.primary.main}}>{t('Cancellation Policy')}</Typography>
					</Stack>
					<CancellationPolicies cancellationRules={rateBases.cancellationRules} type={type} currency={currency}/>

				</Box>
			</Popover>
		</>
	);
}

export default RateType;