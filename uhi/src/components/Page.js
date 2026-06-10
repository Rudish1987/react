import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import React, { forwardRef, useEffect } from 'react';
// material
import { Box } from '@mui/material';

import {useStoreState, useStoreActions} from 'easy-peasy';
import { SnackBarAlert } from './common/SnackBarAlert'


// ----------------------------------------------------------------------
/* eslint-disable react/display-name */
const Page = forwardRef(({ children, title = '', meta = '', ...other }, ref) => {

	const errorExceptipons = useStoreState(actions => actions.btoc.errorExceptipons);
	const setErrorExceptipons = useStoreActions(actions => actions.btoc.setErrorExceptipons);

	const [snackAlert,setSnackAlert] = React.useState({'message' : 'Warning' , show : false, type : 'warning' });

	useEffect(() => {
		
		if( Object.keys(errorExceptipons).length > 0){
			if( errorExceptipons.message ){
				setSnackAlert({'message' : errorExceptipons.message , show : true, type : 'error' });
				setErrorExceptipons({})
			}
		}
	}, [errorExceptipons])

	return (
		<Box sx={{ p: 0 }} ref={ref} {...other}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{meta}
			{children}
			<SnackBarAlert {...snackAlert} resetSnackAlert={setSnackAlert}></SnackBarAlert>
		</Box>
	)
});

Page.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string
};

export default Page;
