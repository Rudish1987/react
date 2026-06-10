import React from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
// ----------------------------------------------------------------------

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const sidebarConfig = [
	{
		title: 'main menu',
		items: [
			{
				title: 'dashboard',
				path: '/app',
				icon: <DashboardOutlinedIcon />
			},
			{
				title: 'book now',
				path: '/app/book-now',
				icon: <ShoppingBagOutlinedIcon />
			},
			{
				title: 'my bookings',
				path: '/app/my-bookings',
				icon: <FeedOutlinedIcon />
			},
		]
	},
	{
		title: 'account menu',
		items: [
			{
				title: 'my account',
				path: '/app/account',
				icon: <PersonOutlinedIcon />
			},
			{
				title: 'users',
				path: '/app/users',
				icon: <AccountBoxIcon />
			},
			{
				title: 'My e-Wallet',
				path: '/app/e-wallet',
				icon: <AccountBalanceWalletOutlinedIcon />
			},
		]
	}
];

export default sidebarConfig;
