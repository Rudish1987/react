import * as React from 'react';
import { useEffect, useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarComponent({ open, onClose, message, typeOfMessage }) {

	const theme = useTheme();
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
	} else if (typeOfMessage === 'success') {
		textColorMessage = theme.palette.success.dark;
		backgroundColorMessage = theme.palette.success.light;
	}


	const snackbarStyle = {
		backgroundColor: backgroundColorMessage,
		color: textColorMessage,
		marginTop: '16px',
		marginBottom: '16px',
		padding: '6px 16px',
		alignItems: 'flex-start',
		alignSelf: 'stretch',
		borderRadius: '4px',
	};

	const [visible, setVisible] = useState(open);
	const handleClose = () => {
		setVisible(false);
		onClose();
	}
	useEffect(() => {
		setVisible(open);
	}, [open])
    
	useEffect(() => {
		let timeoutId;
		if (visible) {
			timeoutId = setTimeout(() => {
				handleClose();
			}, 8000);
		}
		return () => clearTimeout(timeoutId);
	}, [visible]);


	return (
		<>
			{typeOfMessage === 'error' && (<Alert severity="error" open={visible} onClose={handleClose} style={snackbarStyle} icon={<WarningAmberOutlinedIcon />} action={false}><Typography variant='body1' fontWeight='fontWeightMedium'>{message}</Typography></Alert>)}
			{typeOfMessage === 'warning' && (<Alert severity="warning" open={visible} onClose={handleClose} style={snackbarStyle} icon={<WarningAmberOutlinedIcon />} action={false}><Typography variant='body1' fontWeight='fontWeightMedium'>{message}</Typography></Alert>)}
			{typeOfMessage === 'info' && (<Alert severity="info" open={visible} onClose={handleClose} style={snackbarStyle} icon={<WarningAmberOutlinedIcon />} action={false}><Typography variant='body1' fontWeight='fontWeightMedium'>{message}</Typography></Alert>)}
			{typeOfMessage === 'success' && (<Alert severity="success" open={visible} onClose={handleClose} style={snackbarStyle} icon={<CheckIcon />} action={false}><Typography variant='body1' fontWeight='fontWeightMedium'>{message}</Typography></Alert>)}
		</>
	);

}