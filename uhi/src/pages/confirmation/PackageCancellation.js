import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import PackageCancellationPopup from '../../components/confirmation/PackageCancellationPopup'

const PaymentDetails = () => {
	const { t } = useTranslation();
	return (
		<Page title={t('packageCancellation.title')}>
			<PackageCancellationPopup />
		</Page>
	);
}

export default PaymentDetails;