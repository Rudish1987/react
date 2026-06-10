import React from 'react';
import { Stack, Typography, Grid, Box } from '@mui/material';
import { FormatNumber } from '../../../../helpers/utils';
import { t } from 'i18next';

const CancellationPolicies = ({ cancellationRules, type, currency }) => {
	const buildPolicyText = (data) => {
		let result = [];
		for (let i = 0; i < data.length; i++) {
			result.push(
				<Grid
					key={i}
					item
					sx={{ pb: 1, pt: 1, pl: 0.25, pr: 0.25, ml: 2, mr: 2, width: '100%' }}
				>
					<Stack spacing={2} sx={{ borderBottom: '2px solid #E0E0E0' }}>
						<Typography variant='caption' component='div'>
							{data[i].header}
						</Typography>
					</Stack>
					<Box
						sx={{
							mt: 1,
							p: 1,
							borderRadius: '4px',
							backgroundColor: data[i].boxColor,
						}}
					>
						<Typography
							variant='caption'
							component='div'
							sx={{ color: data[i].policyTextColor }}
						>
							{data[i].policyText}
						</Typography>
					</Box>
				</Grid>
			);
		}

		return result;
	};
	let content;
	if (type === 'within') {
		content = buildPolicyText([
			{
				header: t('The following charges will be applied'),
				policyText: t('Cancellation Restricted'),
				policyTextColor: '#721c24',
				boxColor: '#f5c6cb',
			},
		]);
	}
	if (type === 'flexible') {
		let configArray = [];
		const rules =
			cancellationRules['@attributes'].count > 1
				? cancellationRules.rule
				: [cancellationRules.rule];
		for (let i = 0; i < rules.length; i++) {
			let toDateDetails = Object.prototype.hasOwnProperty.call(
				rules[i],
				'toDateDetails'
			);
			let fromDateDetails = Object.prototype.hasOwnProperty.call(
				rules[i],
				'fromDateDetails'
			);
			let boxColor =
				rules[i].cancelCharge === '0'
					? '#c3e6cb'
					: (theme) => theme.palette.common.white;
			let policyTextColor =
				rules[i].cancelCharge === '0'
					? '#155724'
					: (theme) => theme.palette.common.black;

			if (toDateDetails && !fromDateDetails) {
				configArray.push({
					header: `Before ${rules[i].toDateDetails}`,
					policyText:
						rules[i].cancelCharge === '0'
							? 'No Cancellation Charge'
							: `Cancellation Charge: ${currency} ${FormatNumber(
								rules[i].cancelCharge,
								2
							)}`,
					policyTextColor: policyTextColor,
					boxColor: boxColor,
				});
			} else if (!toDateDetails && fromDateDetails) {
				configArray.push({
					header: `After ${rules[i].fromDateDetails}`,
					policyText:
						rules[i].cancelCharge === '0'
							? 'No Cancellation Charge'
							: `Cancellation Charge: ${currency} ${FormatNumber(
								rules[i].cancelCharge,
								2
							)}`,
					policyTextColor: policyTextColor,
					boxColor: boxColor,
				});
			} else if (toDateDetails && fromDateDetails) {
				configArray.push({
					header: `Between ${rules[i].fromDateDetails} and ${rules[i].toDateDetails}`,
					policyText:
						rules[i].cancelCharge === '0'
							? 'No Cancellation Charge'
							: `Cancellation Charge: ${currency} ${FormatNumber(
								rules[i].cancelCharge,
								2
							)}`,
					policyTextColor: policyTextColor,
					boxColor: boxColor,
				});
			}
		}
		content = buildPolicyText(configArray);
	}
	return (
		<Grid container item direction='row'>
			{content}
		</Grid>
	);
};

export default CancellationPolicies;
