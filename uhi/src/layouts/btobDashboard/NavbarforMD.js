import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Box, Toolbar, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
//import { MHidden } from '../../components/@material-extend';
// import LanguagePopover from './LanguagePopover';
// import Logo from '../../components/Logo';

//components
//import Constants from '../../helpers/constants';
import { useLocale } from '../../context/LocaleContext';
import { DrawerMenu } from '../../components/drawer/DrawerMenu';

import { useTranslation } from 'react-i18next';


export default function CommonNavbar({ sidebarConfig,drawerWidth }) {
	//drawer states
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [direction, setDirection] = React.useState('left');
	const [drawer, setDrawer] = React.useState(null);

	//local component
	const { changeLocale, availableLocales } = useLocale();

	const { t } = useTranslation();

	//Set Drawer direction and items
	const handleDrawerToggle = (className) => {

		if (className == 'left' || className == 'right') {
			if (mobileOpen == false) {
				setMobileOpen(!mobileOpen);
			}
			let drawerItem = '';

			//language list
			if (className == 'right') {
				drawerItem = (
					<Box>
						<Toolbar />
						<List>
							{availableLocales.map((option) => (
								<ListItem button key={option.value} onClick={handleSelectLanguage(option.value)} value={option.value}>

									<ListItemText variant="text" primary={t(option.label)} sx={{ textTransform: 'capitalize' }} />
								</ListItem>
							))}
						</List>
					</Box>
				);

			} else {
				//Menu Items
				drawerItem = (
					<Box>
						<Toolbar />
						<List>
							{sidebarConfig.map((value) => (
								<ListItem button component={RouterLink} to={value.path} key={value.title} onClick={() => setMobileOpen(false)}>

									<ListItemText variant="text" primary={t(value.title)} sx={{ textTransform: 'capitalize' }} />
								</ListItem>
							))}
						</List>
						<List>
							<ListItem button variant="outlined" component={RouterLink} to="/agent-login" onClick={() => setMobileOpen(false)}>
								<ListItemText variant="text" primary={t('Login/Register')} sx={{ textTransform: 'capitalize' }} />
							</ListItem>
						</List>
					</Box>
				);
			}
			setDrawer(drawerItem);
			setDirection(className);
		} else {

			setMobileOpen(false);
		}
	};

	const handleSelectLanguage = (selected) => () => {
		changeLocale(selected)
		setMobileOpen(false);
	};


	return (
		<Box>
			<IconButton
				aria-label="open drawer"
				className="menuButton"
				edge="start"
				onClick={() => handleDrawerToggle('left')}
				sx={{ color: '#ffffff' }}
			>
				<MenuIcon />
			</IconButton>
			<DrawerMenu direction={direction} drawer={drawer} drawerWidth={drawerWidth} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

			{/* <Toolbar /> */}
		</Box>


	);

}