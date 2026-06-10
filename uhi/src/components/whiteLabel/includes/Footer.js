//import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import Logo from '../../Logo';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import Linkdlogo from '../../../Assets/Linkedin.png';
import Twitterlogo from '../../../Assets/Twitter.png';
import { useStoreState } from 'easy-peasy';

const Footer = () => {
	const { t } = useTranslation();
	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)
	const theme = useTheme();
	const FooterLink = styled(Typography)(() => ({
		color: layoutDetails.details.colors.FooterTextColor,
		'&:hover': {
			cursor: 'pointer'
		},
	}))
	return (
		<>
			<Grid container spacing={3} >
				<Grid container item direction='column' xs={12} sm={12} md={2} gap={1}>
					<Grid container item direction='row' alignItems='center' >
						<Logo src={layoutDetails.logo} />
					</Grid>
					<Grid container item direction='row' alignItems='center' >
						<Logo sx={{ height: '40px', width: '40px' }} src={Linkdlogo} />
						<Logo sx={{ height: '40px', width: '40px' }} src={Twitterlogo} />
					</Grid>
				</Grid>
				<Grid container item direction={{xs:'column', md:'row'}} gap={3} justifyContent={{xs:'start' , sm:'center'}} xs={12} sm={12} md={7}>
					<FooterLink variant={theme.typography.caption} fontWeight={theme.typography.fontWeightSemiBold}>{t('Privacy Policy')}</FooterLink>
					<FooterLink variant={theme.typography.caption} fontWeight={theme.typography.fontWeightSemiBold}>{t('Terms and conditions')}</FooterLink>
					<FooterLink variant={theme.typography.caption} fontWeight={theme.typography.fontWeightSemiBold}>{t('Corporate governance')}</FooterLink>
				</Grid>
				<Grid container item direction='column' gap={3} xs={12} sm={12} md={3}>
					<Grid item display='inline-flex' alignItems='center'><FooterLink variant={theme.typography.caption} fontWeight={theme.typography.fontWeightSemiBold}>{t('UHI') + t(' ') + t('Support')}</FooterLink></Grid>
					<Grid item display='inline-flex' alignItems='center'><MailIcon sx={{color: layoutDetails.details.colors.FooterTextColor}} /><FooterLink variant={theme.typography.caption} fontWeight={theme.typography.fontWeightSemiBold}>{t(layoutDetails.details.CustomerEmail)}</FooterLink></Grid>
					<Grid item display='inline-flex' alignItems='center'><CallIcon sx={{color: layoutDetails.details.colors.FooterTextColor}} /><FooterLink variant={theme.typography.caption} fontWeight={theme.typography.fontWeightSemiBold}>{t('+2 02 4000700')}</FooterLink></Grid>
				</Grid>
				<Grid container item direction='column' xs={12} sm={12} md={12} textAlign='center'>
					<FooterLink variant='theme.typography.caption' fontWeight={theme.typography.fontWeightRegular}>
						{t(layoutDetails.details.FooterText)}
					</FooterLink>
				</Grid>
			</Grid>
		</>
	)
}

export default Footer;