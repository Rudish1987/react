import React from 'react'

// material
import { Typography, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { MuiChip } from '../Chip';
import { useLocale } from '../../context/LocaleContext';
import Constants from '../../helpers/constants'

export const CategoryFilter = ({ listData, selectedCategory, setSelectedCategory }) => {

	const { t } = useTranslation();
	const { locale } = useLocale();
	const [resetCategory, setCategory] = React.useState(0);
	const handleChipSelect = (text, selected) => {
		if (selected) {
			if (text == 0) {
				setSelectedCategory([0])
			}
			if (text != 0) {
				setSelectedCategory(current =>
					current.filter(category => {
						return category !== 0;
					}),
				);
				setSelectedCategory(prev => [...prev, text]);
			}
		} else {
			setSelectedCategory(current =>
				current.filter(category => {
					return category !== text;
				}),
			);
		}
		setCategory(resetCategory + 1)
	}
	return (
		<>
			<Stack direction="column" sx={{ display: 'flex', m: 2, borderBottom: '2px solid #E0E0E0', pb: 2 }}>
				<Stack direction="column" spacing={1}>
					<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text' }}>{t('Category')}</Typography>
				</Stack>
				<Stack direction="row" spacing={1} sx={{ pt: 1, pb: 1, display:'inline-block' }}>
					<MuiChip labelId={0} label={t('All categories')} isChecked={ (selectedCategory.includes(0)) ? true : false} onChipClick={handleChipSelect} />
					{listData.map((category, i) => (
						<MuiChip key={resetCategory, i} labelId={category.code} label={locale.value == Constants.LANGUAGES_AR ? category.nameAR : category.name} setSelectedFilter={setSelectedCategory} isChecked={ (selectedCategory.includes(category.code)) ? true : false} onChipClick={handleChipSelect} />
					))}
				</Stack>
			</Stack>
		</>
	)

}