import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, Toolbar, AppBar } from '@mui/material';
import { MHidden } from '../../components/@material-extend';
import Logo from '../../components/Logo';
import LanguagePopover from './LanguagePopover';
import sidebarConfig from './NavLinks';
import HeaderNavSection from './HeaderNavSection';

import CommonNavbar from '../common/CommonNavbar';
import { useLocale } from '../../context/LocaleContext';
import AccountPopover from '../btobAuth/AccountPopover';
import {useStoreState} from 'easy-peasy';

const APPBAR_MOBILE = 10;
const APPBAR_DESKTOP = 22;

export default function GuestNavbar() {
	const { logo } = useLocale();
	const isAuth = useStoreState(s => s.isAuth);

	const RootStyle = styled(AppBar)(({ theme }) => ({
		zIndex: theme.zIndex.drawer + 1,
		position: 'absolute!important',
		boxShadow: 'none',
		background: theme.palette.common.white,
		color: theme.palette.common.white,
	}));

	const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
		minHeight: APPBAR_MOBILE,
		[theme.breakpoints.up('lg')]: {
			minHeight: APPBAR_DESKTOP,
			padding: theme.spacing(0, 5)
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: '0px!important'
		},
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',


	}));

	const drawerWidth = 240;
	return (
		// <RootStyle>
		<Box className='navbarSections box-body-flex'>
			<Container className='body-container-margin'>

				<ToolbarStyle className='container-padding-zero navbar'>

					<Box sx={{ py: 2, alignItems: 'center', display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }} >
						<Box sx={{ display: 'inline-flex' }}>
							<Logo src={logo} />
						</Box>
					</Box>


					<MHidden width="mdDown" sx={{ display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }}>
						<HeaderNavSection sx={{ px: 3,display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }} navConfig={sidebarConfig} />
						<Box sx={{ flexGrow: 1 }} />
						<Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
							<LanguagePopover />
							{isAuth && <AccountPopover/>}
						</Stack>
					</MHidden>


					<MHidden width="mdUp">
						<CommonNavbar sidebarConfig={sidebarConfig} RootStyle={RootStyle} drawerWidth={drawerWidth} ToolbarStyle={ToolbarStyle}></CommonNavbar>
					</MHidden>


				</ToolbarStyle>
			</Container >
		</Box>
		// </RootStyle>
	);
}
