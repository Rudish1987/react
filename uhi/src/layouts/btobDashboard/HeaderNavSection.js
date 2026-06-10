import React from 'react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'

function NavItem({ item, active, sx, ...rest }) {
	const theme = useTheme();
	const isActiveRoot = active(item.path);
	const { title, path ,target } = item;
	const activeRootStyle = {
		color: theme.palette.primary.main,
	};
	const { t } = useTranslation();

	if(target != '_blank')
		return (
			<Button
				component={RouterLink}
				to={path}
				sx={{
					...sx,
					...{
						color: '#000',
						'&:hover': {
							color: theme.palette.primary.main,
							backgroundColor: '#f6f6f6'
						}
					},
					...(isActiveRoot && activeRootStyle),
				}}
				variant="text"
				{...rest}
			>
				{t(title)}
			</Button>
		);

	return (
		<Button
			target="_blank"
			href={path}
			sx={{
				...sx,
				...{
					color: '#000',
					'&:hover': {
						color: theme.palette.primary.main,
						backgroundColor: '#f6f6f6'
					}
				},
			}}
			variant="text"
			{...rest}
		>
			{t(title)}
		</Button>
	);
}

export default function GuestHeaderNavSection({ navConfig, ...other }) {
	const { pathname } = useLocation();
	const match = (path) => (path ? !!matchPath({ path, end: true }, pathname) : false);

	return (
		<Box {...other}>
			{navConfig.map((item) => (
				<NavItem key={item.title} item={item} active={match} sx={{ px: 2, fontWeight: '600' }} />
			))}
		</Box>
	);
}