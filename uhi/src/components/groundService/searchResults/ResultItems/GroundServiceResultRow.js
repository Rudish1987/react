import React, { useState, useEffect } from 'react';
// material
import {
	Box,
	Paper,
	Grid,
	Typography,
	Checkbox,
	FormGroup,
	FormControlLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import DisplayPrice from '../../../DisplayPrice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ClearIcon from '@mui/icons-material/Clear';
import RateType from '../../../../components/common/RateType';
import SelectButton from '../../../SelectButton';
import Constants from '../../../../helpers/constants';
import { useLocale } from '../../../../context/LocaleContext';
import '../../../../css/groundService.css';
import { FormatNumber, scrollToTop } from '../../../../helpers/utils';


const GroundServiceResultsRow = ({
	tourDet,
	currency,
	totalPax,
	totalStay,
	onBookClick,
	disableSelect,
}) => {
	const tour = tourDet.length == 1 ? tourDet[0] : tourDet;
	const tourId = tour['@attributes'].tourid;
	const [show, setShow] = useState({ Addition: false, Package: false });
	const [selectedAdditionalServices, setAdditionalServices] = useState([]);
	const { t } = useTranslation();
	const { locale } = useLocale();
	const [selSerCodeArr, setService] = useState([]);
	const [isUpdate, setUpdate] = useState(false);


	const handleClick = (type, value) => {
		setShow((prev) => {
			const newShow = { ...prev };
			newShow[type] = value;
			return newShow;
		});
	};
	const handleBookClick = (parameters) => {
		scrollToTop()
		onBookClick({ ...parameters, tour: tour });
	};
	const [gsAmount, setPrice] = useState(0);
	useEffect(() => {
		let totalAmount = tour.total * totalPax;
		if (isUpdate === true)
			totalAmount = gsAmount;
		setPrice(totalAmount)
	}, [gsAmount, isUpdate]);
	const updateServiceAmount = (evt, serviceName) => {
		let serviceVal = evt.target.value;
		let serviceValArr = serviceVal.split('-');
		let serviceAmt = serviceValArr[1];
		let serviceCode = serviceValArr[0];
		let totalAmount = parseFloat(gsAmount);
		let serviceAmtForPax = parseFloat(
			serviceAmt * parseInt(totalPax) * parseInt(totalStay)
		);

		if (evt.target.checked) {
			totalAmount += parseFloat(serviceAmtForPax);
			const newItem = {
				id: serviceCode,
				name: serviceName,
			};

			setService((selSerCodeArr) => [...selSerCodeArr, serviceCode]);
			setAdditionalServices([...selectedAdditionalServices, newItem]);
		} else {
			totalAmount -= parseFloat(serviceAmtForPax);

			setService(selSerCodeArr.filter((item) => item !== serviceCode));
			setAdditionalServices(
				selectedAdditionalServices.filter((item) => item.id !== serviceCode)
			);
		}

		setUpdate(true);
		setPrice(totalAmount);
	};

	return (
		<Grid item sm xs={12}>
			<Paper elevation={0} className='groundservice-paper'>
				<Grid
					item
					xs
					sm
					container
					direction='row'
					spacing={1}
					alignItems='center'
					justifyContent='space-between'
				>
					<Grid item container direction='column' xs={1}>
						<Typography
							variant='subtitle2'
							component='div'
							sx={{ marginTop: '8px' }}
							className='package-title'
						>
							{locale.value == Constants.LANGUAGES_AR ? tour.typeAR : tour.type}
						</Typography>
					</Grid>

					<Grid
						item
						container
						direction='column'
						xs={5}
						sx={{ display: 'contents' }}
					>
						{!show.Package && (
							<Typography
								variant='subtitle2'
								component='div'
								onClick={() => handleClick('Package', true)}
								className='package-details'
							>
								{t('Package Details')}
								<ArrowDropDownIcon
									sx={{
										position: 'relative',
										top: '7px',
									}}
								/>
							</Typography>
						)}
						{show.Package && (
							<Typography
								variant='subtitle2'
								component='div'
								onClick={() => handleClick('Package', false)}
								className='package-details'
							>
								{t('Package Details')}
								<ArrowDropUpIcon
									sx={{
										position: 'relative',
										top: '7px',
									}}
								/>
							</Typography>
						)}

						{!show.Addition && (
							<Typography
								variant='subtitle2'
								component='div'
								onClick={() => handleClick('Addition', true)}
								className='additional-details'
							>
								{t('Additional Details')}
								<ArrowDropDownIcon
									sx={{
										position: 'relative',
										top: '7px',
									}}
								/>
							</Typography>
						)}

						{show.Addition && (
							<Typography
								variant='subtitle2'
								component='div'
								onClick={() => handleClick('Addition', false)}
								className='additional-details'
							>
								{t('Additional Details')}
								<ArrowDropUpIcon
									sx={{
										position: 'relative',
										top: '7px',
									}}
								/>
							</Typography>
						)}
					</Grid>

					<Grid item container direction='column' xs={2}>
						<RateType rateBases={tour} currency={currency} />
					</Grid>
					<Grid
						item
						xs={4}
						className='currencyText'
						container
						direction='row'
						alignItems='center'
						justifyContent='flex-end'
					>
						<Grid item container direction='column' xs align='right'>
							<DisplayPrice
								currency={currency}
								price={gsAmount}
								priceText={'Inclusive of Taxes'}
							/>
						</Grid>
						<SelectButton
							disableSelect={disableSelect}
							handleFunction={() =>
								handleBookClick({
									tourId: tourId,
									additionalServ: selectedAdditionalServices,
									totalAmount: gsAmount,
									pkgDetails: tour.tariffNotes,
								})
							}
						/>
					</Grid>
				</Grid>
				{show.Addition && (
					<Paper
						elevation={0}
						sx={{
							p: 1,
							flexGrow: 1,
							backgroundColor: '#ededed',
							alignItems: 'center center',
							marginBottom: '2px',
							borderTop: '2px solid #e0e0e0',
							borderRadius: '0px',
						}}
					>
						{locale.value === Constants.LANGUAGES_EN &&
							<Typography
								variant='subtitle2'
								component='div'
								onClick={() => handleClick('Addition', false)}
								className='close-button'
							>
								{t('Close')}
								<ClearIcon
									sx={{
										fontSize: '16px',
										position: 'relative',
										top: '3px',
										left: '3px',
									}}
								/>
							</Typography>
						}
						{locale.value === Constants.LANGUAGES_AR &&
							<Typography
								variant='subtitle2'
								component='div'
								onClick={() => handleClick('Addition', false)}
								className='close-button-ar'
							>
								{t('Close')}
								<ClearIcon
									sx={{
										fontSize: '16px',
										position: 'relative',
										top: '3px',
										left: '3px',
									}}
								/>
							</Typography>
						}
						<Grid item xs sm container direction='row' spacing={1}>
							<Typography
								item
								container
								direction='column'
								xs={2}
								component='div'
							>
								<Typography variant='subtitle2' component='div'>
									{t('Additional Services')}
								</Typography>

								<Grid
									sx={{ marginLeft: '137px', marginTop: '5px' }}
									item
									spacing={2}
									xs={12}
								>
									<FormGroup
										sx={{
											flexDirection: 'row',
										}}
									>
										{tour.additionalServices !== undefined && <Grid item xs={12}>
											{tour.additionalServices.service.map((service) => {
												let serviceDesc =
													locale.value == Constants.LANGUAGES_AR
														? service.descriptionAR
														: service.description;
												return (
													<FormControlLabel
														key={service.code}
														sx={{
															'& .muiltr-b3hmz6-MuiTypography-root': {
																fontSize: '12px',
															},
															width: '200px',
															marginRight: '20px',
														}}
														control={
															<Checkbox
																value={service.code + '-' + service.amount}
																onChange={(e) =>
																	updateServiceAmount(e, serviceDesc)
																}
																checked={selSerCodeArr.includes(service.code)}
															/>
														}
														label={serviceDesc + '(' + '+' + currency + ' ' + FormatNumber(service.amount, 2) + ')'}
													/>
												);
											})}
										</Grid>}
									</FormGroup>
								</Grid>
								{tour.additionalServices == undefined && <Box>{t('No Additional Services Available')}</Box>}
							</Typography>
						</Grid>
					</Paper>
				)}
				{show.Package && (
					<Grid item sm xs={12}>
						<Paper
							elevation={0}
							sx={{
								p: 1,
								flexGrow: 1,
								backgroundColor: '#ededed',
								alignItems: 'center center',
								marginBottom: '2px',
								borderTop: '2px solid #e0e0e0',
								borderRadius: '0px',
							}}
						>
							{locale.value === Constants.LANGUAGES_AR &&
								<Typography
									variant='subtitle2'
									component='div'
									onClick={() => handleClick('Package', false)}
									className='close-button-ar'
								>
									{t('Close')}
									<ClearIcon
										sx={{
											fontSize: '16px',
											position: 'relative',
											top: '3px',
											left: '3px',
										}}
									/>
								</Typography>
							}
							{locale.value === Constants.LANGUAGES_EN &&
								<Typography
									variant='subtitle2'
									component='div'
									onClick={() => handleClick('Package', false)}
									className='close-button'
								>
									{t('Close')}
									<ClearIcon
										sx={{
											fontSize: '16px',
											position: 'relative',
											top: '3px',
											left: '3px',
										}}
									/>
								</Typography>
							}
							<Grid
								item
								xs
								sm
								container
								direction='row'
								spacing={1}
								alignItems='center'
								justifyContent='space-between'
							>
								<Grid item container direction='column' xs={4}>
									<Typography variant='subtitle2' component='div'>
										{t('Package Details')}
									</Typography>
									{tour.tariffNotes.length > 0 && <Box className='packagedetailsContnt'>{tour.tariffNotes}</Box>}
									{tour.tariffNotes.length == 0 && <Typography
										item
										container
										direction='column'
										xs={2}
										component='div'
									>
										<Box>{t('No Package Details Available')}</Box>
									</Typography>}
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				)}
			</Paper>
		</Grid>
	);
};

export default GroundServiceResultsRow;
