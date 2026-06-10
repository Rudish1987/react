import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, Drawer} from '@mui/material';

//
import Scrollbar from '../../components/Scrollbar';
import SidebarNavSection from '../../components/navigation/SidebarNavSection';
import sidebarConfig from './SidebarConfig';
import { MHidden } from '../../components/@material-extend';
import Paper from '@mui/material/Paper';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('lg')]: {
		flexShrink: 0,
		width: DRAWER_WIDTH
	}
}));

DashboardSidebar.propTypes = {
	isOpenSidebar: PropTypes.bool,
	onCloseSidebar: PropTypes.func,
	onOpenSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
	const { pathname } = useLocation();

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const renderContent = (
		<Scrollbar
			sx={{
				marginTop: 10,
				marginBottom: 10,
				marginLeft: 1,
				marginRight: 1,
				height: '100%',
				'& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
			}}
		>
			<Paper sx={{ height: 'inherit', borderRight: 0 }}>
				<SidebarNavSection navConfig={sidebarConfig} />

				<Box sx={{ flexGrow: 1 }} />
			</Paper>
		</Scrollbar>
	)

	return (
		<RootStyle>
			<MHidden width="lgUp">
				<Drawer
					open={isOpenSidebar}
					onClose={onCloseSidebar}
					PaperProps={{
						sx: { width: DRAWER_WIDTH, borderRight: 0 }
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>

			<MHidden width="lgDown">
				<Drawer
					open
					variant="persistent"
					PaperProps={{
						sx: {
							width: DRAWER_WIDTH,
							bgcolor: 'background.default',
							borderRight: 0
						}
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>
		</RootStyle>
	)
}
