import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function HandleClick(event) {
	const navigate = useNavigate();
	event.preventDefault();
	navigate('/');
}

export default function CustomSeparator({ breadcrumbsTitle }) {
	const { t } = useTranslation();
	const breadcrumbs = [
		<Link data-testid="homeLink"
			sx={{ fontSize: '16px', fontWeight: '600', color: '#757575' }}
			underline="hover"
			key="1"
			color="inherit"
			href="/"
			onClick={HandleClick}
		>
			{t('Home')}
		</Link>,
		<Typography data-testid="breadcrumbText" key="3" color="text.primary" sx={{ fontSize: '16px', fontWeight: '600', color: '#282E36' }}>
			{breadcrumbsTitle}
		</Typography>,
	];

	return (
		<Stack spacing={2}>
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize="small" />}
				aria-label="breadcrumb"
			>
				{breadcrumbs}
			</Breadcrumbs>
		</Stack>
	);
}
