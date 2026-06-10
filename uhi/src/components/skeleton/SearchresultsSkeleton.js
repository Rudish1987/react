import React from 'react';
import { Box, Container } from '@mui/material';
import SummarySkeleton from './SummarySkeleton';
import ResultsSkeleton from './ResultsSkeleton';
import '../../css/SearchSkeleton.css';
import { StepperHeader } from '../CommonHeaders/StepperHeader';
import { useTranslation } from 'react-i18next';
// import Footer from '../../components/guests/Footer';


export default function SearchresultsSkeleton({stepperNo, rebook = false }) {
	const { t } = useTranslation();
	return (
		<Container>
			<Box className="resultsbg">
				<SummarySkeleton />
			</Box>
			<StepperHeader stepLevel={t(stepperNo)} isSkeleton={true} rebook ={rebook} />
			<ResultsSkeleton />

		</Container>
	);
}
