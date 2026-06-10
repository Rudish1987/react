import React from 'react'
// material
import { Button, Popover, Typography, Grid, Stack } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge'
import { useTranslation } from 'react-i18next'
import ClearIcon from '@mui/icons-material/Clear'

import { useStoreState } from 'easy-peasy'
import { format } from 'date-fns'

import { EmptyPackage } from './EmptyPackage'
import { PackageItemsList } from './PackageItemsList';
import { useLocale } from '../../../context/LocaleContext'


const StyledPopover = styled(Popover)({
	'& .MuiPopover-paper': {
		width: 524,
		minHeight: 270,
		background: '#FFFFFF',
		border: '2px solid #DC140A',
		boxShadow: '4px 4px 9px rgba(0, 0, 0, 0.25)',
		borderRadius: 6,
		mt: 2
	}
});

export const MyPackage = () => {

	const { t } = useTranslation();
	const { locale } = useLocale();
	const theme = useTheme();
	// item count from booking itinerary
	const itineraryItemCount = useStoreState(actions => actions.btoc.itineraryDetails.itineraryItemCount);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	}
	const handleClose = () => {
		setAnchorEl(null);
	}
	const popoverOpen = Boolean(anchorEl)
	const id = popoverOpen ? 'simple-popover' : undefined


	const rooms = useStoreState(s => s.btoc.filters.rooms)
	const travelPeriod = useStoreState(s => s.btoc.filters.travelPeriod)


	const buildOccupancyText = () => {
		const arrivingOnText = t('Arriving') + ' - ' + format(new Date(travelPeriod.from), 'd') + ' ' + t(format(new Date(travelPeriod.from), 'MMMM'))
		let adults = rooms.reduce((a, b) => a + (b.adultsCount * b.room), 0)
		const adultText = `${adults}` + t(` Adult${adults > 1 ? 's' : ''}`)
		let text = adultText + ' - ' + arrivingOnText

		if (locale.value === 'ar') {
			text = arrivingOnText + ' - ' + adultText
		}

		return text
	}

	return (
		<>
			<Badge badgeContent={itineraryItemCount} invisible={false} showZero={true} color="primary">
				<Button aria-describedby={id} variant="outlined" onClick={handleClick}>
					{t('MY ITINERARY')}
				</Button>
			</Badge>
			<StyledPopover
				id={id}
				open={popoverOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				sx={{ mt: 1 }}
			>
				<Stack spacing={2} sx={{ height: 50, display: 'flex', alignItems: 'flex-end', pb: 2, pt: 2, pl: 0.25, pr: 0.25, m: 2, borderBottom: '2px solid #E0E0E0' }}>
					<Grid container
						direction="row">
						<Grid item xs={12} lg={4} sx={{ display: 'flex', alignItems: 'flex-end', color: 'Secondary/Dark' }} >
							<Typography sx={{fontSize: theme.typography.body1, fontWeight: theme.typography.fontWeightBold, color: theme.palette.grey[800]}}>{t('MY ITINERARY')}</Typography>
						</Grid>
						<Grid item xs={12} lg={7} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', pb: 0.25 }}>
							<Typography sx={{ fontWeight: 400, fontSize: 14, color: 'Grey/900 - Main text', direction: 'ltr' }}>
								{t(buildOccupancyText())}
							</Typography>
						</Grid>
						<Grid item xs={12} lg={1} sx={{ cursor: 'pointer', display: 'flex', alighItems: 'flex-end', justifyContent: 'flex-end', color: 'Secondary/Dark' }}>
							<ClearIcon onClick={handleClose} />
						</Grid>
					</Grid>
				</Stack>

				{(itineraryItemCount > 0)
					? <PackageItemsList />
					: <EmptyPackage />
				}

			</StyledPopover>
		</>
	)
}