import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import '../../style/scss/btob/landing/index.scss';
import {AppBar, Box, Container} from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../btobAuth/Navbar';
import Imagexs from '../../Assets/BGGroup-xs.svg';
import Image from '../../Assets/BGImage.svg';
import HeroBanner from '../../components/b2b/includes/HeroBanner';
import Footer from '../../components/b2b/includes/Footer';
import FooterBtoB from '../btobGuest/FooterBtoB';
import {useStoreState} from 'easy-peasy';
import Constants from '../../helpers/constants';
import LandingSkeleton from '../../components/skeleton/LandingSkeleton';

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

const BackgroundImgStyle = styled('div')(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		backgroundImage: `url(${Imagexs})`,
	},
	backgroundImage: `url(${Image})`,
	color: theme.palette.primary.main,
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundColor: '#ffffff!important'
}));

const MainStyle = styled('div')(({ theme }) => ({
	flexGrow: 1,
	[theme.breakpoints.up('lg')]: {
	}
}));
const RefStyle = styled('div')(() => ({
}));
const BtobAuthLayout = () => {
	/* eslint-disable no-unused-vars */
	const [open, setOpen] = useState(false);
	const isAuth = useStoreState(s => s.isAuth)
	const userDetails = useStoreState(s => s.user.user)
	const { pathname } = useLocation();
	const filterPath = userDetails.siteMenu.find(o => {return o.path === pathname}) ?? []

	const myRef = React.useRef(null);
	React.useEffect(() => {
		myRef.current.scrollIntoView()
	}, [pathname]);

	if(isAuth === true && (pathname === '/' || (Object.keys(filterPath).length > 0 && filterPath.visible !== true))) {
		window.location.href = Constants.DOTW_BACKEND_STAGE_URL + 'otherAccommodation';
		return (
			<RootStyle>
				<MainStyle>
					<RefStyle ref={myRef}></RefStyle>
					<LandingSkeleton/>
				</MainStyle>
			</RootStyle>
		)
	} else {
		return (
			<RootStyle>
				<MainStyle>
					<RefStyle ref={myRef}></RefStyle>
					{pathname === '/' ? <BackgroundImgStyle>
						<Navbar openSidebar={() => setOpen(true)}/>
						<HeroBanner/>
					</BackgroundImgStyle> : <Navbar openSidebar={() => setOpen(true)}/>}
					<Outlet/>
					{pathname === '/' ? <Box className="footerSection box-body-flex">
						<Container className="footer body-container-margin paddingTop80">
							<Footer/>
						</Container>
					</Box> : <FooterBtoB/>}
				</MainStyle>
			</RootStyle>
		)
	}
}

export default BtobAuthLayout;