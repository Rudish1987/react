import React from 'react';

// material
import { Paper, Grid, Typography } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import DisplayPrice from '../../../DisplayPrice';
import DisplayNameDetails from '../../../DisplayNameDetails';
import RateType from '../../../../components/common/RateType';
import SelectButton from '../../../SelectButton';
import { useTranslation } from 'react-i18next';
import Constants from '../../../../helpers/constants';
import { scrollToTop } from '../../../../helpers/utils'
import { useLocale } from '../../../../context/LocaleContext';
import { useTheme } from '@mui/material/styles';


const TransferResultsRow = ({ transfer, currency, onBookClick, disableSelect }) => {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const theme = useTheme();
	const transferId = transfer['@attributes'].runno;
	const handleBookClick = (parameters) => {
		scrollToTop()
		onBookClick({ ...parameters, transfer: transfer });
	};

	const requests = useStoreState(s => s.btoc.requests)

	return (
		<Grid item sm xs={12}>
			<Paper elevation={0}
				sx={{
					p: 2,
					marginBottom: 1,
					flexGrow: 1,
					backgroundColor: '#ededed',
					alignItems: 'center center',
				}}
			>
				<Grid item xs sm container direction="row" spacing={1} alignItems="center" justifyContent="space-between">
					<Grid item container direction='column' xs={2}>
						<DisplayNameDetails displayName={t('Model') +' '+ transfer.name + '-' + transfer.vehicleTypeTextual} generalDetails={t('Max Capacity') + ' : ' + transfer.paxCapacity} />
					</Grid>
					<Grid item xs={2} >
						<RateType rateBases={transfer} currency={currency} />
					</Grid>
					<Grid item container direction='column' xs={2}>
						<Typography sx={{fontSize: theme.typography.body2, fontWeight: theme.typography.fontWeightRegular, color: theme.palette.grey[800]}} component="div">
							{t('Vehicles')}
						</Typography>
						<Typography variant="body2" component="span"><DirectionsCarIcon />
							<Typography sx={{
								position: 'relative',
								top: '-6px',
								left: '17px'
							}} variant="body2" component="span">{transfer.requireVehicle}</Typography>
						</Typography>
					</Grid>
					<Grid item container direction='column' xs={2}>
						<Typography sx={{fontSize: theme.typography.body2, fontWeight: theme.typography.fontWeightRegular, color: theme.palette.grey[800]}} component="div">
							{t('Total Pax')}
						</Typography>
						<Typography variant="body2" component="span"><PersonIcon />
							<Typography sx={{
								position: 'relative',
								top: '-6px',
								left: '17px'
							}} variant="body2" component="span">{requests.transfer.adultsCount}</Typography>
						</Typography>
					</Grid>
					<Grid item xs={2} container direction="row" alignItems="center" justifyContent="flex-end">
						{locale.value === Constants.LANGUAGES_EN &&
							<Grid item container direction='column' xs align="right">
								{transfer.packageTotal > 0 && <DisplayPrice currency={currency} price={Number(transfer.packageTotal).toFixed(2)} priceText={'Inclusive of Taxes'} />}
							</Grid>
						}
						{locale.value === Constants.LANGUAGES_AR &&
							<Grid item container direction='column' xs className="content-display">
								{transfer.packageTotal > 0 && <DisplayPrice currency={currency} price={Number(transfer.packageTotal).toFixed(2)} priceText={'Inclusive of Taxes'} />}
							</Grid>
						}
					</Grid>
					<Grid item xs={2} container direction="row" alignItems="center" justifyContent="flex-end">
						<SelectButton disableSelect={disableSelect} handleFunction={() => handleBookClick({ transferId: transferId })} />
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default TransferResultsRow;
