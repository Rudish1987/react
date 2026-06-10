import React, { useRef, useState } from 'react';
import { useStoreState, } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

// material
import { Box, MenuItem, ListItemIcon, ListItemText, Button, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// components
import MenuPopover from '../../components/MenuPopover';
import { useLocale } from '../../context/LocaleContext';
import { useTranslation } from 'react-i18next';
import AlertDialog from '../../components/common/AlertDialog';
// ----------------------------------------------------------------------

export default function LanguagePopover() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const anchorRef = useRef(null);
	const { locale, changeLocale, availableLocales } = useLocale();

	const [open, setOpen] = useState(false);
	const [clickLang, changeLangPopover] = useState(false);
	const [dialogopen, setDialogOpen] = React.useState(false);
	const [selectedLocal, setLocal] = useState(null);
	const results = useStoreState(s => s.btoc.results);
	const parentItineraryID = useStoreState(actions => actions.btoc.itineraryDetails.itineraryid);

	const dialogTitle = t('Redirect to Home?')
	const dialogContent = t('Changing Language will redirect to the home page')
	const agreeBtnText = t('Agree')
	const disAgreeBtnText = t('Disagree')

	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)

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
			<Button
				variant="text"
				startIcon={<Box component="img" alt={locale.label} src={locale.icon} sx={{ height: '16px', display: {xs: 'none', md: 'flex'} }} />}
				endIcon={<Box sx={{ position: 'absolute', right: 0, top: {xs: 3, sm: 7} }}>{clickLang ? <ArrowDropUpIcon sx={{color: layoutDetails.details.colors.HeaderTextColor}} /> : <ArrowDropDownIcon sx={{color: layoutDetails.details.colors.HeaderTextColor}} />}</Box>}
				ref={anchorRef}
				onClick={handleOpen}
				sx={{
					py: 1,
					mr: 1,
					color: layoutDetails.details.colors.HeaderTextColor,
					'&:hover': {
						color: layoutDetails.details.colors.HeaderTextColor,
						backgroundColor: 'rgb(0 0 0 / 10%)',
					}
				}}
			>
				<Typography variant="caption" sx={{ display: { xs: 'none', md: 'block' }, paddingLeft: 1, paddingRight: 1 }}>
					{t(locale.label)}
				</Typography>
				<Typography variant="caption" sx={{ display: { xs: 'block', md: 'none' }, paddingLeft: 1, paddingRight: 1 }}>
					{t(locale.labelShort)}
				</Typography>
			</Button>

			<MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} className="language-popover">
				<Box sx={{ py: 1, borderRadius: 1 }}>
					{availableLocales.map((option) => (
						option.value !== locale.value &&
						<MenuItem
							key={option.value}
							selected={option.value === locale.value}
							onClick={handleSelectLanguage(option.value)}
							value={option.value}
							sx={{ py: 1, px: 2.5}}
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
