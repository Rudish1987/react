//import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import Logo from '../Logo';
import { Twitter } from '@mui/icons-material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import Constants from '../../helpers/constants';

const FooterLink = styled(Typography)(() => ({
	color: '#fff',
	'&:hover': {
		cursor: 'pointer'
	},
	fontWeight: 400,
	fontSize: '16px',
	lineHeight: 2,
	marginBottom: '5px'
}))


const GridItem = styled(Grid)(() => ({
	paddingTop: 5,
	marginBottom: 3,
	paddingBottom: 5,
}))

const FooterLogo = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		display: 'none'
	}
}))
const FollowText = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		display: 'none'
	}
}))


const Footer = () => {
	const { t } = useTranslation();
	// let navigate = useNavigate();
	// const aboutUs = () => {
	// 	let path = '/about-us';
	// 	navigate(path);
	// }
	// const ourStoryPath = () => {
	// 	let path = '/our-story';
	// 	navigate(path);
	// }
	// const benefitsPath = () => {
	// 	let path = '/benefits';
	// 	navigate(path);
	// }

	return (
		<Paper elevation={3} sx={{
			p: 2,
			backgroundColor: '#282E36',
			borderRadius: '0px'
		}}>
			<Container maxWidth='xl'>
				<Grid
					container
					columns={{ xs: 6, sm: 6, md: 12 }}
					direction={{ xs: 'column-reverse', sm: 'column-reverse', md: 'row' }}
					sx={{ mt: 4 }}
				>
					<GridItem item xs={12} sm={12} md={3} className="footerLogopos">

						<FooterLogo direction="row">
							<Logo src={Constants.LOGO} />
						</FooterLogo>

						<FollowText direction="row" className="footer-spac">{t('Follow Us:')}
							<Twitter className="twitter-icon" fontSize="small" />
						</FollowText>

					</GridItem>
					<GridItem item xs={12} sm={12} md={4}>
						<Stack
							direction="row"
							sx={{
								alignItems: 'flex-start'
							}}
							spacing={3}
						>
							<Stack direction="column">
								<FooterLink variant="body2">{t('UHI') + t(' ') + t('Support')}</FooterLink>
								<FooterLink variant="body2"><MailIcon className="mail-icon" />{t('customerservice@uhitravel.com')}</FooterLink>
								<FooterLink variant="body2"><CallIcon className="call-icon" />{t('+2 02 4000700')}</FooterLink>
							</Stack>
						</Stack>
					</GridItem>
					<GridItem item xs={12} sm={12} md={2}>
						<Stack
							direction="row"
							sx={{
								alignItems: 'flex-start'
							}}
							spacing={3}
						>
							<Stack direction="column">
								<FooterLink variant="body2">{t('Enaya Care')}</FooterLink>
								<FooterLink variant="body2"><MailIcon className="mail-icon" />{t('Care@haj.gov.sa')}</FooterLink>
								<FooterLink variant="body2"><CallIcon className="call-icon" />{t('+966 9 20002814')}</FooterLink>
							</Stack>
						</Stack>
					</GridItem>
					<GridItem item xs={12} sm={12} md={3}>
						<Stack
							direction={{ xs: 'column', sm: 'column-reverse', md: 'row' }}
							sx={{
								justifyContent: 'space-around',
								alignItems: 'center',
							}}
						>
							<Logo sx={{ height: 'unset' }} src="/static/images/Maqam-logo.png" />
						</Stack>
					</GridItem>
				</Grid>
			</Container>
			<Box textAlign="center" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
				<Typography sx={{ color: '#9e9e9e', fontSize: '12px', fontWeight: 400 }}>
					{t('Copyright') + ' \u00A9 '+ new Date().getFullYear() +'. '+ t('UHI') +' '+ t('All rights reserved.')}
					{'Version v1.0.0'}
				</Typography>
			</Box>
		</Paper>
	)
}

export default Footer;