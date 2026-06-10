import * as React from 'react';
import { Box, Container } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import { useTranslation } from 'react-i18next'

import '../../style/scss/btob/landing/index.scss';
import Page from '../../components/Page';
import Footer from '../../components/whiteLabel/includes/Footer';
import SectionOne from '../../components/whiteLabel/landing/SectionOne';
import SectionTwo from '../../components/whiteLabel/landing/SectionTwo'
import SocialProof from '../../components/whiteLabel/landing/SocialProof';

export default function Landing() {
	const { t } = useTranslation();
	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)
	return (
		<Page title={t(layoutDetails.details.Title)}>
			<Box className="box-body-flex">
				<Container className="landingLogo body-container-margin paddingTop80" >
					<SectionOne/>
				</Container>
			</Box>
			<Box className=" box-body-flex">
				<Container className="landingPromo body-container-margin paddingTop80" >
					<SectionTwo/>
				</Container>
			</Box>
			<Box className=" box-body-flex">
				<Container className="landingPromo body-container-margin paddingTop80" >
					<SocialProof/>
				</Container>
			</Box>
			<Box className="footerSection box-body-flex" sx={{backgroundColor:layoutDetails.details.colors.FooterColor, marginTop:5 }}>
				<Container className="footer body-container-margin paddingTop80" >
					<Footer />
				</Container>
			</Box>
		</Page>
	);
}
