import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import {AppBar} from '@mui/material';
import GuestNavbar from './GuestNavbar';
import {Outlet} from 'react-router-dom';
//import DashboardSidebar from '../dashboard/DashboardSidebar';

const RootStyle = styled(AppBar)(({theme}) => ({
	height: '100vh',
	overflow: 'auto',
	boxShadow: 4,
	backdropFilter: 'blur(6px)',
	WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
	backgroundColor: '#f6f6f6',
	color: theme.palette.primary.main
}));

//9342
const MainStyle = styled('div')(({ theme }) => ({
	flexGrow: 1,
	height: '100vh',
	overflow: 'auto',
	paddingTop: 24,
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up('lg')]: {
		paddingTop: 24,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	}
}));

const GuestLayout = () => {
	/* eslint-disable no-unused-vars */
	const [open, setOpen] = useState(false);

	return (
		<RootStyle>
			{/*<DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}/>*/}
			<GuestNavbar openSidebar={() => setOpen(true)}/>
			<MainStyle>
				<Outlet />
			</MainStyle>
		</RootStyle>
	)
}

export default GuestLayout;