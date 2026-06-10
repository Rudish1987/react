import  React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Button } from '@mui/material';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { styled } from '@mui/material/styles';
import Coin from '../../../Assets/Coin.svg';
import Hands from '../../../Assets/Hands.svg';
import fastLaunch from '../../../Assets/fastLaunch.svg';
import Agent from '../../../Assets/Agent.svg';
import brain from '../../../Assets/brain.svg';
import globe from '../../../Assets/globe.svg';
import Circles from '../../../Assets/Circles.png';
import Circles_md from '../../../Assets/Circles_md.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function OurCommitmentSection() {
	const theme = useTheme();
	const { t } = useTranslation();
	const BackgroundOurCommitmentStyle = styled('div')(({ theme }) => ({
		[theme.breakpoints.up('lg')]: {
			backgroundImage: `url(${Circles})`
		},
		[theme.breakpoints.only('md')]: {
			backgroundImage: `url(${Circles_md})`
		},
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100%',
		backgroundPositionY: '65%'
	}));
	const smallDevice = useMediaQuery(theme.breakpoints.only('xs'));
	const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));
	const [btnFlag, setBtnFlag] = useState(1);
	const [btnText, setBtnText] = useState('More details');

	const updateIcon = () =>{
		if(btnFlag == 1){
			setBtnText('Less Details');
			setBtnFlag(0);
		}else{
			setBtnText('More details');
			setBtnFlag(1);
		}
	}

	useEffect(()=>{
		const blockParagraph = document.getElementsByClassName('actionClass');
		for(let i = 0 ; i < blockParagraph.length; i++){
			if(btnFlag == 1){
				blockParagraph[i].classList.add('hideParagraph');
			}else{
				blockParagraph[i].classList.remove('hideParagraph');
			}
		}
	},[btnFlag]);

	const ourCommitBlock = (icon, header, content,index) => {
		return (
			<Grid container direction="row" sx={{ zIndex: 99999, backgroundColor: 'grey.0' }}>
				<Grid item xs={2} sx={{width: {xs: '54px', md: '96px' } }}>
					<img src={icon} alt="Coin" loading="lazy" />
				</Grid>
				<Grid item xs={10} paddingX={2} marginY='auto'  onClick={() => {
					if(smallDevice){
						const showEle = document.getElementsByClassName('index_'+index);
						const hideEle = document.getElementsByClassName('actionClass');
						for(let i = 0 ; i < hideEle.length; i++){
							hideEle[i].classList.add('hideParagraph');
						}
						showEle[0].classList.remove('hideParagraph')
					}
				}}>
					<Typography variant='h6' color='grey.900'>{t(header)}</Typography>
					<Typography variant='body1' color='grey.800' sx={{display: {xs: 'none', sm: 'block'}}}>{t(content)}</Typography>
				</Grid>
				<Grid item>
					<Typography variant='body1' className={(smallDevice) ? 'hideParagraph actionClass index_'+index : ''} color='grey.800' sx={{display: {xs: 'block',sm: 'none'} , paddingTop: 2 }} >{t(content)}</Typography>
				</Grid>
			</Grid>
		);
	}
	return (
		<Grid container>
			<Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ paddingBottom: 4 }} >
				<Typography variant="h4" color='grey.900' textAlign='center'>{t('Our Commitment to Exceptional Service')}</Typography>
			</Grid>
			<Grid item xl={12} lg={12} md={12} sm={12} xs={12} position={'relative'} marginBottom={'20px'}>
				<BackgroundOurCommitmentStyle>
					<Grid item container direction='row'>
						<Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{paddingTop: {xs: 0, xl:8,lg: 8, md: 1, sm: 0}, paddingRight: {xs: 0, lg:20}}} className="commitmentGrid" >
							{ourCommitBlock(Coin, 'Unmatched Value', 'With UHI, you receive unbeatable value through competitive pricing, premium services, and tailor-made solutions that exceed client expectations.',1)}
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{paddingTop: {xs: 4, xl:8,lg: 8, md: 1, sm: 4}, paddingLeft: {xs: 0, lg:20}}} className="commitmentGrid" >
							{ourCommitBlock(Hands, 'Unparalleled Partnerships', 'UHI forges trusted alliances, giving you access to exclusive resources, unparalleled inventory, and exceptional travel experiences worldwide.',2)}
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{paddingTop: { xs: 4, xl:8, lg: 8, md: 6, sm: 4 }, paddingLeft: {xs: 0, lg:20}}} className="commitmentGrid" >
							{ourCommitBlock(fastLaunch, 'Dynamic Growth Partner', 'UHI fuels your growth by offering strategic guidance, market intelligence, and innovative tools that expand your business and increase revenue.',3)}
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{paddingTop:{ xs: 4, xl:8,lg: 8, md: 6, sm: 4 }, paddingRight: {xs: 0, lg:20}}} className="commitmentGrid" >
							{ourCommitBlock(Agent, 'Exemplary Support', 'Our dedicated support team ensures your success with prompt assistance, expert guidance, and proactive problem-solving for seamless operations.',4)}
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{paddingTop: { xs: 4, xl:8,lg: 8, md: 6, sm: 4 }, paddingRight: {xs: 0, lg:20}}} className="commitmentGrid" >
							{ourCommitBlock(brain, 'Streamlined Efficiency', 'UHI\'s intuitive platform and automated processes streamline operations, maximize productivity, and enhance your efficiency, saving you time and effort.',5)}
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{paddingTop: { xs: 4, xl:8,lg: 8, md: 6, sm: 4 }, paddingLeft: {xs: 0, lg:20}}} className="commitmentGrid" >
							{ourCommitBlock(globe, 'Global Reach, Local Expertise', 'UHI\'s global network provides you with access to curated local experiences, authentic insights, and insider knowledge in every destination.',6)}
						</Grid>
					</Grid>
					<Grid item xs={12} display={isExtraSmall ? 'block' : 'none'}>
						<Grid display={'flex'} paddingX={2}  alignItems={'center'} flexDirection={'column'} sx ={{paddingTop:{xs: 4,  sm: 4 } ,paddingBottom:{xs: 0, sm: 0 } }}>
							<Button variant="outlined" size='medium' color="primary" onClick={updateIcon} startIcon={(btnFlag == 1) ? <AddIcon /> : <RemoveIcon />}>{t(btnText)}</Button>
						</Grid>
					</Grid>
				</BackgroundOurCommitmentStyle>
			</Grid>
		</Grid>
	);
}
