import * as React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import NewsSection from '../../components/b2b/landing/NewsSection';
import ResolvesSection from '../../components/b2b/landing/ResolvesSection';
import OurCommitmentSection from '../../components/b2b/landing/OurCommitmentSection';
import '../../style/scss/btob/landing/index.scss';
import LogoSection from '../../components/b2b/landing/LogoSection';
import PromoSection from '../../components/b2b/landing/PromoSection'
import WhatOthersThink from '../../components/b2b/landing/WhatOthersThink'
import Image from '../../Assets/Pattern.png';
import Page from '../../components/Page';
import {useTranslation} from 'react-i18next';
import {Helmet} from 'react-helmet-async';

export default function Landing() {
	const { t } = useTranslation();
	const BackgroundWhatOffersThinkStyle = styled('div')(({ theme }) => ({
		backgroundImage: `url(${Image})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundColor: theme.palette.grey[100],
	}));

	const additionalMetaTag = () => {
		return (
			<Helmet>
				<meta name="description" content="Join Umrah Holidays International, part of the dynamic WebBeds Group, for unparalleled B2B wholesale hotel rates in Makkah and a seamless Umrah platform experience. with us for growth – contact us to elevate your travel offerings."/>
				<meta name="keywords" content="B2B wholesale hotel rates Makkah, B2B Umrah Platform"/>
			</Helmet>
		)
	}

	return (
		<Page title={t('Umrah Packages, Group Accommodation in Makkah & Madinah')} meta={additionalMetaTag()}>
			<Box className="landingLogoSection box-body-flex">
				<Container className="landingLogo body-container-margin " >
					<LogoSection />
				</Container>
			</Box>
			<Box className="landingResolveSection box-body-flex">
				<Container className="landingResolve body-container-margin" >
					<ResolvesSection />
				</Container>
			</Box>
			<Box className="landingOurCommitmentSection box-body-flex">
				<Container className="landingOurCommitment body-container-margin paddingTop80" >
					<OurCommitmentSection />
				</Container>
			</Box>
			<Box className="landingNewsSection box-body-flex">
				<Container className="landingNews body-container-margin" sx={{paddingBottom:{xl:10,lg:10,md:6,sm:6,xs:6}}} >
					<NewsSection />
				</Container>
			</Box>
			<BackgroundWhatOffersThinkStyle>
				<Box className="whatOthersThinkSection box-body-flex">
					<Container className="whatOthersThink body-container-margin  paddingBottom80" >
						<WhatOthersThink />
					</Container>
				</Box>
			</BackgroundWhatOffersThinkStyle>
			<Box className="landingPromoSection box-body-flex">
				<Container className="landingPromo body-container-margin" sx={{paddingTop:{xl:10,lg:10,md:10,sm:7.5,xs:4},paddingBottom:{xl:10,lg:10,md:10,sm:7.5,xs:4}}} >
					<PromoSection />
				</Container>
			</Box>
		</Page>
	);
}
