import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import {Box, Toolbar, IconButton, List, ListItem, ListItemText, Divider, Link} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

//components
import { DrawerMenu } from '../../components/drawer/DrawerMenu';
import { useTranslation } from 'react-i18next';
import {useStoreState} from 'easy-peasy';
import Constants from '../../helpers/constants';

export default function CommonNavbar({ sidebarConfig, drawerWidth }) {
	//drawer states
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [direction, setDirection] = React.useState('left');
	const [drawer, setDrawer] = React.useState(null);
	const { t } = useTranslation();
	const isAuth = useStoreState(s => s.isAuth)

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
							{isAuth && <>
								<Divider />
								<ListItem button component={RouterLink} to={'/contact-us'} onClick={() => setMobileOpen(false)}>
									<ListItemText variant="text" primary={t('CONTUCT US')} sx={{ textTransform: 'capitalize' }} />
								</ListItem>
								<ListItem component={Link} color={'grey.900'} sx={{cursor: 'pointer'}} onClick={() => {window.location.href = 'https://support.umrahholidays.com/en/support/home'}} >
									<ListItemText variant="text" primary={t('SUPPORT')} sx={{ textTransform: 'capitalize' }} />
								</ListItem>
								<Divider />
								<ListItem component={Link} color={'grey.900'} sx={{cursor: 'pointer'}} onClick={() => {window.location.href = Constants.BFF_LOGOUT_URL}}>
									<ListItemText variant="text" primary={t('LOGOUT')} sx={{ textTransform: 'capitalize' }} />
								</ListItem>
							</>}
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
				onClick={() => handleDrawerToggle('left')}
				size="large"
				sx={{paddingX: 0, paddingY: 1 }}
			>
				<MenuIcon sx={{...(!isAuth && { color: { xs: 'grey.900', sm: 'grey.0' } }), ...(isAuth && { color: 'grey.900' }) }}/>
			</IconButton>

			{/* Drawer Component with direction, UI, Width, open/close, toggle function */ }
			< DrawerMenu direction = { direction } drawer = { drawer } drawerWidth = { drawerWidth } mobileOpen = { mobileOpen } setMobileOpen = { setMobileOpen } />
		</>
	);

}
