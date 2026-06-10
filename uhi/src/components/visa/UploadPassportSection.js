import { Box, Grid, Typography } from '@mui/material';
import Imageplaceholder from '../../Assets/imageplaceholder.png';
// import Uploadicon from '../../../Assets/uploadicon.png';
import Passporrtplaceholder from '../../Assets/passporrtplaceholder.png';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStoreState } from 'easy-peasy';

const UploadPassportSection = () => {
	const { t } = useTranslation();
	const passportData = useStoreState(s => s.btob.visa.passportData);

	return (
		<Grid item xs={12} sm={4}>
			<Typography variant='body2' color='grey.900'>
				{t('Passport Face Image')}
			</Typography>
			<Box className='passportimgbox'>
				{passportData.safaFaceImage ?
					<img src={passportData.safaFaceImage} className='passportfaceimgbox' alt="" /> :
					<img src={Imageplaceholder} className='iconplacement' alt="" width='48px' height='48px' />
				}
			</Box>
			{/*<Button*/}
			{/*	variant="outlinedSecondary"*/}
			{/*	fullWidth*/}
			{/*	size='large'*/}
			{/*	type='submit'*/}
			{/*	disabled={passportData.safaFaceImage ? true : false}*/}
			{/*>*/}
			{/*	<img src={Uploadicon} alt="" width='16px' height='20px' className='icon-spc' />*/}
			{/*	{t('Upload')}*/}
			{/*</Button>*/}
			<Typography variant='body2' color='grey.900' marginTop='20px'>
				{t('Passport Image')}
			</Typography>
			<Box className='passportimgbox'>
				{passportData.safaPassportImage ?
					<img src={passportData.safaPassportImage} className='' alt="" width={'100%'} height={'100%'} />
					:
					<img src={Passporrtplaceholder} className='iconplacement' alt="" width='48px' height='48px' />
				}
			</Box>
			{/*<Button*/}
			{/*	variant="outlinedSecondary"*/}
			{/*	fullWidth*/}
			{/*	size='large'*/}
			{/*	type='submit'*/}
			{/*	disabled={passportData.safaPassportImage ? true : false}*/}
			{/*>*/}
			{/*	<img src={Uploadicon} alt="" width='16px' height='20px' className='icon-spc' />*/}
			{/*	{t('Upload')}*/}
			{/*</Button>*/}
		</Grid>
	)
}

export default UploadPassportSection;