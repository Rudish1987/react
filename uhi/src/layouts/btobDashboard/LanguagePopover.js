import React, { useRef, useState } from 'react';
import { useStoreState, } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

// material
import { Box, MenuItem, ListItemIcon, ListItemText, Button, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
//import MenuIcon from '@mui/icons-material/Menu';

// components
import MenuPopover from '../../components/MenuPopover';
import { useLocale } from '../../context/LocaleContext';
import { useTranslation } from 'react-i18next';
import AlertDialog from '../../components/common/AlertDialog';
// ----------------------------------------------------------------------


export default function LanguagePopover() {
	const { t } = useTranslation();
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [clickLang, changeLangPopover] = useState(false);

	const [dialogopen, setDialogOpen] = React.useState(false);
	const [selectedLocal, setLocal] = useState(null);

	const { locale, changeLocale, availableLocales } = useLocale();

	const results = useStoreState(s => s.btoc.results);
	const parentItineraryID = useStoreState(actions => actions.btoc.itineraryDetails.itineraryid);

	const navigate = useNavigate();

	const dialogTitle = t('Redirect to Home?')
	const dialogContent = t('Changing Language will redirect to the home page')
	const agreeBtnText = t('Agree')
	const disAgreeBtnText = t('Disagree')


	//language popover handlers
	const handleOpen = () => {
		changeLangPopover(!clickLang);
		setOpen(true)
	};

	const handleClose = () => {
		changeLangPopover(!clickLang)
		setOpen(false)
	};

	const handleSelectLanguage = (selected) => () => {
		//if search happens, open dialog
		if (Object.keys(results).length > 0 || parentItineraryID) {
			handleDialogOpen()
		} else {
			setOpen(false)
			changeLocale(selected)
		}

		setLocal(selected)
	}

	//dialogue handlers
	const handleDialogOpen = () => {
		setDialogOpen(true)
	}

	const handleDialogChangeLang = () => {
		setOpen(false)
		changeLocale(selectedLocal)
		navigate('/')
	}

	const handleDisagree = () => {
		setOpen(false)
		setDialogOpen(false)
	}

	return (
		<>
			{locale.value === 'en' &&
				<Button
					variant="text"
					startIcon={<Box component="img" alt={locale.label} src={locale.icon} sx={{ height: '16px', display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }} />}
					endIcon={<Box sx={{ position: 'absolute', right: 0, top: { xs: 3, sm: 12, lg: 7 } }}>
						{clickLang ? <ArrowDropUpIcon sx={{ color: { xs: '#212121', lg: '#ffffff', sm: '#ffffff' } }} /> : <ArrowDropDownIcon sx={{ color: { xs: '#212121', lg: '#ffffff', sm: '#ffffff' } }} />}</Box>}
					ref={anchorRef}
					onClick={handleOpen}
					sx={{
						py: 1,
						mr: 1,
						'&:hover': {
							backgroundColor: 'transparent'
						}

					}}
					className='lanpopbutton'>

					<Typography variant="caption" sx={{ display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' }, letterSpacing: '0.0075em', color: '#ffffff', flex: 'none', order: 1, flexGrow: 0, textTransform: 'uppercase', paddingRight: 1.5 }}>
						{t(locale.label)}
					</Typography>
					<Typography variant="caption" sx={{ display: { xs: 'none', lg: 'none', md: 'none', sm: 'block' }, letterSpacing: '0.0075em', color: '#ffffff', flex: 'none', order: 1, flexGrow: 0, textTransform: 'uppercase', paddingLeft: 1, paddingRight: 2 }}>
						{t('ENG')}
					</Typography>
					<Typography variant="caption" sx={{ display: { xs: 'block', lg: 'none', md: 'none', sm: 'none' }, letterSpacing: '0.0075em', color: '#212121', flex: 'none', order: 1, flexGrow: 0, textTransform: 'uppercase', paddingLeft: 1, paddingRight: 2 }}>
						{t('ENG')}
					</Typography>
				</Button>}
			{locale.value === 'ar' &&
				<Button
					variant="text"
					startIcon={<Box component="img" alt={locale.label} src={locale.icon} sx={{ height: '16px', display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' } }} />}
					endIcon={<Box sx={{ position: 'absolute', right:  { xs: 3, sm: 12, lg: 0,md: 0 }, top: { xs: 3, sm: 12, lg: 7 } }}>
						{clickLang ? <ArrowDropUpIcon sx={{ color: { xs: '#212121', lg: '#ffffff', sm: '#ffffff' } }} /> : <ArrowDropDownIcon sx={{ color: { xs: '#212121', lg: '#ffffff', sm: '#ffffff' } }} />}</Box>}
					ref={anchorRef}
					onClick={handleOpen}
					sx={{
						py: 1,
						mr: 1,
						'&:hover': {
							backgroundColor: 'transparent'
						}

					}}
					className='lanpopbuttonarb'>

					<Typography variant="caption" sx={{ display: { xs: 'none', lg: 'block', md: 'block', sm: 'none' }, letterSpacing: '0.0075em', color: '#ffffff', flex: 'none', order: 1, flexGrow: 0, textTransform: 'uppercase', paddingRight: 1.5 }}>
						{t(locale.label)}
					</Typography>
					<Typography variant="caption" sx={{ display: { xs: 'none', lg: 'none', md: 'none', sm: 'block' }, letterSpacing: '0.0075em', color: '#ffffff', flex: 'none', order: 1, flexGrow: 0, textTransform: 'uppercase', paddingLeft: 1, paddingRight: 2 }}>
						{t('AR')}
					</Typography>
					<Typography variant="caption" sx={{ display: { xs: 'block', lg: 'none', md: 'none', sm: 'none' }, letterSpacing: '0.0075em', color: '#212121', flex: 'none', order: 1, flexGrow: 0, textTransform: 'uppercase', paddingLeft: 1, paddingRight: 2 }}>
						{t('AR')}
					</Typography>
				</Button>}

			<MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} className="language-popover">
				<Box sx={{ py: 1 }}>
					{availableLocales.map((option) => (
						option.value !== locale.value && <MenuItem
							key={option.value}
							selected={option.value === locale.value}
							onClick={handleSelectLanguage(option.value)}
							value={option.value}
							sx={{ py: 1, px: 2.5 }}
						>
							<ListItemIcon>
								<Box component="img" alt={option.label} src={option.icon} sx={{ height: '16px' }} />
							</ListItemIcon>
							<ListItemText primaryTypographyProps={{ variant: 'body2' }}>
								{t(option.label)}
							</ListItemText>
						</MenuItem>
					))}
				</Box>
			</MenuPopover>
			<AlertDialog dialogopen={dialogopen} handleAgree={handleDialogChangeLang} handleDisagree={handleDisagree} dialogTitle={dialogTitle} dialogContent={dialogContent} agreeBtnText={agreeBtnText} disAgreeBtnText={disAgreeBtnText}></AlertDialog>

		</>
	);
}
