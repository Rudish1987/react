//import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import Logo from '../../Logo';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Twitter from '../../../Assets/X.svg';
import Linkedin from '../../../Assets/Linkedin.svg';
import Blogicon from '../../../Assets/GA.svg';
import footerCurvelg from '../../../Assets/Footercurve.svg'
import footerCurvesm from '../../../Assets/FooterCurve-sm.svg'
import BrandingCurvexs from '../../../Assets/BrandingCurvexs.svg'
import { useLocale } from '../../../context/LocaleContext'
import Link from '@mui/material/Link';

const FooterLink = styled(Typography)(() => ({
	marginBottom: '5px',
}))

const GridItem = styled(Grid)(() => ({
	paddingTop: 5,
	marginBottom: 3,
	paddingBottom: 5,
}))

const GridItems = styled(Grid)(() => ({
	paddingTop: 5,
	marginBottom: 3,
	paddingBottom: 5,
	borderBottom: '1px solid #bdbdbd'
}))

const FooterLogo = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
	[theme.breakpoints.up('md')]: {
		position: 'absolute',
		bottom: '87px'
	}
	
	
}))

const footerSocialIcons = () => {
	return (<Grid container>
		<Grid sx={{ width: '20px', marginBottom:'10px', marginRight:'10px' }}>
			<img src={Linkedin} alt=''/>
		</Grid>
		<Grid sx={{ width: '20px', marginBottom:'10px', marginRight:'10px' }}>
			<img src={Twitter} alt=''/>
		</Grid>
		<Grid sx={{ width: '20px', marginBottom:'10px', marginRight:'10px' }}>
			<Link href='https://www.gatewaytosaudi.com'  target='_blank' underline='none'><img src={Blogicon} alt=''/></Link>
		</Grid>
	</Grid>);
}


const Footer = () => {
	const { t } = useTranslation();
	const { locale,logo } = useLocale();

	return (
		<Paper elevation={3} className="footer-container" sx={{
			p: 2,
			borderRadius: '0px',
			color: '#212B36!important',
			boxShadow: '0',

		}}>

			<Grid container
				sx={{ mt: 4 }} className="footerwrapper footerlg">
				<GridItem item xs={12} md={3} className="footerLogopos">
					<FooterLogo direction="row">
						<Logo src={logo} />
					</FooterLogo>
				</GridItem>
				<GridItem item xs={12} sm={4} md={3} lg={3}>
					<Stack
						direction="row"
						sx={{
							alignItems: 'flex-start'
						}}
						spacing={3}
					>
						<Stack direction="column" className="captionSemibold ">
							<FooterLink>{t('Privacy Policy')}</FooterLink>
							<FooterLink>{t('Terms and conditions')}</FooterLink>
							<FooterLink>{t('Corporate governance')}</FooterLink>
						</Stack>
					</Stack>
				</GridItem>
				<GridItem item xs={12} sm={4} md={3} lg={3}>
					<Stack
						direction="row"
						sx={{
							alignItems: 'flex-start'
						}}
						spacing={3}
					>
						<Stack direction="column" className="captionSemibold">
							<FooterLink>{t('UHI') + ' ' + t('Support')}</FooterLink>
							<FooterLink className="infoCaption"><MailIcon className="mail-icon" />customerservice@uhitravel.com</FooterLink>
							<FooterLink className="infoCaption"><CallIcon className="call-icon" />+2 02 4000700</FooterLink>
							<FooterLink className="infoCaption"><WhatsAppIcon className="call-icon" />+971 529315770</FooterLink>
						</Stack>
					</Stack>
				</GridItem>
				{/* <GridItem item xs={12} sm={4} md={2} sx={{display:{sm:'none',md:'none',lg:'none',xl:'none'}}}>
					<Stack
						direction="row"
						sx={{
							alignItems: 'flex-start'
						}}
						spacing={3}
					>
						<Stack direction="column" className="captionSemibold care_column">
							<FooterLink>{t('Enaya Care')}</FooterLink>
							<FooterLink className="infoCaption"><MailIcon className="mail-icon" />Care@haj.gov.sa</FooterLink>
							<FooterLink className="infoCaption"><CallIcon className="call-icon" />+966 9 20002814</FooterLink>
						</Stack>
					</Stack>
				</GridItem> */}
				<GridItem item xs={12} md={3} sm={4} lg={3}>
					<Stack
						direction={{ xs: 'column', sm: 'column-reverse', md: 'row' }}
						sx={{
							justifyContent: 'space-around',
							alignItems: 'center',
						}}
					>
						<Stack direction="column" className="captionSemibold care_column">
							<FooterLink>{t('UHI on Social Media')}</FooterLink>
							{footerSocialIcons()}
						</Stack>
					</Stack>
				</GridItem>
				<Grid xs={12} item textAlign="center" >
					<Typography className="footercopy">
						{t('Copyright © 2023. Umrah Holidays International. All rights reserved.')}
					</Typography>
				</Grid>
			</Grid>


			<Grid container
				sx={{ mt: 4, display: { xs: 'block', lg: 'none', md: 'none', sm: 'none' } }} className="footerwrapper footerxs">
				<GridItems item xs={12} sm={4} md={3}>
					<Stack
						direction="row"
						sx={{
							alignItems: 'flex-start'
						}}
						spacing={3}
					>
						<Stack direction="column" className="captionSemibold">
							<FooterLink>{t('UHI') + ' ' + t('Support')}</FooterLink>
							<FooterLink className="infoCaption"><MailIcon className="mail-icon" />customerservice@uhitravel.com</FooterLink>
							<FooterLink className="infoCaption"><CallIcon className="call-icon" />+2 02 4000700</FooterLink>
							<FooterLink className="infoCaption"><WhatsAppIcon className="call-icon" />+971 529315770</FooterLink>
						</Stack>
					</Stack>
				</GridItems>
				<GridItems item xs={12} sm={4} md={2}>
					<Stack
						direction="row"
						sx={{
							alignItems: 'flex-start',
							height:'80px'
						}}
						spacing={3}
					>
						<Stack direction="column" className="captionSemibold care_column">
							<FooterLink>{t('UHI on Social Media')}</FooterLink>
							{footerSocialIcons()}
						</Stack>
					</Stack>
				</GridItems>
				<GridItems item xs={12} sm={4} md={3}>
					<Stack
						direction="row"
						sx={{
							alignItems: 'flex-start'
						}}
						spacing={3}
					>
						<Stack direction="column" className="captionSemibold">
							<FooterLink>{t('Privacy Policy')}</FooterLink>
							<FooterLink>{t('Terms and conditions')}</FooterLink>
							<FooterLink>{t('Corporate governance')}</FooterLink>
						</Stack>
					</Stack>
				</GridItems>
				<Grid xs={12} item textAlign="center" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
					<Typography className="footercopy">
						{t('Copyright © 2023. Umrah Holidays International. All rights reserved.')}
					</Typography>
				</Grid>
			</Grid>
			{locale.value === 'en' &&
				<Stack>
					<Stack sx={{ display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }}>
						<img src={footerCurvelg} className="brandingCurvefooter" alt="" />
					</Stack>
					<Stack sx={{ display: { xs: 'none', sm: 'block', md: 'none', lg: 'none' } }}>
						<img src={footerCurvesm} className="brandingCurvefootersm" alt="" />
					</Stack>
					<Stack sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' } }}>
						<img src={BrandingCurvexs} className="brandingCurvefooterxs" alt="" />
					</Stack>
				</Stack>}
			{locale.value === 'ar' &&
				<Stack>
					<Stack sx={{ display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }}>
						<img src={footerCurvelg} className="brandingCurvefooterar" alt="" />
					</Stack>
					<Stack sx={{ display: { xs: 'none', sm: 'block', md: 'none', lg: 'none' } }}>
						<img src={footerCurvesm} className="brandingCurvefootersmar" alt="" />
					</Stack>
					<Stack sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' } }}>
						<img src={BrandingCurvexs} className="brandingCurvefooterxsar" alt="" />
					</Stack>
				</Stack>
			}
		</Paper>
	)
}

export default Footer;