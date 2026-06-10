import * as React from 'react';
import { Grid, Typography, Stack, Container, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export default function BtobStaticContent({ pageContent }) {
	const theme = useTheme();
	const { t } = useTranslation();
	const BannerSection = styled('div')(({ theme }) => ({
		backgroundImage: `url(${pageContent.image})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		minHeight: '298px',
		color: theme.palette.grey[0],
		position: 'relative'
	}));

	return (
		<Box>
			<Container>
				<Grid container gap='48px' paddingTop={'32px'}>
					<Grid item xs={12} sm={12} md={12} lg={12} >
						<BannerSection>
							<Grid container position='absolute' top='177px' left='46px' right='46px'>
								<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
									<Typography variant='h6'>{t(pageContent.bannerTitle)}</Typography>
								</Grid>
							</Grid>
						</BannerSection>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={12} color={theme.palette.grey[800]}>
						<Grid>
							<Stack className="contactusTable" color={'grey.900'} dangerouslySetInnerHTML={{ __html: pageContent.content }}></Stack>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}