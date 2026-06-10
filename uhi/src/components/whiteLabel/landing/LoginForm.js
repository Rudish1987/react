import React, { useState } from 'react';
import { Grid, Typography, Button, Modal, Box, Container } from '@mui/material';
import { MHidden } from '../../../components/@material-extend';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';
import { LoginApi } from '../../../api/auth/Login';
import SnackbarComponent from '../../common/Snackbar';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useDomain } from '../../../context/DomainContext';
import { useStore } from 'easy-peasy';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '95%',
	height: '50%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	borderRadius: '8px',
	padding: '10px'
};


const validationSchema = yup.object({
	email: yup
		.string('Enter your username')
		// .email('Please enter a valid username')
		.required('Username is required'),
	password: yup
		.string('Enter your password')
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
});


export default function LoginForm() {
	const store = useStore();
	const { t } = useTranslation();
	const theme = useTheme();
	const { domainName } = useDomain();
	const [open, setOpen] = React.useState(false);
	const [snackAlertOpen, setSnackAlertOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [loading, setLoading] = useState(false);
	const [typeOfMessage, settypeOfMessage] = React.useState('');
	const handleClose = () => setOpen(false);
	const openLoginpopUp = () => {
		setOpen(true);
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			domain: domainName,
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setLoading(isSubmitting);
			const setUser = store.getActions().btob.setUser;
			const setAuth = store.getActions().btob.setAuth;
			
			const getdata = await LoginApi(values);
			if (getdata.status) {
				setUser(getdata);
				setAuth(true);
				window.location.href = getdata.data.redirectUrl;
			} else {
				setSnackbarMessage(getdata.message);
				setSnackAlertOpen(true);
				setOpen(false);
				setLoading(false);
				settypeOfMessage('error');
			}

		},
	});
	const { isSubmitting } = formik;

	const createAgentLoginBtn = () => {
		return (
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Button variant="contained" fullWidth='true' size='large' onClick={openLoginpopUp} endIcon={<ArrowForwardOutlinedIcon />}>{t('AGENT LOGIN')}</Button>
			</Grid>
		);
	}
	const createLoginForm = () => {
		return (
			<FormikProvider value={formik}>
				{snackAlertOpen && <SnackbarComponent open={snackAlertOpen} onClose={() => setSnackAlertOpen(false)} message={snackbarMessage} typeOfMessage={typeOfMessage} />}
				<Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
					<Grid container columnSpacing={{ sm: 2, md: 3 }}>
						<Grid item xs={12} md={4}>
							<TextField
								variant="outlined"
								label={t('Email')}
								fullWidth
								type='text'
								name='email'
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
								InputProps={{
									style: {
										borderRadius: '4px',
										backgroundColor: theme.palette.grey[0]
									}
								}}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								variant="outlined"
								label={t('Password')}
								fullWidth
								type='Password'
								name='password'
								id="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								error={formik.touched.password && Boolean(formik.errors.password)}
								helperText={formik.touched.password && formik.errors.password}
								InputProps={{
									style: {
										borderRadius: '4px',
										backgroundColor: theme.palette.grey[0]
									}
								}}
							/>
						</Grid>
						<Grid item className="b2bLoginlinks" xs={12} sm={12} md={4}>
							<LoadingButton variant="contained" size='large' fullWidth type='submit' endIcon={<ArrowForwardOutlinedIcon />} loading={loading} loadingIndicator={t('login...')}>{t('AGENT LOGIN')}</LoadingButton>
							<Grid container alignItems='right' justifyContent='right'>
								<Grid item xs={12} md={6} textAlign='center' m='auto'>
									<Typography variant='caption'>{t('FORGOT PASSWORD')}</Typography>
								</Grid>
								<Grid item xs={12} md={6}>
									<FormGroup>
										<FormControlLabel sx={{
											justifyContent: 'center',
											'& .MuiFormControlLabel-label': {
												fontSize: '12px',
												fontWeight: '600'
											}
										}} control={<Checkbox defaultChecked />} label={t('REMEMBER ME')} />
									</FormGroup>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Form>
			</FormikProvider>
		);
	}

	return (
		<>
			<Container className='body-container-margin'>
				<MHidden width="smUp">
					{createAgentLoginBtn()}
				</MHidden>
				<MHidden width="smDown">
					{createLoginForm()}
				</MHidden>
				<Modal
					open={open}
					onClose={handleClose}
					className='loginModal'           >
					<Box sx={style}>
						<Grid sx={{ float: 'right', padding: '0px' }}>
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</Grid>
						{createLoginForm()}
					</Box>
				</Modal>
			</Container >
		</>
	);
}