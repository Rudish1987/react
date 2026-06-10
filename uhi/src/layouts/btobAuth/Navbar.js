import React from 'react';
// material
import { styled } from '@mui/material/styles';
import {Box, Container, Stack, Toolbar, AppBar, Link, Tooltip} from '@mui/material';
import Logo from '../../components/Logo';
import LanguagePopover from '../common/LanguagePopover';
import HeaderNavSection from '../btobAuth/HeaderNavSection';

import CommonNavbar from '../common/CommonNavbar';
import { useLocale } from '../../context/LocaleContext';
import AccountPopover from '../btobAuth/AccountPopover';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const APPBAR_MOBILE = 10;
const APPBAR_DESKTOP = 22;

export default function GuestNavbar() {
	const { t } = useTranslation();
	const { logo } = useLocale();
	const navigate = useNavigate();
	const { locale } = useLocale();
	const user = useStoreState(s => s.user);
	let sidebarConfig = user.user.siteMenu ?? [];

	const RootStyle = styled(AppBar)(({ theme }) => ({
		zIndex: theme.zIndex.drawer + 1,
		position: 'relative !important',
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
		<RootStyle>
			<Box className='navbarSections box-body-flex'>
				<Container className='body-container-margin'>
					<ToolbarStyle className='container-padding-zero' sx={{ maxWidth: { xs: '465px', lg: 'unset', sm: 'unset', md: 'unset' } }}>
						<Box sx={{ flexGrow: 0, py: 2 }}>
							<Logo src={logo} />
						</Box>

						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							<HeaderNavSection navConfig={sidebarConfig} sx={{ px: 3 }} />
						</Box>
						<Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
							<Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 2 }}>
								<LanguagePopover />
								<AccountPopover/>
								<Tooltip title={t('Contact Us')} arrow>
									<Link component="button" onClick={() => {navigate('/about-us')}}>
										<PermContactCalendarIcon sx={{...{color: 'grey.900', '&:hover': {color: 'primary.main'}} }} />
									</Link>
								</Tooltip>
								<Tooltip title={t('Support')} arrow>
									<Link rel='noopener noreferrer' href='https://support.umrahholidays.com/en/support/home' target='_blank'>
										<ContactSupportIcon sx={{...{color: 'grey.900', '&:hover': {color: 'primary.main'}} }} />
									</Link>
								</Tooltip>
							</Stack>
						</Box>

						<Box sx={{ ...(locale.value === 'ar' && { paddingLeft: { xs: '27px' } }), ...(locale.value === 'en' && { paddingLeft: { xs: '10px' } }), flexGrow: 0, display: { xs: 'flex', md: 'none' }, position: { sm: 'relative' }, left: { sm: '12px' }, top: { sm: '10px' } }}>
							<Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 2 }}>
								<LanguagePopover />
								<CommonNavbar sidebarConfig={sidebarConfig} RootStyle={RootStyle} drawerWidth={drawerWidth} ToolbarStyle={ToolbarStyle}></CommonNavbar>
							</Stack>
						</Box>

					</ToolbarStyle>
				</Container >
			</Box>
		</RootStyle>
	);
}
