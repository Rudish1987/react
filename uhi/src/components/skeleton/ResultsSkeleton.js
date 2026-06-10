import React from 'react';
import { Box, Avatar, Skeleton, Stack, Grid, Typography } from '@mui/material';
import '../../css/SearchSkeleton.css';
import DiamondIcon from '@mui/icons-material/Diamond';
import CollectionsIcon from '@mui/icons-material/Collections';


export default function ResultsSkeleton() {

	return (

		<Grid className="resultsbg" container>
			<Grid item xs={12} sm={4}>
				<Box>
					<Typography variant="h4">
						<Skeleton className="results-rect-1" variant="rectangle">
							<Avatar />
						</Skeleton>
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={12} sm className="resultSelectsec">
				<Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
					<Skeleton className="results-rect-2" variant="rectangle">
						<Avatar />
					</Skeleton>
					<Skeleton className="results-rect-3" variant="rectangle">
						<Avatar />
					</Skeleton>

				</Stack>
			</Grid>
			<Grid item xs={12}>
				<Box className="resultRowsec">
					<Grid item container sm spacing={2} xs={12}>
						<Grid item container direction="column" xs={3}>
							<Grid item xs>
								<Skeleton className="results-img" variant="rectangle">
									<Avatar />
								</Skeleton>
							</Grid>
							<Grid item container className="resultsinner-img">
								<Grid item xs={1}>
									<DiamondIcon className="diamondIcon" />
								</Grid>
								<Grid item xs={2}>
									<Skeleton className="results-rect-4" variant="rectangle">
										<Avatar />
									</Skeleton>
								</Grid>
							</Grid>
							<Grid item container className="resultinner-img">
								<Grid item xs={1}>
									<CollectionsIcon className="diamondIcon" />
								</Grid>
								<Grid item xs={2}>
									<Skeleton className="results-rect-4" variant="rectangle">
										<Avatar />
									</Skeleton>
								</Grid>
							</Grid>
						</Grid>
						<Grid item container sm direction="column" spacing={2} xs={6}>
							<Grid item xs sm container>
								<Grid item container xs>
									<Grid item xs container direction="row" wrap='nowrap'>
										<Typography gutterBottom variant="h6" component="div">
											<Skeleton className="results-rect-5" variant="rectangle">
												<Avatar />
											</Skeleton>
										</Typography>
									</Grid>
									<Grid item xs>
										<Skeleton className="results-rect-6" variant="rectangle">
											<Avatar />
										</Skeleton>
									</Grid>
								</Grid>


								<Grid item container xs>
									<Grid item xs >
										<Typography variant="body2" component="div">
											<Skeleton className="results-rect-7" variant="rectangle">
												<Avatar />
											</Skeleton>
										</Typography>
									</Grid>
									<Grid item xs >
										<Typography variant="h4" component="div">
											<Skeleton className="results-rect-8" variant="rectangle">
												<Avatar />
											</Skeleton>
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs wrap='nowrap' sm container direction="column">
								<Skeleton className="resultsRow" variant="rectangle">
								</Skeleton>
								<Grid container spacing={2} className="resultsRow-inner">
									<Grid item xs={3}>
										<Skeleton className="results-rect-9" variant="rectangle">
										</Skeleton>
										<Skeleton className="results-rect-10" variant="rectangle">											</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="results-rect-11" variant="rectangle">
										</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="results-rect-12" variant="rectangle">
										</Skeleton>
										<Skeleton className="results-rect-13" variant="rectangle">
										</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="selectButton" variant="rectangle">
										</Skeleton>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs wrap='nowrap' sm container direction="column">
								<Skeleton className="resultsRow" variant="rectangle">
								</Skeleton>
								<Grid container spacing={2} className="resultsRow-inner">
									<Grid item xs={3}>
										<Skeleton className="results-rect-9" variant="rectangle">
										</Skeleton>
										<Skeleton className="results-rect-10" variant="rectangle">											</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="results-rect-11" variant="rectangle">
										</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="results-rect-12" variant="rectangle">
										</Skeleton>
										<Skeleton className="results-rect-13" variant="rectangle">
										</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="selectButton" variant="rectangle">
										</Skeleton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>

					</Grid>
				</Box>
			</Grid>


			<Grid item xs={12}>
				<Box className="resultRowsec marginTop-30">
					<Grid item container sm spacing={2} xs={12}>
						<Grid item container direction="column" xs={3}>
							<Grid item xs>
								<Skeleton className="results-img" variant="rectangle">
									<Avatar />
								</Skeleton>
							</Grid>
							<Grid item container className="resultsinner-img">
								<Grid item xs={1}>
									<DiamondIcon className="diamondIcon" />
								</Grid>
								<Grid item xs={2}>
									<Skeleton className="results-rect-4" variant="rectangle">
										<Avatar />
									</Skeleton>
								</Grid>
							</Grid>
							<Grid item container className="resultinner-img">
								<Grid item xs={1}>
									<CollectionsIcon className="diamondIcon" />
								</Grid>
								<Grid item xs={2}>
									<Skeleton className="results-rect-4" variant="rectangle">
										<Avatar />
									</Skeleton>
								</Grid>
							</Grid>
						</Grid>
						<Grid item container sm direction="column" spacing={2} xs={6}>
							<Grid item xs sm container>
								<Grid item container xs>
									<Grid item xs container direction="row" wrap='nowrap'>
										<Typography gutterBottom variant="h6" component="div">
											<Skeleton className="results-rect-5" variant="rectangle">
												<Avatar />
											</Skeleton>
										</Typography>
									</Grid>
									<Grid item xs>
										<Skeleton className="results-rect-6" variant="rectangle">
											<Avatar />
										</Skeleton>
									</Grid>
								</Grid>
								<Grid item container xs>
									<Grid item xs >
										<Typography variant="body2" component="div">
											<Skeleton className="results-rect-7" variant="rectangle">
												<Avatar />
											</Skeleton>
										</Typography>
									</Grid>
									<Grid item xs >
										<Typography variant="h4" component="div">
											<Skeleton className="results-rect-8" variant="rectangle">
												<Avatar />
											</Skeleton>
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs wrap='nowrap' sm container direction="column">
								<Skeleton className="resultsRow" variant="rectangle">
								</Skeleton>
								<Grid container spacing={2} className="resultsRow-inner">
									<Grid item xs={3}>
										<Skeleton className="results-rect-9" variant="rectangle">
										</Skeleton>
										<Skeleton className="results-rect-10" variant="rectangle">											</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="results-rect-11" variant="rectangle">
										</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="results-rect-12" variant="rectangle">
										</Skeleton>
										<Skeleton className="results-rect-13" variant="rectangle">
										</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="selectButton" variant="rectangle">
										</Skeleton>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs wrap='nowrap' sm container direction="column">
								<Skeleton className="resultsRow" variant="rectangle">
								</Skeleton>
								<Grid container spacing={2} className="resultsRow-inner">
									<Grid item xs={3}>
										<Skeleton className="results-rect-9" variant="rectangle">
										</Skeleton>
										<Skeleton className="results-rect-10" variant="rectangle">											</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="results-rect-11" variant="rectangle">
										</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="results-rect-12" variant="rectangle">
										</Skeleton>
										<Skeleton className="results-rect-13" variant="rectangle">
										</Skeleton>
									</Grid>
									<Grid item xs={3}>
										<Skeleton className="selectButton" variant="rectangle">
										</Skeleton>
									</Grid>
								</Grid>
							</Grid>
						</Grid>

					</Grid>
				</Box>
			</Grid>
		</Grid>

	);
}