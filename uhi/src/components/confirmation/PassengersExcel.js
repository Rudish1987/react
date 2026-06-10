import React, { useCallback } from 'react'
import Typography from '@mui/material/Typography'
import { Grid, Button, Link } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import Modal from '@mui/material/Modal';
import '../../css/passengerDetails.css';
import PassengerDetails from '../../Assets/PassengerDetails.xlsx';
import * as XLSX from 'xlsx';
import '../../css/PassengersExcel.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStoreState } from 'easy-peasy';
import { useLocale } from '../../context/LocaleContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Constants from '../../helpers/constants';

export default function PassengersExcel({ onClickOnContinue }) {
	const { t } = useTranslation();
	const [open, setOpen] = React.useState(false);
	const [excelError, setExcelError] = React.useState('');
	const [isError, setIsError] = React.useState(true);
	const { locale } = useLocale();
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setIsError(false);
		setFields();
	}
	const [fields, setFields] = React.useState();
	const rooms = useStoreState(s => s.btoc.filters.rooms);
	const passengerCount = rooms.reduce((a, b) => a + (b.adultsCount * b.room), 0);

	const onDrop = useCallback(acceptedFiles => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader()
			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = (evt) => {
				const bstr = evt.target.result;
				const wb = XLSX.read(bstr, { cellDates: true });
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				const data = XLSX.utils.sheet_to_json(ws, { raw: true });
				let excelValidate = validateExcel(data);
				if (excelValidate) {
					setFields(data);
				} else {
					setFields();
					setExcelError(t('Error in excel file. Kindly check and upload again'))
				}
			}
			reader.readAsArrayBuffer(file)
		})
	}, []);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: '.xlsx'
	});

	const validateExcel = (data) => {

		let expectedColumn = ['gender', 'givenName', 'surname', 'passport', 'passportExpiry', 'dateOfBirth', 'mahramPassportNumber'];

		let statusCheck = 1;

		if (passengerCount !== data.length) {
			return false;
		} else if (data.length > 0) { // check for blank excel
			// check expected column
			let excelHeader = Object.keys(data[0]);
			excelHeader.map(header => {
				if (expectedColumn.indexOf(header) < 0) {
					statusCheck = 0;
				}
			})

			// check for empty value
			data.map(passenger => {
				if (statusCheck == 0) {
					return;
				}
				// check gender
				if (passenger[expectedColumn[0]] == '' || passenger[expectedColumn[0]] == ' ') {
					statusCheck = 0;
					return;
				}
				// check givenName
				if (passenger[expectedColumn[1]] == '' || passenger[expectedColumn[1]] == ' ') {
					statusCheck = 0;
					return;
				}

				// check surname
				if (passenger[expectedColumn[2]] == '' || passenger[expectedColumn[2]] == ' ') {
					statusCheck = 0;
					return;
				}
				// check passport
				if (passenger[expectedColumn[3]] == '' || passenger[expectedColumn[3]] == ' ') {
					statusCheck = 0;
					return;
				}
				// check passportExpiry
				if (passenger[expectedColumn[4]] == '' || passenger[expectedColumn[4]] == ' ') {
					statusCheck = 0;
					return;
				}
				// check dateOfBirth
				if (passenger[expectedColumn[5]] == '' || passenger[expectedColumn[5]] == ' ') {
					statusCheck = 0;
					return;
				}
				// check muramNumber
				if ((passenger[expectedColumn[1]] == 'F') && (passenger[expectedColumn[6]] == '' || passenger[expectedColumn[6]] == ' ')) {
					statusCheck = 0;
					return;
				}
			})

			if (statusCheck == 0) {
				return false;
			}

			return true;

		} else {
			return false;
		}
	}

	const onChange = (e) => {
		setExcelError('')
		const [file] = e.target.files;
		const reader = new FileReader();
		reader.onload = (evt) => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: 'binary' });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_json(ws, { raw: false, defval: '' });
			let excelValidate = validateExcel(data);
			if (excelValidate) {
				setFields(data);
			} else {
				setFields();
				setIsError(true);
				setExcelError(t('Error in excel file. Kindly check and upload again'))
			}
		};
		reader.readAsBinaryString(file);
	};

	const handleContinue = () => {
		onClickOnContinue(fields)
		setFields();
		handleClose();
	}

	return (
		<>
			<Grid item xs sm container direction="row" sx={{ pt: 3 }} spacing={2} justifyContent='end'>
				<Grid item>
					<Button variant="outlined" onClick={handleOpen} color='inherit' sx={{ border: '1px solid #000000DE' }} size='medium' type='button'><DownloadIcon />&nbsp;{t('USE PASSENGERS EXCEL')}</Button>
				</Grid>
			</Grid>
			<Grid justify='center'>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box className='style'>
						<Typography className='passengerDetails' >{t('Passengers Details file')}</Typography>
						{locale.value === Constants.LANGUAGES_AR &&
						<Typography className='button-ar'>
							<Link style={{ textDecoration: 'none' }} href={PassengerDetails} download="PassengerDetails" target='_blank' rel="noreferrer">
								<Button size='medium' type='button'><DownloadIcon />&nbsp;{t('DOWNLOAD TEMPLATE')}</Button>
							</Link>
						</Typography>}
						{locale.value === Constants.LANGUAGES_EN &&
						<Typography className='button'>
							<Link style={{ textDecoration: 'none' }} href={PassengerDetails} download="PassengerDetails" target='_blank' rel="noreferrer">
								<Button size='medium' type='button'><DownloadIcon />&nbsp;{t('DOWNLOAD TEMPLATE')}</Button>
							</Link>
						</Typography>}

						<Typography className='download'>{t('Instructions')}</Typography>

						<List sx={{ paddingLeft: '29px',paddingBottom: '20px' }}>
							<ListItem className="instructionlist">{t('Download the template')}</ListItem>
							<ListItem className="instructionlist">{t('Fill in the Passenger details')}</ListItem>
							<ListItem className="instructionlist">{t('Gender: M or F (M for Male, F for Female)')}</ListItem>
							<ListItem className="instructionlist">{t('Use Date format dd/mm/yyyy')}</ListItem>
							<ListItem className="instructionlist">{t('If passenger is Female, add Mahram\'s Passport Number where applicable')}</ListItem>
							<ListItem className="instructionlist">{t('Upload the template below')}</ListItem>
						</List>

						
						{isError && excelError.length > 0 && <Typography variant='h6' color='primary'> {t(excelError)} </Typography>}
						<Grid className='dropzone'>
							<Grid onChange={onChange} {...getRootProps()}>
								<input className='input-zone' {...getInputProps()} accept=".xlsx" />
								<Grid sx={{ textAlign: 'center' }} justifyContent='center' className='text-center'>
									{locale.value === 'en' &&
										<Typography >
											<DescriptionIcon className='descriptionicon' />
											{fields && <CheckCircleIcon className="checkmark" />}
										</Typography>
									}
									{locale.value === 'ar' &&
										<Typography >
											<DescriptionIcon className='descriptionicon' />
											{fields && <CheckCircleIcon className="checkmark-ar" />}
										</Typography>
									}
									{!fields && <Typography className='dropzone-content'>
										{t('Drag filled excel file here')}
									</Typography>}
									{!fields && <Typography className='click'>{t('or, click here to browse')}</Typography>}
									{fields && <Typography className='uploaded'>{t('Excel file has been uploaded')}</Typography>}
								</Grid>
							</Grid>
						</Grid>
						<Grid className='cancelbutton' item xs sm container direction="row" sx={{ py: 4 }} spacing={2} justifyContent='end'>

							<Grid item>
								<Button variant="outlined" onClick={handleClose}>{t('CANCEL')}</Button>
							</Grid>
							{fields && <Grid item>
								<Button variant='contained' onClick={handleContinue}>{t('CONTINUE')}&nbsp;<ArrowForwardIcon /></Button>
							</Grid>}
						</Grid>

					</Box>
				</Modal>
			</Grid>
		</>
	);
}
