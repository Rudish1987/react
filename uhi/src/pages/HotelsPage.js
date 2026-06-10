import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Box, Container, Stack, Typography } from '@mui/material';

import Page from '../components/Page';
import ProductTabs from '../components/ProductTabs';

import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Paper from '@mui/material/Paper';
import { MHidden } from '../components/@material-extend';
import { TabContext, TabPanel } from '@mui/lab';

const maqamItems = [
	{
		label: 'Instant BRN',
		icon: <HotelIcon />,
		value1: 'instant-brn',
		value: 'a'
	},
	{
		label: 'Hotels',
		icon: <HotelIcon />,
		value1: 'maqam-hotels',
		value: 'b',
	},
	{
		label: 'Transportation',
		icon: <DirectionsBusIcon />,
		value1: 'transportation',
		value: 'c'
	},
];

const nonMaqamItems = [
	{
		label: 'Hotels',
		icon: <HotelIcon />,
		value1: 'hotels',
		value: 'd'
	},
	{
		label: 'Activities',
		icon: <HotelIcon />,
		value1: 'activities',
		value: 'e'
	},
	{
		label: 'Transportation',
		icon: <DirectionsBusIcon />,
		value1: 'transportation',
		value: 'f'
	},
	{
		label: 'Packages',
		icon: <DirectionsBusIcon />,
		value1: 'packages',
		value: 'g'
	},
	{
		label: 'Itinerary Builder',
		icon: <DirectionsBusIcon />,
		value1: 'itinerary-builder',
		value: 'h'
	},
];

const HotelsPage = ({t}) => {
	const [value, setValue] = useState('b');

	const handleOnChange = (event, newValue) => {
		setValue(newValue);
	}

	return (
		<Page title={t('title')}>
			<Paper elevation={3}>
				<Container maxWidth='xl'>
					<TabContext value={value}>
						<Box pt={4} px={2}>
							<Typography component="h5" variant="h5" gutterBottom pb={2}>{t('formHeader')}</Typography>
						</Box>
						<MHidden width="smUp">
							<Box mx={-2}>
								<ProductTabs value={value} onChange={handleOnChange} items={maqamItems.concat(nonMaqamItems)} scroll />
							</Box>
						</MHidden>
						<MHidden width="smDown">
							<Stack display='flex' justifyContent="space-between" direction="row">
								<ProductTabs value={value} onChange={handleOnChange} items={maqamItems} scroll={false} />
								<ProductTabs value={value} onChange={handleOnChange} items={nonMaqamItems} scroll={false} />
							</Stack>
						</MHidden>
						<Box pt={4} sx={{ border: 1 }}>
							{maqamItems.concat(nonMaqamItems).map(item => (
								<TabPanel key={item.value} value={item.value}>
									{item.value}
								</TabPanel>
							))}
						</Box>
					</TabContext>
				</Container>
			</Paper>
		</Page>
	);
}

export default withTranslation('hotel_page')(HotelsPage);
