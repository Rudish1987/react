import React, { useRef, useState } from 'react';
// material
import {Button, Link, Tooltip} from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useTranslation } from 'react-i18next';
import '../../css/styles.css'
import Constants from '../../helpers/constants';

export default function AccountPopover() {
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const logout = async () => {
		window.location.href = Constants.BFF_LOGOUT_URL;
	}

	return (
		<>
			<Tooltip title={t('My Account')} arrow>
				<Link component="button" variant="text" aria-label={t('My Account')} ref={anchorRef} onClick={handleOpen}>
					<AccountCircleOutlinedIcon sx={{...{color: 'grey.900', '&:hover': {color: 'primary.main'}} }} />
				</Link>
			</Tooltip>
			<MenuPopover
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
				className='menu-popove-style'
			>

				{/*{AuthMenuLinks.map((option) => (
					<MenuItem
						key={option.label}
						to={option.linkTo}
						component={RouterLink}
						onClick={handleClose}
						className="myaccountlist"
					>
						{t(option.label)}
					</MenuItem>

				))}*/}
				<Button fullWidth color="inherit" variant="text" onClick={logout} className="logout-link">
					{t('LOG OUT')}
				</Button>

			</MenuPopover>
		</>
	);
}
