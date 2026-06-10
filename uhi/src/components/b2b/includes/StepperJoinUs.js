import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useLocale } from '../../../context/LocaleContext';

const steps = [
	'Company Info',
	'Contact Person',
	'Login Details',
];

export default function StepperJoinUs({ activeStep }) {
	const { locale } = useLocale();
	const { t } = useTranslation();
	const theme = useTheme();
	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={activeStep} alternativeLabel orientation='horizontal'
				sx={{
					...(locale.value === 'ar' && {
						'& .MuiStepConnector-alternativeLabel': {
							left: 'calc(50% + 20px)',
							right: 'calc(-50% + 20px)'
						}
					}),
					'& .muiltr-vzd6ou-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
						color: theme.palette.grey[900]
					},
					'& .muiltr-vzd6ou-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed': {
						color: theme.palette.grey[900]
					},
				}}
			>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{t(label)}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}