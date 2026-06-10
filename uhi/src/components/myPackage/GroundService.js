import React, { useState } from 'react'
import { Typography, Avatar, Grid, Box, Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import GroundServicesSVG from '../../Assets/GroundServicesSVG'
import { useTranslation } from 'react-i18next'
import { FormatNumber, BuildTravellPeriodText } from '../../helpers/utils';
import RateType from '../common/RateType'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DoneIcon from '@mui/icons-material/Done';
import { useLocale } from '../../context/LocaleContext'
import Constants from '../../helpers/constants';
import { useStoreState } from 'easy-peasy';
// import RebookButton from '../common/RebookButton';
// import BookingCancelButton from '../common/BookingCancelButton';

const AvatarPackageList = styled(Avatar)(() => ({
	color: '#00B760',
	border: '2px solid #00B760 !important',
	backgroundColor: '#FFFFFF',
	width: 24,
	height: 24,
	'& .MuiSvgIcon-root': {
		fontSize: '1rem',
	},
}));

const ParagraphStyled = styled(Typography)(() => ({
	fontWeight: 400,
	fontSize: 12,
	color: '#424242'
}));


const GroundService = ({ groundServicePackage, hasActions = true, currency }) => {
	const { t } = useTranslation();
	const rebook = useStoreState(actions => actions.btoc.itineraryDetails.rebook)
	const [show, setShow] = useState({ Addition: false, Package: false });
	const { locale } = useLocale();

	let content = (
		<>
			<Grid item xs={6} sx={{ py: '0 !important' }}>
				<Typography variant="subtitle2" sx={{ fontWeight: 400, fontSize: 12, color: 'Grey/900 - Main text', textTransform: 'capitalize' }}>{t(groundServicePackage.supplier)}</Typography>
			</Grid>
			<Grid item xs={6} sx={{ py: '0 !important' }}>
				<RateType rateBases={groundServicePackage} currency={currency} />
			</Grid>
		</>
	)

	const handleClick = (type, value) => {
		setShow(prev => {
			const newShow = { ...prev };
			newShow[type] = newShow[type] === true ? false : value;
			return newShow
		})
	};

	let groundserviceIncomplete = false;
	if (groundServicePackage.status === 'INCOMPLETE') {
		groundserviceIncomplete = true;
	}
	return (
		<>
			<Grid container item sm xs={12} sx={{ pb: 2, borderBottom: '2px solid #E0E0E0' }}>
				<Grid item container xs={12} direction="row" >
					<Grid item sx={{ marginRight: '10px', maxWidth: '4%', display: 'flex', alignItems: 'flex-start', color: 'Notification/Success/Main' }} >
						<AvatarPackageList><GroundServicesSVG /></AvatarPackageList>
					</Grid>
					<Grid item xs={rebook ? 6 : 8} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
						<Grid container spacing={2} columns={12}>
							<Grid item xs={12}>
								<Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: 'Grey/900 - Main text', textTransform: 'capitalize' }}>{t('Ground Service Package')}</Typography>
							</Grid>
							{hasActions && content}
							<Grid item xs={12} sx={{ py: '0 !important' }}>
								{locale.value === 'ar' &&
									<ParagraphStyled className="groundserice-pack-rtl" paragraph={true}>{t('Adults')} {t(groundServicePackage.paxCount)} {'X'} {t(groundServicePackage.packageName)}</ParagraphStyled>
								}
								{locale.value === 'en' &&
									<ParagraphStyled paragraph={true}>{t(groundServicePackage.packageName)} {'X'} {t(groundServicePackage.paxCount)} {t('Adults')}</ParagraphStyled>
								}
								<ParagraphStyled paragraph={true}>{t(BuildTravellPeriodText(groundServicePackage.dateFrom, groundServicePackage.dateTo, 'Day'))}</ParagraphStyled>
								<Grid container direction="row" sx={{ mt: 0 }}>
									<Grid item sx={{ display: 'flex', pb: 0.25 }}>
										<Typography variant="subtitle2" component="div" sx={{ fontWeight: 500, fontSize: '12px', cursor: 'pointer' }} onClick={() => handleClick('Package', true)}>
											<ArrowDropDownIcon sx={{ position: 'relative', top: '7px' }} /> {t('Package Details')}
										</Typography>
									</Grid>
									{groundServicePackage.additionalServices.length > 0 && <Grid item sx={{ display: 'flex', pb: 0.25 }}>
										<Typography variant="subtitle2" component="div" sx={{ fontWeight: 500, fontSize: '12px', cursor: 'pointer' }} onClick={() => handleClick('Addition', true)}>
											<ArrowDropDownIcon sx={{ position: 'relative', top: '7px' }} />{t('Additional Details')}
										</Typography>
									</Grid>
									}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					{rebook && <Grid item xs={2} sx={{ display: 'flex', paddingLeft: '13%' }}>
						<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
							<Typography className={(groundserviceIncomplete) ? 'addredcolor' : ''} paragraph={true} sx={{ fontSize: 12, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(groundServicePackage.status ?? 'SAVED')}</Typography>
						</Stack>
					</Grid>}
					<Grid item xs={3} sx={{ display: 'flex', paddingLeft: '13%' }}>
						<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
							<Typography paragraph={true} sx={{ fontSize: 12, mb: -1, color: 'Grey/900 - Main text', fontWeight: 600 }}>{t(currency)}</Typography>
							<Typography paragraph={true} sx={{ fontSize: 20, color: 'Grey/900 - Main text', fontWeight: 600 }}>{`${FormatNumber(groundServicePackage.totalPrice, 2)}`}</Typography>
						</Stack>
					</Grid>
				</Grid>
				{show.Addition && <Grid container xs={12}>
					<Grid item xs={1}></Grid>
					<Grid item xs={11}>
						<Paper elevation={0} sx={{ p: 1, flexGrow: 1, alignItems: 'center center', marginBottom: '2px', borderTop: '1px solid #e0e0e0', borderRadius: '0px' }} >
							<Grid item sm container xs={12} direction="row" spacing={1}>
								{groundServicePackage.additionalServices &&
									groundServicePackage.additionalServices.map(service => {
										return (
											<Grid item xs={4} key={t(service.code)}>
												<ParagraphStyled paragraph={false} sx={{ fontWeight: 500, fontSize: '12px', lineHeight: '18px' }}><DoneIcon sx={{ fontSize: '24px' }} />{(locale.value === Constants.LANGUAGES_AR && typeof (groundServicePackage.status) !== 'undefined') ? service.NameAR : service.name}</ParagraphStyled>
											</Grid>
										)
									})
								}
							</Grid>
						</Paper >
					</Grid>
				</Grid>
				}
				{show.Package && <Grid container xs={12}>
					<Grid item xs={1}></Grid>
					<Grid item xs={11}>
						<Paper elevation={0} sx={{ p: 1, flexGrow: 1, alignItems: 'center center', marginBottom: '2px', borderTop: '1px solid #e0e0e0', borderRadius: '0px' }} >
							<Grid item xs sm container direction="row" spacing={1} alignItems="center" justifyContent="space-between">
								<Grid item container xs={11} direction='column'>
									<Box sx={{ fontWeight: 500, fontSize: '12px', lineHeight: '18px' }}> {groundServicePackage.pkgDesc} </Box>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				}
			</Grid>
		</>
	)
}
export default GroundService