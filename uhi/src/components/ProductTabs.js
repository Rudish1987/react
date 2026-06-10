import React from 'react';
import { styled } from '@mui/material/styles';
import { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';

const StyledTabs = styled((props) => (
	<TabList
		{...props}
		TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
	/>
))(({ theme }) => ({
	marginBottom: theme.spacing(2),
	'& .MuiTabs-indicator': {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	'& .MuiTabs-indicatorSpan': {
		display: 'none'
	},
	[`& .${tabsClasses.scrollButtons}`]: {
		'&.Mui-disabled': { opacity: 0.3 },
	},
}));

const StyledTab = styled((props) => <Tab {...props} />)(
	({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
		textTransform: 'none',
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(12),
		padding: theme.spacing(0.5),
		border: '1.5px solid',
		borderColor: theme.palette.grey[300],
		minWidth: 100,
		'&:first-of-type': {
			borderBottomLeftRadius: theme.shape.borderRadius,
			borderTopLeftRadius: theme.shape.borderRadius,
		},
		'&:last-of-type': {
			borderBottomRightRadius: theme.shape.borderRadius,
			borderTopRightRadius: theme.shape.borderRadius,
		},
		'&.Mui-selected': {
			borderColor: 'red',
			borderLeft: '1.5px solid',
			backgroundColor: theme.palette.grey[200]
		},
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(1),
			border: 'none',
			minWidth: 100,
			'&.Mui-selected': {
				border: 'none',
				backgroundColor: 'inherit',
				fontWeight: theme.typography.fontWeightBold
			}
		}
	}),
);

const ProductTabs = ({ items, onChange, scroll = false }) => {
	const scrollProps = scroll ? {
		variant: 'scrollable',
		scrollButtons: 'auto',
		allowScrollButtonsMobile: true
	} : {}

	return (
		<StyledTabs
			onChange={onChange}
			aria-label="styled tabs example"
			{...scrollProps}
		>
			{items.map(item => (<StyledTab key={item.label} label={item.label} icon={item.icon} value={item.value} />))}
		</StyledTabs>
	);
}

export default ProductTabs;
