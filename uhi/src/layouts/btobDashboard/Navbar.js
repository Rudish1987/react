import React from 'react';
// import { NavLink as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Paper, Box, Container, Toolbar } from '@mui/material';
// import { MHidden } from '../../components/@material-extend';
//import Logo from '../../components/Logo';
import LanguagePopover from './LanguagePopover';
import sidebarConfig from './NavLinks';
import HeaderNavSection from './HeaderNavSection';
import BgImgXl from '../../Assets/Vector.svg'
import BgImgXS from '../../Assets/Curve-xs.svg'
import BgImgSM from '../../Assets/BrandingCurve-sm.svg'
import LogoXS from '../../Assets/LogoUHIXS.svg'
import LogoLG from '../../Assets/LogoUHILG.svg'
import CommonNavbar from '../common/CommonNavbar';
import { useLocale } from '../../context/LocaleContext';


const APPBAR_MOBILE = 10;
const APPBAR_DESKTOP = 22;

export default function GuestNavbar() {
	const { locale } = useLocale();

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
		<Box className='navbarSection box-body-flex'>
			<Container className='body-container-margin'>
				{locale.value === 'en' &&
					<Paper>
						<Paper sx={{ display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }}>
							<img src={BgImgXl} className="brandingCurve" alt="" />
						</Paper>
						<Paper sx={{ display: { xs: 'none', sm: 'block', md: 'none', lg: 'none' } }}>
							<img src={BgImgSM} className="smbrandingCurve" alt="" />
						</Paper>
						<Paper sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' } }}>
							<img src={BgImgXS} className="XsbrandingCurve" alt="" />
						</Paper>
					</Paper>
				}
				{locale.value === 'ar' &&
					<Paper>
						<Paper sx={{ display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }}>
							<img src={BgImgXl} className="brandingCurvear" alt="" />
						</Paper>
						<Paper sx={{ display: { xs: 'none', sm: 'block', md: 'none', lg: 'none' } }}>
							<img src={BgImgSM} className="smbrandingCurvear" alt="" />
						</Paper>
						<Paper sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' } }}>
							<img src={BgImgXS} className="XsbrandingCurvear" alt="" />
						</Paper>
					</Paper>
				}

				<ToolbarStyle
					className='container-padding-zero' sx={{ maxWidth: { xs: '465px', lg: 'unset', sm: 'unset', md: 'unset' } }}>
					<Box sx={{ flexGrow: 0, py: 2, display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }}>
						<img src={LogoLG} alt="" />
					</Box>
					<Box sx={{ flexGrow: 0, py: 2, display: { xs: 'none', sm: 'block', md: 'none', lg: 'none' } }}>
						<img src={LogoXS} alt="" />
					</Box>
					<Box sx={{ flexGrow: 0, py: 2, display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' } }}>
						<img src={LogoXS} alt="" />
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<HeaderNavSection navConfig={sidebarConfig} sx={{ px: 3 }} />
					</Box>
					<Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
						<LanguagePopover />
					</Box>

					<Box sx={{ ...(locale.value === 'ar' && { paddingLeft: { xs: '27px' } }), ...(locale.value === 'en' && { paddingLeft: { xs: '10px' } }), flexGrow: 0, display: { xs: 'flex', md: 'none' }, position: { sm: 'relative' }, left: { sm: '12px' }, top: { sm: '10px' } }}>
						<LanguagePopover />
						<CommonNavbar sidebarConfig={sidebarConfig} drawerWidth={drawerWidth}></CommonNavbar>
					</Box>

				</ToolbarStyle>


			</Container >
		</Box >
		// </RootStyle>
	);
}
