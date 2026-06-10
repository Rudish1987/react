import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import AgentCredit from '../../components/confirmation/AgentCredit'
import { Container } from '@mui/material'

const AgentCreditPage = () => {
	const { t } = useTranslation();
	return (
		<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
			<Page title={t('agentCredit.title')}>
				<AgentCredit />
			</Page>
		</Container>
	);
}

export default AgentCreditPage;