import * as React from 'react';
import {Grid, Button, Container, Typography} from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../../context/LocaleContext';
import Constants from '../../../helpers/constants';

export default function LoginForm() {
	const { locale } = useLocale();
	const { t } = useTranslation();

	const createAgentLoginBtn = () => {
		return (
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing="8"
			>
				<Grid item xs={12} md={8}>
					<Typography variant='h2' color="primary.main" fontWeight='400'>
						{t('Empowering your travel assistance')}
					</Typography>
				</Grid>
				<Grid item xs={12} md={4}>
					<Button variant='contained' size='large' fullWidth color='primary' onClick={() => {window.location.href = Constants.BFF_LOGIN_URL;}} endIcon={<ArrowForwardOutlinedIcon sx={{ ...(locale.value === 'ar' && { marginRight: '5px' }) }} />}>
						{t('AGENT LOGIN')}
					</Button>
				</Grid>
			</Grid>
		);
	}

	return (
		<>
			<Container className='body-container-margin loginFormCenter' sx={{paddingTop:{xs:'24px'},paddingBottom:{xs:'16px'}}}>
				{createAgentLoginBtn()}
			</Container >
		</>
	);
}