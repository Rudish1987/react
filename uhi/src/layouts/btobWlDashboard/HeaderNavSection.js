import React from 'react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { useStoreState } from 'easy-peasy';

function NavItem({ item, active, sx, ...rest }) {
	const theme = useTheme();
	const isActiveRoot = active(item.path);
	const { title, path ,target } = item;
	const activeRootStyle = {
		color: theme.palette.primary.main,
	};
	const { t } = useTranslation();
	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)

	if(target != '_blank')
		return (
			<Button
				component={RouterLink}
				to={path}
				sx={{
					...sx,
					...{
						color: layoutDetails.details.colors.HeaderTextColor,
						'&:hover': {
							color: layoutDetails.details.colors.HeaderTextColor,
							backgroundColor: 'rgb(0 0 0 / 10%)',
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
					color: layoutDetails.details.colors.HeaderTextColor,
					'&:hover': {
						color: layoutDetails.details.colors.HeaderTextColor,
						backgroundColor: 'rgb(0 0 0 / 10%)',
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
				<NavItem key={item.title} item={item} active={match} sx={{ mx: 1, px: 2, fontWeight: '600' }} />
			))}
		</Box>
	);
}