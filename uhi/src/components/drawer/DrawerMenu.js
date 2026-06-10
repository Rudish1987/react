import * as React from 'react';

// material
import { Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';

export function DrawerMenu({direction, drawer, drawerWidth, mobileOpen, setMobileOpen}){

	return (
		<Box
			component="nav"
			sx={{ zflexShrink: { sm: 0 } }}
		>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Drawer
				variant="temporary"
				anchor={direction}
				open={mobileOpen}
				onClose={() => setMobileOpen(false)}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
                    
				{drawer}
                    
			</Drawer>
                    
		</Box>
	);
}