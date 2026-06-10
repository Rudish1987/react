import React from 'react';
import { Typography, Grid, Box, Container, Button, TextField } from '@mui/material';
import '../../style/scss/btob/landing/index.scss';
import { useTranslation } from 'react-i18next';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#EBEFF5',
		color: theme.palette.common.black,
		borderRadius: 0
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

function createData(itinerary, Intref, travellers, leadpassenger, requestdate, requestexpdate, status) {
	return { itinerary, Intref, travellers, leadpassenger, requestdate, requestexpdate, status };
}
const rows = [
	createData(3453, 'family doe', 5, 'john smith', '10 sep 2023', '10 sep 2023', 'approved'),
	createData(3453, 'family doe', 5, 'john smith', '10 sep 2023', '10 sep 2023', 'approved'),
	createData(3453, 'family doe', 5, 'john smith', '10 sep 2023', '10 sep 2023', 'approved'),
	createData(3453, 'family doe', 5, 'john smith', '10 sep 2023', '10 sep 2023', 'approved'),
];
export default function Visa() {
	const { t } = useTranslation();
	return (
		<>
			<Box className="box-body-flex">
				<Container>
					<Box className='Visasection'>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={9}>
								<Typography variant='h4' color='grey.900'>
									{t('Visa for Saudi Arabia Kingdom')}
								</Typography>
								<Typography variant='body2' color='grey.900'>
									{t('UHI offers a streamlined system forrequesting KSA visas for group travel,simplifying the application process.')}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={3} display='flex' sx={{ justifyContent: { xs: 'left', lg: 'right', md: 'right', sm: 'right' } }}>
								<Button
									variant="contained"
									fullWidth
									size='large'
									sx={{ width: { xs: 150, lg: 205 } }}
									type='submit'
									endIcon={<ArrowForwardOutlinedIcon />}
								>
									{t('REQUEST VISAS')}
								</Button>
							</Grid>
						</Grid>
					</Box>
					<Box component="form" className='Visasection-col'
					>
						<Grid container spacing={2}>
							<Grid sm={2} xs={12} item>
								<TextField
									fullWidth
									id="Itinerary"
									label={t('Itinerary or booking id')}
									type="text"
								/>
							</Grid>
							<Grid sm={2} xs={12} item>
								<TextField
									fullWidth
									id="outlined--input"
									label={t('Internal ref')}
									type="text"
								/>
							</Grid>
							<Grid sm={2} xs={12} item>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										fullWidth
										label={t('Request Date')}
										renderInput={(params) => (<TextField className="validation-cls" {...params} sx={{ width: '100%' }}
										/>)}
										inputFormat={'dd/MM/yyyy'}

									/>
								</LocalizationProvider>
							</Grid>
							<Grid sm={2} xs={12} item>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										fullWidth
										label={t('Expiration Date')}
										renderInput={(params) => (<TextField className="validation-cls" {...params} sx={{ width: '100%' }}
										/>)}
										inputFormat={'dd/MM/yyyy'}

									/>
								</LocalizationProvider>
							</Grid>
							<Grid sm={2} xs={12} item>
								<FormControl
									sx={{
										width: '100%'
									}}>
									<InputLabel id="select-label">Visa Status</InputLabel>
									<Select
										labelId="select-label"
										id="simple-select"
										label="Visa Status"
									>
										<MenuItem value={10}>Approved</MenuItem>
										<MenuItem value={20}>Cancelled</MenuItem>
										<MenuItem value={30}>Approved</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid sm={2} xs={12} item>
								<Button
									variant="containedSecondary"
									fullWidth
									size='large'
									sx={{ width: { xs: 150, sm: 112, lg: 120 } }}
									type='submit'
								>
									{t('Filter')}
								</Button>
							</Grid>
						</Grid>
					</Box>

					<TableContainer component={Paper} className='visatable'>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<StyledTableCell>Itinerary</StyledTableCell>
									<StyledTableCell>Int ref</StyledTableCell>
									<StyledTableCell>Travellers</StyledTableCell>
									<StyledTableCell>Lead passenger</StyledTableCell>
									<StyledTableCell>Request Date</StyledTableCell>
									<StyledTableCell>Request Expire Date</StyledTableCell>
									<StyledTableCell>Status</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<StyledTableRow
										key={row.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<StyledTableCell>{row.itinerary}</StyledTableCell >
										<StyledTableCell>{row.Intref}</StyledTableCell >
										<StyledTableCell>{row.travellers}</StyledTableCell >
										<StyledTableCell>{row.leadpassenger}</StyledTableCell >
										<StyledTableCell>{row.requestdate}</StyledTableCell >
										<StyledTableCell>{row.requestexpdate}</StyledTableCell >
										<StyledTableCell>{row.status}</StyledTableCell >
									</StyledTableRow >
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Container >
			</Box >
		</>
	);
}
