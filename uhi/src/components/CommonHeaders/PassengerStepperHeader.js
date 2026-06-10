import React from 'react';
import PropTypes from 'prop-types';

// material
import { Stack } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Constants from '../../helpers/constants'
import { useTranslation } from 'react-i18next';

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

function ColorlibStepIcon(props) {
	const { active, completed, className } = props;

	let icons = [
		<GroupIcon key={0} />,
		<PaymentIcon key={1} />,
		<ReceiptIcon key={2} />
	];

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			{icons[props.icon - 1]}
		</ColorlibStepIconRoot>
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


export const PassengerStepperHeader = ({ stepLevel }) => {
	const { t } = useTranslation();
	const stepPassenger = Constants.STEP_PASSENGER;
	const stepPayment = Constants.STEP_PAYMENT;
	const stepBookingDetail = Constants.STEP_BOOKING_DETAILS;
	let steps = [
		t(stepPassenger),
		t(stepPayment),
		t(stepBookingDetail)
	]

	//set step level from steps array
	const activeStep = steps.indexOf(stepLevel)

	return (
		<Stack sx={{ width: '40%', m: '20px auto' }} spacing={{ xs: 1, sm: 2, md: 2 }}>
			<Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
				{steps.map((label, i) => (
					<Step key={i}>
						<StyledStepLabel StepIconComponent={ColorlibStepIcon}>
							<StyledStepLabel StepIconComponent={QontoStepIcon} />
							{label}

						</StyledStepLabel>
					</Step>
				))}
			</Stepper>
		</Stack>
	)
}