import React from 'react'

// material
import { Typography, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { MuiChip } from '../Chip';
import { useLocale } from '../../context/LocaleContext';
import Constants from '../../helpers/constants';

export const TransportTypeFilter = ({ listData, selectedTransferType, setSelectedTransferType }) => {

	const { t } = useTranslation();
	const { locale } = useLocale();
	const [resetTransferType, setTransferType] = React.useState(0);
	const handleChipSelect = (text, selected) => {
		if (selected) {
			if (text == 0) {
				setSelectedTransferType([0])
			}
			if (text != 0) {
				setSelectedTransferType(current =>
					current.filter(transferType => {
						return transferType !== 0;
					}),
				);
				setSelectedTransferType(prev => [...prev, text]);
			}
		} else {
			setSelectedTransferType(current =>
				current.filter(transferType => {
					return transferType !== text;
				}),
			);
		}
		setTransferType(resetTransferType + 1)
	}

	return (
		<>
			<Stack container direction="column" sx={{ display: 'flex', m: 2, pb: 1, borderBottom: '2px solid #E0E0E0' }}>
				<Stack spacing={1}>
					<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text' }}>{t('Transport Type')}</Typography>
				</Stack>
				<Stack direction="row" spacing={1} sx={{ pt: 1, pb: 1, display:'inline-block' }}>
					<MuiChip labelId={0} label={t('All transports')} isChecked={ (selectedTransferType.includes(0)) ? true : false} onChipClick={handleChipSelect} />
					{listData.map((transferType, i) => (
						<MuiChip key={i} labelId={transferType.code} label={locale.value == Constants.LANGUAGES_AR ? transferType.nameAR : transferType.name} isChecked={ (selectedTransferType.includes(transferType.code)) ? true : false} onChipClick={handleChipSelect} />
					))}
				</Stack>
			</Stack>
		</>
	)

}