import React from 'react'
// material
import { Box, Paper, Container } from '@mui/material';

// components
import Page from '../components/Page';
import { RegisterForm } from '../components/authentication/register';
import Footer from '../components/guests/Footer';
//import Paper from 'theme/overrides/Paper';

// ----------------------------------------------------------------------

export default function Register() {
	return (
		<Page>
			<Container maxWidth="xl" sx={{ height: '100vh' }}>
				<Paper elevation={3} sx={{
					p: { xs: 1, md: 2 },
					backgroundColor: '#fff',
					minHeight: 450,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-end',
					alignItems: 'flex-end',
					mb: 2
				}}>
					<Box
						sx={{
							backgroundColor: '#fff',
							borderRadius: 2,
							width: '100%',
							height: '100%',
							p: 2,
						}}
					>
						<RegisterForm />
					</Box>
				</Paper >
				<Footer />
			</Container>
		</Page>
	);
}
