import React, { useRef, useState } from 'react';
// material
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
// components
import MenuPopover from '../../components/MenuPopover';
import { useLocale } from '../../context/LocaleContext';
// ----------------------------------------------------------------------

export default function LanguagePopover() {
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);

	const { locale, changeLocale, availableLocales } = useLocale();


	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSelectLanguage = (selected) => () => {
		changeLocale(selected)
		setOpen(false)
	}

	return (
		<>
			<IconButton
				ref={anchorRef}
				onClick={handleOpen}
				sx={{
					padding: 0,
					width: 40,
					height: 40
				}}
			>
				<TranslateOutlinedIcon color="common.white" />
			</IconButton>

			<MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
				<Box sx={{ py: 1 }}>
					{availableLocales.map((option) => (
						<MenuItem
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
								{option.label}
							</ListItemText>
						</MenuItem>
					))}
				</Box>
			</MenuPopover>
		</>
	);
}
