import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar } from '@mui/material';
import Navbar from '../btobWlDashboard/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import '../../style/scss/btob/landing/index.scss';
import Footer from './FooterWl'
import { useStoreState } from 'easy-peasy';

const RootStyle = styled(AppBar)(({ theme }) => ({
	WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile		
	color: theme.palette.primary.main,
	display: 'block',
	backgroundColor: '#ffffff!important',
	flexGrow: '1',
	height: '100vh',
	overflowX: 'hidden',
	overflowY: 'scroll'
}));

//9342
const MainStyle = styled('div')(({ theme }) => ({
	flexGrow: 1,
	[theme.breakpoints.up('lg')]: {
	}
}));
const RefStyle = styled('div')(() => ({
}));
const BtobDashboardLayout = () => {
	/* eslint-disable no-unused-vars */
	const [open, setOpen] = useState(false);
	const { pathname } = useLocation();
	const myRef = React.useRef(null);
	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)
	React.useEffect(() => {
		myRef.current.scrollIntoView()
	}, [pathname]);
	return (
		<RootStyle>
			<MainStyle>
				<RefStyle ref={myRef}></RefStyle>
				<Navbar openSidebar={() => setOpen(true)} />
				<Outlet />
				<Footer/>
			</MainStyle>
		</RootStyle>
	)
}

export default BtobDashboardLayout;