import React from 'react'
import Modal from '@mui/material/Modal';
import { Container, Paper, Box, Grid, Button, Typography, Stack } from '@mui/material'
import { InvoiceDetails } from './InvoiceDetails';
import { useStoreState, useStore } from 'easy-peasy';
import Logo from '../Logo';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ClearIcon from '@mui/icons-material/Clear'
import Constants from '../../helpers/constants';
import { useLocale } from '../../context/LocaleContext';
import { titleCase } from '../../helpers/utils';
import { styled } from '@mui/material/styles';

const Invoice = ({ showInvoice, setShowInvoice }) => {
	const { t } = useTranslation();
	const store = useStore();
	const itineraryDetails = useStoreState(s => s.btob.visa.itineraryDetails);
	const visaTravelersList = useStoreState(s => s.btob.visa.travelersList)
	const { locale } = useLocale();
	const user = store.getState().user;
	
	const handleClose = () => setShowInvoice(false);
	
	const downloadPdfRef = React.useRef();
	
	const handleDownloadPdf = async () => {
		const element = downloadPdfRef.current;
		const canvas = await html2canvas(element);
		const data = canvas.toDataURL('image/png');
		
		const pdf = new jsPDF();
		const imgProperties = pdf.getImageProperties(data);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight =
		(imgProperties.height * pdfWidth) / imgProperties.width;
		
		pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
		pdf.save('invoice.pdf');
	};

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
							<Grid item xs={5}>
								<Logo src={Constants.LOGO} />
							</Grid>
							<Grid item xs={7}>
								<Grid container className="invoice-rtl-align">
									<Grid item xs={4} className="invoice-topheadings">
										{t('Invoice Date')}:
									</Grid>
									<Grid item xs={8} className="invoice-topinfo">
										{t(format(new Date(), 'EEEE')) + ',' + t(format(new Date(), 'MMMM')) + format(new Date(), 'dd, yyyy')}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Typography className="invoice-title">
							{t('Invoice')}
						</Typography>
						<Grid container>
							<Grid item xs={4} className="invoice-headings">
								{t('Customer Name')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								{titleCase(user.user.LastName)} {titleCase(user.user.FirstName)}
							</Grid>
							<Grid item xs={4} className="invoice-headings">
								{t('Customer Address')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{titleCase(user.user.Address)}
								</Grid>
							</Grid>

							<Grid item xs={4} className="invoice-headings">
								{t('Telephone')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{user.user.Tel}
								</Grid>
							</Grid>

							<Grid item xs={4} className="invoice-headings">
								{t('Booking Reference')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{itineraryDetails.intRef}
								</Grid>
							</Grid>
							<Grid item xs={4} className="invoice-headings">
								{t('Status')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>{t(titleCase(itineraryDetails.displayType))}
								</Grid>
							</Grid>
							<Grid item xs={4} className="invoice-headings">
								{t('First Arrival Date')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{visaTravelersList.length > 0 && visaTravelersList[0].details.AdditionalDetails.dateFrom}
								</Grid>
							</Grid>
							<Grid item xs={4} className="invoice-headings">
								{t('Lead Guest Name(s)')}:
							</Grid>
							<Grid item xs={8} className="invoice-info">
								<Grid item xs={5}>
									{itineraryDetails.leadPassenger}
								</Grid>
							</Grid>
						</Grid>
						<InvoiceDetails />
						<Typography className="invoice-description" sx={{ mt: 2 }}>
							{t('Your payment is due by As per Contract and can be made by using the below details, based on the appropriate trading currency.')}
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
									<Stack>
										<Typography sx={{ color: '#fff', fontWeight: 400, lineHeight: 2 }}>
											{t('UMRAH HOLIDAYS INTERNATIONAL FZ LLC')}
										</Typography>
										<Typography sx={{ color: '#fff', lineHeight: 2, width: '350px' }}>
											{t('Exclusive Desk No. 54, 1st Floor, Building') + ' ' + t('#12 Dubai, United Arab Emirates')}
										</Typography>

									</Stack>
								</GridItem>
								<GridItem item xs={4}>
									<Stack >
										<Grid container sx={{ color: '#fff', fontSize: '12px', mb: 2 }}>
											<Grid item xs={12}>{t('VAT Registration Number')}: 300508034300003</Grid>
											<Grid item xs={12}>{t('Account number')}: 022-809362-101</Grid>
											<Grid item xs={12}>{t('IBAN: AE270200000022809362101')}</Grid>
											<Grid item xs={12}>{t('Account Title: Umrah Holidays International')}</Grid>
											<Grid item xs={12}>{t('FZ-LLC Bank Name: HSBC Middle East Ltd')}</Grid>
											<Grid item xs={12}>{t('Country')}: United Arab Emirates</Grid>
											<Grid item xs={12}>{t('SWIFT: BBMEAEAD')}</Grid>
											<Grid item xs={12}>{t('Currency')}: {t(Constants.B2B_DEFAULT_CURRENCY)}</Grid>
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

export default Invoice