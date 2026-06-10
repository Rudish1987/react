import React from 'react';
import { Box, Container } from '@mui/material';
import FooterforInnerPage from '../../components/b2b/includes/FooterforInnerpage'

const FooterBtoB = () => {
	const containerRef = React.useRef(null);
	return(
		<Box className="footerSections box-body-flex">
			<Container className="footer body-container-margin" ref={containerRef}>
				<FooterforInnerPage />
			</Container>
		</Box>
	);
}
export default FooterBtoB;