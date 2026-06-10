import React from 'react';

import {NavLink as RouterLink} from 'react-router-dom';

// material
import {styled} from '@mui/material/styles';
import {Box, Stack, Toolbar, IconButton, Button, AppBar} from '@mui/material';
import {MHidden} from '../../components/@material-extend';

//components
import Constants from '../../helpers/constants';
import Logo from '../../components/Logo';
import LanguagePopover from '../dashboard/LanguagePopover';
import sidebarConfig from '../guests/MenuLinks';
import GuestHeaderNavSection from '../../components/navigation/GuestHeaderNavSection';
import {PermIdentity} from '@mui/icons-material';
import CommonNavbar from '../common/CommonNavbar';

const APPBAR_MOBILE = 12;
const APPBAR_DESKTOP = 22;

const RootStyle = styled(AppBar)(({ theme }) => ({
	position: 'fixed',
	zIndex: theme.zIndex.drawer + 1,
	boxShadow: 4,
	backdropFilter: 'blur(6px)',
	WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
	backgroundColor: theme.palette.common.white,
	color: theme.palette.common.white,
}));

const ToolbarStyle = styled(Toolbar)(({theme}) => ({
    
	minHeight: APPBAR_MOBILE,
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	[theme.breakpoints.up('lg')]: {
		minHeight: APPBAR_DESKTOP,
		padding: theme.spacing(0, 5)
	}
}));

export default function GuestNavbar() {
	const drawerWidth = 240;
    
	return (
		<ToolbarStyle>
			<MHidden width="smUp">
				{/* <IconButton onClick={openSidebar} sx={{mr: 1}}>
                    <MenuOutlinedIcon/>
                </IconButton> */}
				<CommonNavbar sidebarConfig={sidebarConfig} RootStyle={RootStyle} drawerWidth={drawerWidth} ToolbarStyle={ToolbarStyle}></CommonNavbar>
			</MHidden>
			<Box sx={{px: 1, py: 2, alignItems: 'center'}}>
				<Box component={RouterLink} to="/" sx={{display: 'inline-flex'}}>
					<Logo src={Constants.LOGO}/>
				</Box>
			</Box>
			<MHidden width="smUp">
				<IconButton onClick={() => {}} sx={{mr: 1}}>
					<PermIdentity/>
				</IconButton>
			</MHidden>
			<MHidden width="smDown">
				<GuestHeaderNavSection navConfig={sidebarConfig} sx={{px: 3}}/>
				<Box sx={{flexGrow: 1}}/>
				<Stack direction="row" alignItems="center" spacing={{xs: 0.5, sm: 1.5, display:'flex'}}>
					<Button variant="outlined" component={RouterLink} to="/agent-login">Agent Login</Button>
					<Button variant="outlined">UO Login</Button>
					<LanguagePopover/>
				</Stack>
			</MHidden>
		</ToolbarStyle>
	);
}
