import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Box } from '@mui/material';
import Navbar from './Navbar';
import HeroBanner from '../../components/whiteLabel/landing/HeroBanner';
import LoginForm from '../../components/whiteLabel/landing/LoginForm'
import { Outlet, useLocation } from 'react-router-dom';
import '../../style/scss/btob/landing/index.scss';
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
const BtobWlDashboardLayout = () => {
	/* eslint-disable no-unused-vars */
	const [open, setOpen] = useState(false);
	const { pathname } = useLocation();
	const myRef = React.useRef(null);
	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)

	const BackgroundImgStyle = styled('div')(({ theme }) => ({
		backgroundImage: `url(${layoutDetails.landingBG})`,
		color: theme.palette.primary.main,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundColor: '#ffffff!important'
	}));

	React.useEffect(() => {
		myRef.current.scrollIntoView()
	}, [pathname]);
	return (
		<RootStyle>
			<MainStyle>
				<RefStyle ref={myRef}></RefStyle>
				<BackgroundImgStyle>
					<Navbar openSidebar={() => setOpen(true)} />
					<HeroBanner />
					<Box className='loginFormSection box-body-flex login-box'>
						<LoginForm />
					</Box>
				</BackgroundImgStyle>
				<Outlet />
			</MainStyle>
		</RootStyle>
	)
}

export default BtobWlDashboardLayout;