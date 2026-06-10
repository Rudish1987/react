import React from 'react';
import { Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export default function StaticContentPageSkeleton() {
	return (
		<Container maxWidth='xl' >
			<Skeleton animation="wave" variant="rectangular" sx={{
				p: 2,
				minHeight: 400,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				mb: 2
			}} />
			<Skeleton animation="wave" variant="rectangular" sx={{
				minHeight: 300,
				mb: 2,
				px: 5,
				py: 3
			}} />
			<Skeleton animation="wave" variant="rectangular" sx={{
				minHeight: 200,
				mb: 2,
				px: 5,
				py: 3
			}} />
		</Container>
	)
}