import React from 'react';
import PropTypes from 'prop-types';
import { useStoreState } from 'easy-peasy'

// material
import { Stack } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
//import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import GroundServicesSVG from '../../Assets/GroundServicesSVG'

import Constants from '../../helpers/constants';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useLocale } from '../../context/LocaleContext';


const QontoStepIconRoot = styled('div')(({ ownerState }) => ({
	display: 'flex',
	// height: 22,
	alignItems: 'center',
	...(ownerState.active && {
		color: '#00B760',
	}),
	'& .QontoStepIcon-completedIcon': {
		color: '#00B760',
		zIndex: 1,
		fontSize: 18,
	},
	'& .QontoStepIcon-circle': {
		width: 8,
		height: 8,
		borderRadius: '50%',
	},
}));

function QontoStepIcon(props) {
	const { active, completed, className } = props;

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<CheckCircleOutlineIcon sx={{ position: 'absolute', left: '55.33%', top: '-5.67%', 'background': '#f4f6f8', borderRadius: '10px' }} className="QontoStepIcon-completedIcon" />
			) : (
				<div className="QontoStepIcon-circle" />
			)}
		</QontoStepIconRoot>
	);
}

QontoStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(() => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			border: 'none',
			borderRadius: 1,
			borderTop: '2px solid #BDBDBD',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			border: 'none',
			borderRadius: 1,
			borderTop: '2px solid #BDBDBD',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		border: 'none',
		borderRadius: 1,
		borderTop: '2px solid #BDBDBD',
	},
}));

const ColorlibStepIconRoot = styled('div')(({ ownerState }) => ({
	backgroundColor: '#FFFFFF',
	zIndex: 1,
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	color: '#BDBDBD',
	alignItems: 'center',
	border: '2px solid #BDBDBD',
	...(ownerState.active && {
		border: '2px solid #00B760',
		color: '#00B760'
	}),
	...(ownerState.completed && {
		border: '2px solid #00B760',
		color: '#00B760'
	}),

}));

const ColorlibStepIconRootError = styled('div')(({ ownerState }) => ({
	backgroundColor: '#FFFFFF',
	zIndex: 1,
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	color: '#BDBDBD',
	alignItems: 'center',
	border: '2px solid #BDBDBD',
	...(ownerState.completed && {
		border: '2px solid #b70d1e',
		color: '#b70d1e'
	}),

}));

function ColorlibStepIcon(props) {
	const { active, completed, className } = props;

	const nightStayInMadinah = useStoreState(actions => actions.btoc.filters.nightStayInMadinah);

	let icons = [
		<HotelIcon key={0} />,
		<HotelIcon key={1} />,
		<AirportShuttleIcon key={2} />,
		<GroundServicesSVG key={3} width={24} height={24} />,
		<ListAltIcon key={4} />,
	];

	if (nightStayInMadinah == 0) {
		//remove from icon list
		icons = icons.filter((v, i) => {
			if (i !== 1)
				return v
		})
	}

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			{icons[props.icon - 1]}
		</ColorlibStepIconRoot>
	);
}

function ColorlibStepIconError(props) {
	const { active, completed, className } = props;

	const nightStayInMadinah = useStoreState(actions => actions.btoc.filters.nightStayInMadinah);

	let icons = [
		<HotelIcon key={0} />,
		<HotelIcon key={1} />,
		<AirportShuttleIcon key={2} />,
		<GroundServicesSVG key={3} width={24} height={24} />,
		<ListAltIcon key={4} />,
	];

	if (nightStayInMadinah == 0) {
		//remove from icon list
		icons = icons.filter((v, i) => {
			if (i !== 1)
				return v
		})
	}

	return (
		<ColorlibStepIconRootError ownerState={{ completed, active }} className={className}>
			{icons[props.icon - 1]}
		</ColorlibStepIconRootError>
	);
}


ColorlibStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
	/**
	 * The label displayed in the step icon.
	 */
	icon: PropTypes.node,
};
ColorlibStepIconError.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
	/**
	 * The label displayed in the step icon.
	 */
	icon: PropTypes.node,
};


const StyledStepLabel = styled(StepLabel)({
	'& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
		fontSize: 12,
		fontWeight: 500,
		color: '#9E9E9E'
	},
	'& .MuiStepLabel-label.Mui-disabled': {
		marginTop:0
	},
	'& .MuiStepLabel-label.Mui-completed': {
		color: '#00B760',
		marginTop:8
	},
	'& .MuiStepLabel-label.Mui-active': {
		color: '#00B760',
		marginTop:0
	}
});
const StyledStepLabelError = styled(StepLabel)({

	'& .MuiStepLabel-label.Mui-completed': {
		fontSize: 12,
		fontWeight: 500,
		color: '#b7230f',
		marginTop:8
	},
});


export const StepperHeader = ({ stepLevel ,rebook =false}) => {
	const { t } = useTranslation();
	const failedItineraryDetails = useStoreState(s => s.btoc.failedItineraryDetails)
	const nightStayInMadinah = useStoreState(actions => actions.btoc.filters.nightStayInMadinah);
	const transConfirmation = Constants.STEP_CONFIRMATION;
	const transMakkah = Constants.STEP_TEXT_MAKKAH;
	const transTransport = Constants.STEP_TEXT_TRANSPORTATION;
	const transGroundservices = Constants.STEP_TEXT_GROUNDSERVICES;

	let steps = [
		t(transMakkah),
		t(Constants.STEP_TEXT_MADINAH),
		t(transTransport),
		t(transGroundservices),
		t(transConfirmation)
	]
	let bookedSteps = [
		transMakkah,
		Constants.STEP_TEXT_MADINAH,
		transTransport,
		transGroundservices,
		transConfirmation
	]

	if (nightStayInMadinah == 0) {
		steps = steps.filter(step => step !== t(Constants.STEP_TEXT_MADINAH))
	}
	//set step level from steps array
	const activeStep = rebook == true ? Constants.STEP_DEFAULT : steps.indexOf(stepLevel)

	const isStepFailed = (label) => {
		if (failedItineraryDetails.length > 0 && failedItineraryDetails.indexOf(label) > -1) {
			return true
		}
	};

	const { locale } = useLocale();
	const themeDataGrid = React.useMemo(() => locale.value === 'ar' ? (createTheme({direction: 'rtl'})) : (createTheme({direction: 'ltr'})));

	const cacheRtl = createCache({
		key: 'muirtl',
		stylisPlugins: [prefixer, rtlPlugin],
	});
	const cacheLtr = createCache({
		key: 'mui',
	});

	return (
		<CacheProvider value={locale.value === 'ar' ? cacheRtl : cacheLtr}>
			<ThemeProvider theme={themeDataGrid}>
				<Stack sx={{width: '60%', m: '20px auto'}} spacing={{xs: 1, sm: 2, md: 2}}>
					<Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
						{steps.map((label, i) => {
							if (isStepFailed(bookedSteps[i]) && rebook ==true) {
								return (<Step key={i}>
									<StyledStepLabelError  StepIconComponent={ColorlibStepIconError}>
										{label}
									</StyledStepLabelError>

								</Step>)
							}else{
								return (<Step key={i}>
									<StyledStepLabel  StepIconComponent={ColorlibStepIcon}>
										<StyledStepLabel  StepIconComponent={QontoStepIcon}/>
										{label}
									</StyledStepLabel>

								</Step>)

							}

						})}
					</Stepper>
				</Stack>
			</ThemeProvider>
		</CacheProvider>
	)
}