import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const TransitionRight = (props) => {
	return <Slide {...props} direction="down" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBarAlert = ({ message, show, type ,resetSnackAlert}) => {
	
	const handleClose = () => {
		resetSnackAlert((prev) => {
			return {...prev,show : false}
		});
	};

	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<Snackbar TransitionComponent={TransitionRight} open={show} autoHideDuration={10000} onClose={handleClose}  anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
				<Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</Stack>
	);
}
