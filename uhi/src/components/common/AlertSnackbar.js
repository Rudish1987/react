import * as React from 'react';
import { useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { useLocale } from '../../context/LocaleContext';
import { useTranslation } from 'react-i18next';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertSnackbarComponent({ open, onClose, typeOfMessage, title, messageText, icon }) {
	const theme = useTheme();
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [opened, setOpen] = React.useState(open);
	let textColorMessage;
	let backgroundColorMessage;
	if (typeOfMessage === 'error') {
		textColorMessage = theme.palette.error.dark;
		backgroundColorMessage = theme.palette.error.light;
	} else if (typeOfMessage === 'warning') {
		textColorMessage = theme.palette.warning.dark;
		backgroundColorMessage = theme.palette.warning.light;
	} else if (typeOfMessage === 'info') {
		textColorMessage = theme.palette.info.dark;
		backgroundColorMessage = theme.palette.info.light;
	}
	const snackbarStyle = {
		backgroundColor: backgroundColorMessage,
		color: textColorMessage,
		marginBottom: '16px',
		padding: '6px 16px',
		alignItems: 'flex-start',
		alignSelf: 'stretch',
		borderRadius: '4px',
	};

	const handleClose = () => {
		setOpen(false);
		onClose();
	}

	useEffect(() => {
		setOpen(open);
	}, [open])

	return (
		<>
			<Collapse in={opened}>
				<Alert severity={typeOfMessage} sx={{
					boxShadow: 'none',
					...(locale.value === 'ar' && {
						'& .muiltr-ki1hdl-MuiAlert-action': {
							marginRight: 'auto',
							marginLeft: '-28px'
						}
					})
				}} open={opened} style={snackbarStyle} icon={icon} action={<Button variant='text' color={typeOfMessage} className='crossbutton' onClick={handleClose}>{t('Close')}<CloseIcon /></Button>} >
					<AlertTitle><Typography variant='body1' fontWeight='fontWeightBold'>{title}</Typography></AlertTitle>
					<Typography variant='body1' fontWeight='fontWeightMedium'>{messageText}</Typography>
				</Alert>
			</Collapse>
		</>
	);

}