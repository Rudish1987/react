import React from 'react'
import Modal from '@mui/material/Modal';
import { Container, Paper, Box, Grid, Button, Typography, Stack } from '@mui/material'
import { PackageItemsListForLogin } from '../myPackage/PackageItemsListForLogin';
import { useStoreState } from 'easy-peasy';
import Logo from '../Logo';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ClearIcon from '@mui/icons-material/Clear'
import Constants from '../../helpers/constants';
import { useLocale } from '../../context/LocaleContext';

const Voucher = ({ showInvoice, setShowInvoice }) => {
	const { t } = useTranslation();
	// const bookingInfo = useStoreState(s => s.btoc.afterBookingItineraryDetails);
	const currency = useStoreState(actions => actions.btoc.itineraryDetails.Currency)
	const totalItineraryAmount = useStoreState(s => s.btoc.itineraryDetails.itineraryAmount)
	// const user = useStoreState(s => s.btoc.user).user;
	const { locale } = useLocale();

	const handleClose = () => setShowInvoice(false);

	const downloadPdfRef = React.useRef();

	const handleDownloadPdf = async () => {
		html2canvas(downloadPdfRef.current).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF();
			const imgProperties = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
			pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
			pdf.save('Voucher.pdf');
		});
		//window.print();
	}

	const GridItem = styled(Grid)(() => ({
		paddingTop: 5,
		marginBottom: 3,
		paddingBottom: 5,
	}));

	return (
		<Modal
			open={showInvoice}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className="invoice-page">
				{locale.value === Constants.LANGUAGES_EN &&
					<Grid item sx={{ display: 'flex', alighItems: 'flex-end', justifyContent: 'flex-end', color: 'Secondary/Dark' }}>
						<ClearIcon className="invoiceclosebutton-pos" onClick={handleClose} />
					</Grid>
				}
				{locale.value === Constants.LANGUAGES_AR &&
					<Grid item sx={{ display: 'flex', alighItems: 'flex-end', justifyContent: 'flex-end', color: 'Secondary/Dark' }}>
						<ClearIcon className="invoiceclosebutton-pos-ar" onClick={handleClose} />
					</Grid>
				}
				<Grid container direction="row" justifyContent="flex-end">
					<Button className="download-pos" onClick={handleDownloadPdf}>{t('Download as PDF')}</Button>
				</Grid>
				<Grid ref={downloadPdfRef}>
					<Grid className="invoice-container">
						<Grid container>
							<Grid item xs={7}>
								<Logo src={Constants.LOGO} />
							</Grid>
							<Grid item xs={5}>
								<Grid container className="invoice-rtl-align">
									<Grid item xs={3} className="invoice-topheadings">
										{t('Print Date')}:
									</Grid>
									<Grid item xs={8} className="invoice-topinfo">
										{t(format(new Date(), 'EEEE')) + ' ' + t(format(new Date(), 'MMMM')) + format(new Date(), 'dd, yyyy')}
									</Grid>
								</Grid>
								<Grid container className="invoice-rtl-align">
									<Grid item xs={4} className="invoice-topheadings">
										{t('Booking Reference')}:
									</Grid>
									<Grid item xs={8} className="invoice-topinfo">
										{/* {bookingInfo.parentBookingCode} */}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Typography className="invoice-title">
							{t('Voucher')}
						</Typography>
						<Grid container>
							<Grid item xs={4} className="invoice-headings">
								{t('Customer Name')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								{/* {user.LastName} {user.FirstName} */}
							</Grid>
							<Grid item xs={4} className="invoice-headings">
								{t('Customer Address')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{/* {user.Address} */}
								</Grid>
							</Grid>

							<Grid item xs={4} className="invoice-headings">
								{t('Telephone')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{/* {user.Tel} */}
								</Grid>
							</Grid>

							<Grid item xs={4} className="invoice-headings">
								{t('Booking Reference')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{/* {bookingInfo.itineraryId} */}
								</Grid>
							</Grid>
							<Grid item xs={4} className="invoice-headings">
								{t('Status')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>{t('Confirmed')}
								</Grid>
							</Grid>
							<Grid item xs={4} className="invoice-headings">
								{t('First Arrival Date')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{/* {t(format(new Date(bookingInfo.groundService.dateFrom), 'EEEE')) + ',' + t(format(new Date(bookingInfo.groundService.dateFrom), 'MMMM')) + format(new Date(bookingInfo.groundService.dateFrom), 'dd, yyyy')} */}
								</Grid>
							</Grid>
							<Grid item xs={4} className="invoice-headings">
								{t('Lead Guest Name(s)')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{/* {bookingInfo.visa.passengers[0].name} */}
								</Grid>
							</Grid>
						</Grid>
						<PackageItemsListForLogin totalItineraryAmount={totalItineraryAmount} passCurrency={currency} isExpandedPanel={false} hasActions={false} isConfirmed={true} />
						<Typography className="invoice-description" sx={{ mt: 2 }}>
							{t('Your payment is due by 2022-09-05 10:50:00(Customer Time Zone) and can be made by using the below details.')}
						</Typography>
						<Typography className="invoice-description" sx={{ mt: 2 }}>
							{t('If you have any questions regarding your payment, please contact us via customerservice@uhitravel.com or call +20 22 4000700.')}
						</Typography>
					</Grid>
					<Paper elevation={3} sx={{
						p: 2,
						backgroundColor: '#282E36',
						borderRadius: '0px'
					}}>
						<Container maxWidth='xl'>
							<Grid
								container
								columns={{ xs: 6, sm: 6, md: 12 }}
								sx={{ mt: 4 }}
							>
								<GridItem item xs={12} sm={12} md={3}>
									<Stack
										sx={{
											justifyContent: 'space-around',
											alignItems: 'center',
										}}
									>
										<Grid>
											<Logo src={Constants.LOGO} />
										</Grid>
									</Stack>
								</GridItem>
								<GridItem item xs={4}>
									<Stack
									>
										<Stack>
											<Typography sx={{ color: '#fff', fontWeight: 400, lineHeight: 2 }}>
												{t('UMRAH HOLIDAYS INTERNATIONAL FZ LLC')}
											</Typography>
											<Typography sx={{ color: '#fff', lineHeight: 2, width: '350px' }}>
												{t('Exclusive Desk No. 54, 1st Floor, Building')}
											</Typography>
											<Typography sx={{ color: '#fff', lineHeight: 2, width: '350px' }}>
												{t('#12 Dubai, United Arab Emirates')}
											</Typography>

										</Stack>
									</Stack>
								</GridItem>
								<GridItem item xs={4}>
									<Stack >
										<Grid container sx={{ color: '#fff', fontSize: '12px', mb: 2 }}>
											<Grid item xs={12}>{t('VAT Registration Number')}:300508034300003</Grid>
											<Grid item xs={12}>{t('Account number')}: 022-809362-101</Grid>
											<Grid item xs={12}>{t('IBAN: AE270200000022809362101')}</Grid>
											<Grid item xs={12}>{t('Account Title: Umrah Holidays International')}</Grid>
											<Grid item xs={12}>{t('FZ-LLC Bank Name: HSBC Middle East Ltd')}</Grid>
											<Grid item xs={12}>{t('Country: United Arab Emirates')}</Grid>
											<Grid item xs={12}>{t('SWIFT: BBMEAEAD')}</Grid>
											<Grid item xs={12}>{t('Currency')}: USD</Grid>
										</Grid>
									</Stack>
								</GridItem>
							</Grid>
						</Container>
					</Paper>
				</Grid>
			</Box>
		</Modal>
	)
}

export default Voucher