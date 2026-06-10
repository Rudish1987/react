import React from 'react'
// material
import { Button, Popover, Typography, Grid, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
import BadgeUnstyled, { badgeUnstyledClasses } from '@mui/base/BadgeUnstyled';
import { useTranslation } from 'react-i18next'
import ClearIcon from '@mui/icons-material/Clear'
import { CategoryFilter } from './filter/CategoryFilter';
import { DistanceFilter } from './filter/DistanceFilter';
import { TransportTypeFilter } from './filter/TransportTypeFilter';
import FilterListIcon from '@mui/icons-material/FilterList';

const StyledPopover = styled(Popover)({
	'& .MuiPopover-paper': {
		width: 450,
		minHeight: 270,
		background: '#FFFFFF',
		border: '1px solid #282E36',
		boxShadow: '4px 4px 9px rgba(0, 0, 0, 0.25)',
		borderRadius: 6,
		mt: 2
	}
});
const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #282E36;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }

  & .${badgeUnstyledClasses.invisible} {
    display: none;
  }
`;
const StyledButton = styled(Button)(({ theme }) => ({
	color: theme.palette.common.black,
	fontWeight: 600,
	height: '40px',
	border: '1px solid #757575',
	position: 'relative',
	top: '4px',
	'&:hover': {
		background: theme.palette.common.white,
		borderColor: theme.palette.common.black,
	}
}));

export const Filter = ({ categoryList, transferTypeList, selectedCategory, setSelectedCategory, selectedTransferType, setSelectedTransferType, applyFilters, minDistance, maxDistance, setDistanceRange, distanceRange, setSearchHotelName, module }) => {

	const { t } = useTranslation();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const [filterCount, setFilterCount] = React.useState(2);
	const [filterResetKey, setFilterResetKey] = React.useState(0);
	const [filterResetKeyCat, setFilterResetKeyCat] = React.useState(1);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		if (module == 'accommodation') {
			setSearchHotelName('');
			applyFilters('', distanceRange);
		}
	}
	const handleClose = () => {
		setAnchorEl(null);
	}
	const popoverOpen = Boolean(anchorEl)
	const id = popoverOpen ? 'simple-popover' : undefined

	const resetFilters = () => {
		if (module == 'accommodation') {
			setDistanceRange([minDistance, maxDistance]);
			applyFilters('', [minDistance, maxDistance]);
		}

		if (module == 'transfer') {
			setSelectedCategory([0]);
			setSelectedTransferType([0]);
			setFilterResetKey(filterResetKey + 1);
			setFilterResetKeyCat(filterResetKeyCat + 1);
			setFilterCount(2);
		}

		if (module == 'groundService') {
			setSelectedCategory([0]);
			setFilterResetKey(filterResetKey + 1);
			setFilterResetKeyCat(filterResetKeyCat + 1);
			setFilterCount(2);
		}
	};
	const buildFilterCount = () => {
		let count = 0;

		if (module == 'transfer') {
			let categoryCount = selectedCategory.length
			let transferTypeCount = selectedTransferType.length

			count = Number(categoryCount) + Number(transferTypeCount)
		}
		return count;
	}

	return (
		<>
			<StyledBadge badgeContent={buildFilterCount()}>
				<StyledButton aria-describedby={id} variant="outlined" onClick={handleClick} startIcon={<FilterListIcon />}>
					{t('FILTERS')}
				</StyledButton>
			</StyledBadge>

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
				<Stack spacing={2} sx={{ height: 60, display: 'flex', alignItems: 'flex-end', pb: 2, pt: 2, pl: 0.25, pr: 0.25, m: 1, borderBottom: '2px solid #E0E0E0' }}>
					<Grid container
						direction="row">
						<Grid item xs={12} lg={11} sx={{ display: 'flex', alignItems: 'flex-end', color: 'Secondary/Dark' }} >
							<Typography sx={{ fontWeight: 600, fontSize: 20 }}>{t('FILTERS')}</Typography>
						</Grid>
						<Grid item xs={12} lg={1} sx={{ display: 'flex', alighItems: 'flex-end', justifyContent: 'flex-end', color: 'Secondary/Dark', cursor: 'pointer' }}>
							<ClearIcon onClick={handleClose} />
						</Grid>
					</Grid>
				</Stack>
				{module == 'accommodation' &&
					<>
						<DistanceFilter applyFilters={applyFilters} minDistance={minDistance} maxDistance={maxDistance} setDistanceRange={setDistanceRange} distanceRange={distanceRange} />
					</>
				}
				{module == 'transfer' &&
					<>
						<CategoryFilter listData={categoryList} key={filterResetKeyCat} filterCount={filterCount} setFilterCount={setFilterCount} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
						<TransportTypeFilter listData={transferTypeList} key={filterResetKey} filterCount={filterCount} setFilterCount={setFilterCount} selectedTransferType={selectedTransferType} setSelectedTransferType={setSelectedTransferType} />
					</>
				}
				{module == 'groundService' &&
					<>
						<CategoryFilter listData={categoryList} key={filterResetKeyCat} filterCount={filterCount} setFilterCount={setFilterCount} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
					</>
				}
				<Stack spacing={2} maxWidth="sm" sx={{ display: 'flex', justifyContent: 'right', fontSize: 15, width: 145, m: 1, float: 'right' }}>
					<Button variant="outlined" onClick={resetFilters}>{t('RESET FILTERS')}</Button>
				</Stack>

			</StyledPopover>
		</>
	)
}