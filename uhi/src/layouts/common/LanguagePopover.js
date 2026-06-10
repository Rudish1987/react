import React, { useRef, useState } from 'react';
import { useStoreState, } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

// material
import {Box, MenuItem, ListItemIcon, ListItemText, Typography, Link, Stack} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// components
import MenuPopover from '../../components/MenuPopover';
import { useLocale } from '../../context/LocaleContext';
//import { MHidden } from '../../components/@material-extend';
import { useTranslation } from 'react-i18next';
import AlertDialog from '../../components/common/AlertDialog';

//CSS include
import '../../css/LanguagePopover.css';
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
			<Link
				underline="none"
				component="button"
				ref={anchorRef}
				onClick={handleOpen}
			>
				<Stack direction="row" alignItems="center" spacing={1} sx={{...{color: 'grey.900', '&:hover': {color: 'primary.main'}} }}>
					<Box component="img" alt={locale.label} src={locale.icon} sx={{ height: '14px', display: { xs: 'none', lg: 'block' } }} />
					<Typography variant="button" sx={{ ...(locale.value === 'ar' && {marginLeft:'0px !important', marginRight: '8px !important'}) }}>{locale.value === 'en' ? t('ENG') : t('AR')}</Typography>
					{clickLang ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
				</Stack>
			</Link>
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
