import React from 'react';
import Page from '../components/Page';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';

const DashboardApp = () => {
	const { t } = useTranslation();

	return (
		<Page title={t('dashboard.title')}>
			<Container maxWidth='xl'>
				<Box sx={{ pb: 5 }}>
					<Typography variant="h4">{t('dashboard.welcome')}</Typography>
					aaa
				</Box>
			</Container>
		</Page>
	)
};

export default DashboardApp;
