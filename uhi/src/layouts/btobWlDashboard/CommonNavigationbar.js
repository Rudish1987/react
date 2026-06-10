import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Box, Toolbar, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

//components
import { DrawerMenu } from '../../components/drawer/DrawerMenu';
import { useTranslation } from 'react-i18next';


export default function CommonNavbar({ sidebarConfig, drawerWidth, buttonColor }) {
	//drawer states
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [direction, setDirection] = React.useState('left');
	const [drawer, setDrawer] = React.useState(null);

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
							{sidebarConfig.map((value) => (
								<ListItem button component={RouterLink} to={value.path} key={value.title} onClick={() => setMobileOpen(false)}>
									<ListItemText variant="text" primary={t(value.title)} sx={{ textTransform: 'capitalize' }} />
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

	return (
		<>
			<IconButton
				aria-label="open drawer"
				className="Button"
				edge="start"
				onClick={() => handleDrawerToggle('right')}
				size="large"
				sx={{paddingX: 1, paddingY: 0, color: buttonColor }}
			>
				<MenuIcon />
			</IconButton>

			{/* Drawer Component with direction, UI, Width, open/close, toggle function */ }
			< DrawerMenu direction = { direction } drawer = { drawer } drawerWidth = { drawerWidth } mobileOpen = { mobileOpen } setMobileOpen = { setMobileOpen } />
		</>
	);

}