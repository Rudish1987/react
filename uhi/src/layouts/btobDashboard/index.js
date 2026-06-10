import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {AppBar, Box, Container} from '@mui/material';
import Navbar from './Navbar';
import HeroBanner from '../../components/b2b/includes/HeroBanner';
import LoginForm from '../../components/b2b/includes/LoginForm';
import { Outlet, useLocation } from 'react-router-dom';
import '../../style/scss/btob/landing/index.scss';
import Image from '../../Assets/BGImage.svg';
import Imagexs from '../../Assets/BGGroup-xs.svg';
import {useStore} from 'easy-peasy';
import Footer from '../../components/b2b/includes/Footer';
import AdditionalTags from '../../components/AdditionalTags';
import { SnackBarAlert } from '../../components/common/SnackBarAlert';
import Constants from '../../helpers/constants';

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


//9342
const MainStyle = styled('div')(({ theme }) => ({
	flexGrow: 1,
	[theme.breakpoints.up('lg')]: {
	}
}));
const RefStyle = styled('div')(() => ({
}));
const BtobDashboardLayout = () => {
	const store = useStore();
	const isAuth = store.getState().isAuth;
	/* eslint-disable no-unused-vars */
	const [open, setOpen] = useState(false);
	const { pathname, search } = useLocation();
	const myRef = React.useRef(null);
	const [snackAlert,setSnackAlert] = React.useState({'message' : 'Warning' , show : false, type : 'warning' });

	React.useEffect(() => {
		myRef.current.scrollIntoView()
	}, [pathname]);

	React.useEffect(() => {
		if(search.match(Constants.BFF_OIDC_ERROR)) {
			setSnackAlert({'message' : Constants.BFF_OIDC_ERROR_TEXT , show : true, type : 'error'})
		}

	}, [])

	return (
		<RootStyle>
			<MainStyle>
				{/* Add all existing meta tags, google script and other scripts */}
				<AdditionalTags />
				<RefStyle ref={myRef}></RefStyle>
				<SnackBarAlert {...snackAlert} resetSnackAlert={setSnackAlert}></SnackBarAlert>
				<BackgroundImgStyle>
					<Navbar openSidebar={() => setOpen(true)} />
					<HeroBanner />
					{!isAuth && <Box className='loginFormSection box-body-flex login-box'>
						<LoginForm/>
					</Box>}
				</BackgroundImgStyle>
				<Outlet />
				<Box className="footerSection box-body-flex">
					<Container className="footer body-container-margin paddingTop80" >
						<Footer />
					</Container>
				</Box>
			</MainStyle>
		</RootStyle>
	)
}

export default BtobDashboardLayout;