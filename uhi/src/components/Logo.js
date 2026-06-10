import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';

// material
import { Box } from '@mui/material';
// ----------------------------------------------------------------------

Logo.propTypes = {
	sx: PropTypes.object
};

export default function Logo({src='https://www.uhitravel.com/_laravel/public/ci/images/umrah/umrah-logo.png' }) {
	return (
		<Box component={RouterLink} to='/'>
			<img src={src} className="logo" alt="" height='50px' />
		</Box>
	);
}
