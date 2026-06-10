import React from 'react'

// material
import { Typography, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { MuiChip } from '../Chip';

export const GroundServiceFilter = ({ filterCount, setFilterCount }) => {

	const { t } = useTranslation();
	return (
		<>
			<Stack direction="column" sx={{ display: 'flex', m: 2, borderBottom: '2px solid #E0E0E0', pb: 2 }}>
				<Stack direction="column" spacing={1}>
					<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text' }}>{t('Category')}</Typography>
				</Stack>
				<Stack direction="row" spacing={1} sx={{ pt: 1, pb: 1 }}>
					<MuiChip label={t('All categories')} filterCount={filterCount} setFilterCount={setFilterCount} isChecked={true} />
					<MuiChip label={t('Basic')} filterCount={filterCount} setFilterCount={setFilterCount} isChecked={false} />
					<MuiChip label={t('Premium')} filterCount={filterCount} setFilterCount={setFilterCount} isChecked={false} />
					<MuiChip label={t('VIP')} filterCount={filterCount} setFilterCount={setFilterCount} isChecked={false} />

				</Stack>
			</Stack>
		</>
	)

}