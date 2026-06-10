import React from 'react';
import { Box, Container } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import Footer from '../../components/whiteLabel/includes/Footer'
import { styled } from '@mui/material/styles';

const FooterWl = () => {
	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)
	const WlFooter = styled(Box)(() => ({
		backgroundColor:layoutDetails.details.colors.FooterColor,
		marginTop:5,
	}));
	return(
		<>
			<WlFooter>
				<Container className="footer body-container-margin paddingTop80" >
					<Footer />
				</Container>
			</WlFooter>
		</>
	);
}
export default FooterWl;