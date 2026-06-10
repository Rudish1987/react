import React from 'react';
import { Box, Avatar, Skeleton, Grid } from '@mui/material';
import '../../css/SearchSkeleton.css';

export default function SummarySkeleton() {
	return (
		<Grid container className="detailsSection">
			<Grid item xs={8} className="summaryLeft">
				<Box className="marginTop">
					<Skeleton className="summaryTop" variant="rectangle">
					</Skeleton>
				</Box>
				<Box className="marginTop">
					<Skeleton className="rectangleskeleton-2" variant="rectangle">
						<Avatar />
					</Skeleton>
					<Skeleton className="summaryTop" variant="rectangle">
						<Avatar />
					</Skeleton>
				</Box>
				<Box className="marginTop">
					<Skeleton className="rectangleskeleton-3" variant="rectangle">
						<Avatar />
					</Skeleton>
					<Skeleton className="summaryTop" variant="rectangle">
					</Skeleton>
				</Box>
				<Box className="marginTop">
					<Skeleton className="rectangleskeleton-4" variant="rectangle">
						<Avatar />
					</Skeleton>
					<Skeleton className="rectangleskeleton-5" variant="rectangle">
						<Avatar />
					</Skeleton>
				</Box>
				<Box className="marginTop">
					<Skeleton className="rectangleskeleton-6" variant="rectangle">
						<Avatar />
					</Skeleton>
					<Skeleton className="rectangleskeleton-7" variant="rectangle">
						<Avatar />
					</Skeleton>
				</Box>
			</Grid>
			<Grid item xs={4}  className="packageSection">
				<Box className="marginTop">
					<Skeleton className="rectangleskeleton-8" variant="rectangle">
						<Avatar />
					</Skeleton>

				</Box>
				<Box className="marginTop">
					<Skeleton variant="circular" className="packageAvatar" />
				</Box>
			</Grid>
		</Grid >
	);
}