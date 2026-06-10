import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import 'react-multi-carousel/lib/styles.css';
import { Grid, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Image from '../../../Assets/ShineImageLg.png';
import ShineImage from '../../../Assets/ShineImageMd.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLocale } from '../../../context/LocaleContext';

const ResolvesSection = () => {
	const { locale } = useLocale();
	const { t } = useTranslation();
	const theme = useTheme();
	const textConcatVal = 50;
	const [btnText, setBtnText] = useState('More details');
	const [btnFlag, setBtnFlag] = useState(1);
	const [supplier, setSupplier] = useState(1);
	const [simplify, setSimplify] = useState(1);
	const [invExc, setInvExc] = useState(1);
	const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

	const investExcessiveText = t('Save time with streamlined technology integration at UHI. We prioritize your efficiency, partnering with leading travel trade IT houses for seamless integration into your systems. Our advanced tools and reporting enable quick integration without workflow disruptions.');
	const [invExcess, setInvExcess] = useState(investExcessiveText);
	const simpliFyText = t('Simplify your financial transactions with UHI\'s integrated payment solutions. Say goodbye to payment processing headaches as we offer secure gateways, efficient invoicing, and seamless reconciliation services. Let us handle the complexities while you focus on serving your clients.');
	const [siplifyText, setSiplifyText] = useState(simpliFyText);
	const supplierManagment = t('Don\'t let supplier management complexities hinder your efficiency. UHI understands the challenges of handling multiple suppliers. That\'s why we simplify the process by curating a network of trusted travel suppliers, including hotels, transportation providers, and consolidators.');
	const [supplierManagerText, setSupplierManagerText] = useState(supplierManagment);

	useEffect(() => {
		const setTextBasedOnWidth = () => {
			if (window.innerWidth > 375 && window.innerWidth < 500) {
				setInvExcess(investExcessiveText.substring(0, textConcatVal) + ' .... ' + investExcessiveText.substring(investExcessiveText.length - 50 - 1));
				setSiplifyText(simpliFyText.substring(0, textConcatVal) + ' .... ' + simpliFyText.substring(simpliFyText.length - 50 - 1));
				setSupplierManagerText(supplierManagment.substring(0, textConcatVal) + ' .... ' + supplierManagment.substring(supplierManagment.length - 50 - 1));
			} else if (window.innerWidth <= 375) {
				setInvExcess(investExcessiveText.substring(textConcatVal, -1) + '...');
				setSiplifyText(simpliFyText.substring(textConcatVal, -1) + '...');
				setSupplierManagerText(supplierManagment.substring(textConcatVal, -1) + '...');
			} else {
				setInvExcess(investExcessiveText);
				setSiplifyText(simpliFyText);
				setSupplierManagerText(supplierManagment);
			}
		};
		setTextBasedOnWidth();
		const handleResize = () => {
			setTextBasedOnWidth();
		}
		window.addEventListener('resize', handleResize);
	}, [investExcessiveText, simpliFyText, supplierManagment, textConcatVal]);

	const updateIcon = () => {
		if (btnFlag == 0) {
			setBtnText('More details');
			setBtnFlag(1);
			if (window.innerWidth > 375 && window.innerWidth < 601) {
				setInvExcess(investExcessiveText.substring(0, textConcatVal) + ' .... ' + investExcessiveText.substring(investExcessiveText.length - 50 - 1));
				setSiplifyText(simpliFyText.substring(0, textConcatVal) + ' .... ' + simpliFyText.substring(simpliFyText.length - 50 - 1));
				setSupplierManagerText(supplierManagment.substring(0, textConcatVal) + ' .... ' + supplierManagment.substring(supplierManagment.length - 50 - 1));
			}
			if (window.innerWidth <= 375) {
				setInvExcess(investExcessiveText.substring(textConcatVal, -1) + '...');
				setSiplifyText(simpliFyText.substring(textConcatVal, -1) + '...');
				setSupplierManagerText(supplierManagment.substring(textConcatVal, -1) + '...');
			}
		} else {
			setBtnText('Less Details');
			setBtnFlag(0);
			setInvExcess(investExcessiveText);
			setSiplifyText(simpliFyText);
			setSupplierManagerText(supplierManagment);
		}
	}

	const handleClick_supplier = () => {
		if (isExtraSmall) {
			if (supplier == 0) {
				setSupplier(1);
				setSupplierManagerText(supplierManagment.substring(0, textConcatVal) + ' .... ' + supplierManagment.substring(supplierManagment.length - 50 - 1));
			} else {
				setSupplier(0);
				setSupplierManagerText(supplierManagment);
				setInvExcess(investExcessiveText.substring(0, textConcatVal) + ' .... ' + investExcessiveText.substring(investExcessiveText.length - 50 - 1));
				setSiplifyText(simpliFyText.substring(0, textConcatVal) + ' .... ' + simpliFyText.substring(simpliFyText.length - 50 - 1));
			}
		}
	};

	const handleClick_simplify = () => {
		if (isExtraSmall) {
			if (simplify == 0) {
				setSimplify(1);
				setSiplifyText(simpliFyText.substring(0, textConcatVal) + ' .... ' + simpliFyText.substring(simpliFyText.length - 50 - 1));
			} else {
				setSimplify(0);
				setSiplifyText(simpliFyText);
				setInvExcess(investExcessiveText.substring(0, textConcatVal) + ' .... ' + investExcessiveText.substring(investExcessiveText.length - 50 - 1));
				setSupplierManagerText(supplierManagment.substring(0, textConcatVal) + ' .... ' + supplierManagment.substring(supplierManagment.length - 50 - 1));
			}
		}
	};

	const handleClick_invEx = () => {
		if (isExtraSmall) {
			if (invExc == 0) {
				setInvExc(1);
				setInvExcess(investExcessiveText.substring(0, textConcatVal) + ' .... ' + investExcessiveText.substring(investExcessiveText.length - 50 - 1));
			} else {
				setInvExc(0);
				setInvExcess(investExcessiveText);
				setSiplifyText(simpliFyText.substring(0, textConcatVal) + ' .... ' + simpliFyText.substring(simpliFyText.length - 50 - 1));
				setSupplierManagerText(supplierManagment.substring(0, textConcatVal) + ' .... ' + supplierManagment.substring(supplierManagment.length - 50 - 1));
			}
		}
	};

	return (
		<Grid container spacing={2} sx={{ position: 'relative' }}>
			<Grid item xs={12} sm={12} md={8} lg={5} className='paddingTop32 resolveHeader'>
				<Typography variant='h3' fontWeight='bold' color='grey.900' className='resolveText'>
					{t('Stand out with our support UHI solves,')} <span className='youSign'>{t('you shine')}</span>
				</Typography>
				<Typography variant='body1' fontWeight='600' color='grey.900' className='resolveContent'>
					{t('Managing multiple suppliers and their bookings is complex and slows me down')}
				</Typography>
				<Typography variant='body1' onClick={handleClick_supplier} color='grey.800' textAlign='justify'>{supplierManagerText}</Typography>
			</Grid>
			<Grid item xs={0} md={4} lg={6}>
				<Grid sx={{ display: { xs: 'none', lg: 'block' } }}>
					<img src={Image} alt="" className='resolveLgImage' />
				</Grid>
				<Grid sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}>
					<img src={ShineImage} alt="" className='resolveMdImage' />
				</Grid>
			</Grid>
			<Grid item xs={12} sm={12} md={8} lg={5} className='resolveHeader'>
				<Typography variant='body1' fontWeight='600' color='grey.900' className='resolveContent' >
					{t('I struggle with payment processing and reconciling transactions')}
				</Typography>
				<Typography variant='body1' onClick={handleClick_simplify} color='grey.800' textAlign='justify'>{siplifyText}</Typography>
			</Grid>
			<Grid item xs={12} sm={12} md={8} lg={5} className='resolveHeader reolvepos' sx={{ ...(locale.value === 'ar' && { position: 'relative', right: { lg: '100px!important' } }) }}>
				<Typography variant='body1' fontWeight='600' color='grey.900' className='resolveContent'>
					{t('I invest excessive effort in integrating new technology into my existing systems')}
				</Typography>
				<Typography variant='body1' onClick={handleClick_invEx} color='grey.800' textAlign='justify'>{invExcess}</Typography>
			</Grid>

			<Grid item xs={12} display={isExtraSmall ? 'block' : 'none'}>
				<Grid display={'flex'} paddingX={2} alignItems={'center'} flexDirection={'column'}>
					<Button variant="outlined" size='medium' color="primary" onClick={updateIcon} startIcon={(btnFlag == 1) ? <AddIcon /> : <RemoveIcon />}>{t(btnText)}</Button>
				</Grid>
			</Grid>
		</Grid>

	)
}

export default ResolvesSection;