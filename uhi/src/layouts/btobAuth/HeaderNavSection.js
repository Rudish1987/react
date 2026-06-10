import React from 'react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';

import {Box, Link, Stack, Typography} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'

function NavItem({ item, active, sx, ...rest }) {
	const theme = useTheme();
	if(item.path == 'join-us#Company-Info'){
		item.path = 'join-us';
	}
	const isActiveRoot = active(item.path);
	if(item.path == 'join-us'){
		item.path = 'join-us#Company-Info';
	}
	const { title, path, target, external } = item;
	const activeRootStyle = {
		color: theme.palette.primary.main,
	};
	const { t } = useTranslation();

	if (external === true) {
		return (
			<Link
				underline="none"
				component="button"
				onClick={() => {window.location.href = path}}
				sx={{
					...sx,
					...{
						color: '#000',
						'&:hover': {
							color: theme.palette.primary.main,
						}
					},
				}}
				{...rest}
			>
				<Typography variant="button">
					{t(title)}
				</Typography>
			</Link>
		)
	}

	if (target != '_blank') {
		return (
			<Link
				underline="none"
				component={RouterLink}
				to={path}
				sx={{
					...sx,
					...{
						color: '#000',
						'&:hover': {
							color: theme.palette.primary.main,
						}
					},
					...(isActiveRoot && activeRootStyle),
				}}
				variant="text"
				size='medium'
				{...rest}
			>
				<Typography variant="button">
					{t(title)}
				</Typography>
			</Link>
		);
	}

	return (
		<Link
			underline="none"
			rel='noopener noreferrer'
			target="_blank"
			href={path}
			sx={{
				...sx,
				...{
					color: '#000',
					'&:hover': {
						color: theme.palette.primary.main,
					}
				},
			}}
			{...rest}
		>
			<Typography variant="button">
				{t(title)}
			</Typography>
		</Link>
	);
}

export default function GuestHeaderNavSection({ navConfig, ...other }) {
	const { pathname } = useLocation();
	const match = (path) => (path ? !!matchPath({ path, end: true }, '/'+pathname.split('/')[1]) : false);
	return (
		<Box {...other}>
			<Stack direction="row" alignItems="center" spacing={{ md: 2, lg: 3 }}>
				{navConfig.map((item) => (
					item.visible && <NavItem key={item.title} item={item} active={match} sx={{ fontWeight: '600' }} />
				))}
			</Stack>
		</Box>
	);
}