import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Residency = ({ value, onChange, stateValue: checkResidencySwitch, setStateValue: setResidencySwitch }) => {
	const [stateValue, setStateValue] = React.useState(checkResidencySwitch);
	const handleToggle = () => {
		value ? onChange(false) : onChange(true);
		setStateValue(!stateValue);
		setResidencySwitch(!stateValue);
	};
	const { t } = useTranslation();
	return (
		<FormGroup sx={{float: 'right'}}>
			<FormControlLabel
				control={
					<Switch
						color="success" size="small" checked={value} value={value}
						onChange={handleToggle}
					/>}
				label={<span style={{ fontSize: '0.8rem' }}>{t('Residency same as Nationality')}</span>}
			/>
		</FormGroup>
	);
}
export default Residency;
