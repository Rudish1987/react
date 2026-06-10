import React from 'react';
import { useStoreState } from 'easy-peasy';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Toolbar } from '@mui/material';
// import { MHidden } from '../../components/@material-extend';
import Logo from '../../components/Logo';
import LanguagePopover from './LanguagePopover';
import sidebarConfig from './NavLinks';
import HeaderNavSection from './HeaderNavSection';
import CommonNavbar from './CommonNavigationbar';

const APPBAR_MOBILE = 12;
const APPBAR_DESKTOP = 22;

export default function GuestNavbar() {
	const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
		minHeight: APPBAR_MOBILE,
		[theme.breakpoints.up('lg')]: {
			minHeight: APPBAR_DESKTOP,
		},
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}));

	const drawerWidth = 240;
	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)
	return (
		<Box className='navbarSection box-body-flex' sx={{backgroundColor: layoutDetails.details.colors.HeaderColor}}>
			<Container className='body-container-margin'>
				<ToolbarStyle className='container-padding-zero'>
					<Box sx={{ flexGrow: 0, py: 2 }}>
						<Logo src={layoutDetails.logo} />
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<HeaderNavSection navConfig={sidebarConfig} sx={{ px: 3 }} />
					</Box>
					<Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
						<LanguagePopover />
					</Box>
					<Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
						<LanguagePopover />
						<CommonNavbar sidebarConfig={sidebarConfig} drawerWidth={drawerWidth} buttonColor={layoutDetails.details.colors.ButtonColor}></CommonNavbar>
					</Box>
				</ToolbarStyle>
			</Container >
		</Box>
	);
}
