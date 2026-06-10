import * as React from 'react';
import { Typography, Stack } from '@mui/material';
import webbedslogo from '../../../Assets/webbedslogo.svg'
import hwadilogo from '../../../Assets/hwadilogo.svg'
import saudilogo from '../../../Assets/saudilogo.svg'
import accordlogo from '../../../Assets/accordlogo.svg'
import Maqamlogo from '../../../Assets/Maqamlogo.png';
import { useTranslation } from 'react-i18next';

const LogoSection = () => {
	const { t } = useTranslation();
	return (
		<>
			<Stack className="padding-left-0">
				<Typography variant="body1" className="grey600" textAlign={'center'}>
					{t('WebBeds and our local partnerships unlock boundless travel experiences')}
				</Typography>
			</Stack>

			<Stack direction="row" flexWrap="wrap" className="logoSection">
				<Stack className="padding-left-0 paddingTop20"><img src={webbedslogo} alt="logo" /></Stack>
				<Stack className="padding-left-0 paddingTop20"><img src={hwadilogo} alt="logo" /></Stack>
				<Stack className="padding-left-0 paddingTop20"><img src={Maqamlogo} alt="logo" /></Stack>
				<Stack className="padding-left-0 paddingTop20"><img src={accordlogo} alt="logo" /></Stack>
				<Stack className="padding-left-0 paddingTop20"><img src={saudilogo} alt="logo" /></Stack>
			</Stack>
		</>
	)
}

export default LogoSection;
