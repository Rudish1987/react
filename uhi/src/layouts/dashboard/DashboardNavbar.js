import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { MHidden } from '../../components/@material-extend';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

//

import Logo from '../../components/Logo';
import LanguagePopover from './LanguagePopover';
import HeaderNavSection from '../../components/navigation/HeaderNavSection';
import sidebarConfig from './SidebarConfig';
import AccountPopover from './AccountPopover';

const APPBAR_MOBILE = 12;
const APPBAR_DESKTOP = 22;

const RootStyle = styled(AppBar)(({ theme }) => ({
	position: 'fixed',
	zIndex: theme.zIndex.drawer + 1,
	boxShadow: 4,
	backdropFilter: 'blur(6px)',
	WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.common.white,
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
	minHeight: APPBAR_MOBILE,
	[theme.breakpoints.up('lg')]: {
		minHeight: APPBAR_DESKTOP,
		padding: theme.spacing(0, 5)
	}
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
	onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ toggleSidebar }) {
	return (
		<RootStyle>
			<ToolbarStyle>
				<MHidden width="mdUp">
					<IconButton onClick={toggleSidebar} sx={{ mr: 1 }}>
						<MenuOutlinedIcon />
					</IconButton>
				</MHidden>

				<Box sx={{ px: 1, py: 2 }}>
					<Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
						<Logo />
					</Box>
				</Box>

				<MHidden width="smDown">
					<HeaderNavSection navConfig={sidebarConfig} sx={{ px: 3 }} />
				</MHidden>

				<Box sx={{ flexGrow: 1 }} />

				<Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
					<LanguagePopover />
					<AccountPopover />
				</Stack>
			</ToolbarStyle>
		</RootStyle>
	);
}
