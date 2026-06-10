import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import ForgotPassword from '../../components/users/ForgotPassword'
import { Container } from '@mui/material';

const ForgotPasswordPage = () => {
	const { t } = useTranslation();
	return (
		<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
			<Page title={t('reset password')}>
				<ForgotPassword />
			</Page>
		</Container>
	);
}

export default ForgotPasswordPage;