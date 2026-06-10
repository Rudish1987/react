import React from 'react';
import Confirmation from '../../components/confirmation'
import { Container } from '@mui/material';

const ConfirmationPage = () => {
	return (
		<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
			<Confirmation />
		</Container>
	);
}

export default ConfirmationPage;
