import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import Profile from '../../components/users/profile';
import { Container } from '@mui/material';

const MyProfile = () => {
	const { t } = useTranslation();
	return (
		<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
			<Page title={t('My Profile')}>
				<Profile />
			</Page>
		</Container>
	);
}

export default MyProfile;