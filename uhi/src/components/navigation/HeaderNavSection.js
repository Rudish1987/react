import PropTypes from 'prop-types';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify';
import MenuPopover from '../MenuPopover';

function NavItem({ item, active, ...rest }) {
	const theme = useTheme();
	const isActiveRoot = active(item.path);
	const { title, path, items } = item;

	const activeRootStyle = {
		color: theme.palette.secondary.light,
		bgcolor: theme.palette.primary.dark
	};

	if (items?.length > 0) {
		return (
			<MenuWithChildren
				items={items}
				sx={{
					...(isActiveRoot && activeRootStyle)
				}}
				{...rest}
			>
				<Typography variant="outlined" noWrap>
					{title}
				</Typography>
			</MenuWithChildren>
		);
	}

	return (
		<Button
			component={RouterLink}
			to={path}
			sx={{
				...(isActiveRoot && activeRootStyle)
			}}
			variant="contained"
			{...rest}
		>
			<Typography variant="outlined" noWrap>
				{title}
			</Typography>
		</Button>
	);
}

const MenuWithChildren = ({ items, children, ...rest }) => {
	const anchorEl = useRef(null);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				variant="outlined"
				onClick={handleOpen}
				ref={anchorEl}
				{...rest}
			>
				{children}
			</Button>
			<MenuPopover
				id="basic-menu"
				anchorEl={anchorEl.current}
				open={open}
				onClose={handleClose}
				sx={{ width: 220 }}
			>
				{items.map(option => (
					<MenuItem
						key={option.title}
						to={option.path}
						component={RouterLink}
						onClick={handleClose}
						sx={{ typography: 'body2', py: 1, px: 2.5 }}
					>
						{option.icon && (
							<Box
								component={Icon}
								icon={option.icon}
								sx={{
									mr: 2,
									width: 24,
									height: 24
								}}
							/>
						)}

						{option.title}
					</MenuItem>
				))}
			</MenuPopover>
		</>
	);
}

HeaderNavSection.propTypes = {
	navConfig: PropTypes.array
};

NavItem.propTypes = {
	active: PropTypes.func,
	item: PropTypes.any
};

export default function HeaderNavSection({ navConfig, ...other }) {
	const { pathname } = useLocation();
	const match = (path) => (path ? !!matchPath({ path, end: true }, pathname) : false);

	return (
		<Box {...other}>
			{navConfig.map((item) => (
				<NavItem key={item.title} item={item} active={match} sx={{ mx: 1, px: 2 }}/>
			))}
		</Box>
	);
}
