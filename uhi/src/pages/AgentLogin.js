import React from 'react';
import {Box, Container, Paper, Typography} from '@mui/material';
import NewsSection from '../components/guests/NewsSection';
import {useTranslation} from 'react-i18next';
// ----------------------------------------------------------------------

import Page from '../components/Page';
import {LoginForm} from '../components/authentication/login';
import Footer from '../components/guests/Footer';

export default function AgentLogin() {
	const {t} = useTranslation();

	return (
		<Page title={t('dashboard.title')}>
			<Container maxWidth='xl' sx={{height: '100vh'}}>
				<Paper elevation={3} sx={{
					p: {xs: 1, md: 2},
					backgroundImage: 'url("https://www.umrahholidays.com/_laravel/public/ci/images/umrah/new-body-bg.png")',
					minHeight: 450,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-end',
					alignItems: 'flex-end',
					mb: 2
				}}>
					<Box sx={{
						backgroundColor: '#fff',
						borderRadius: 2,
						width: {xs: '100%', md: 500},
						height: '100%',
						p: 2
					}}>
						<Typography variant="h6">
                            Log In
						</Typography>
						<Typography variant="body2" sx={{mb: 2}}>
                            With your existing Account details
						</Typography>

						<LoginForm />
					</Box>
				</Paper>
				<NewsSection />
				<Footer/>
			</Container>
		</Page>
	);
}
