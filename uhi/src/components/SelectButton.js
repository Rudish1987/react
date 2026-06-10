import React from 'react'
import {Button} from '@mui/material';
import { useTranslation } from 'react-i18next';

const SelectButton = ({disableSelect, handleFunction}) => {
	const { t } = useTranslation();
	return (
		<Button variant="contained" size="medium" className="result-select" disabled={disableSelect} onClick={handleFunction}>
			{t('Select')}
		</Button>
	)
}

export default SelectButton
