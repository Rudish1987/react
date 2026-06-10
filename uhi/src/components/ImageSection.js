import React from 'react';
import { Box, Grid, AvatarGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

const ImageSection = ({ images, width, height, max }) => {
	const imagesArray = Array.isArray(images) ? images : [images];
	const imagesList = imagesArray.slice(0, max);

	const thumb = styled('img')({
		margin: 'auto',
		display: 'block',
		maxWidth: '50%',
		maxHeight: '50%',
		borderRadius: '50%',
	});

	return (
		<Grid item xs>
			<AvatarGroup total={imagesArray.length} sx={{ width: `${width}px`, height: `${height}px`, cursor: 'pointer' }} onClick={() => alert('clicked on image gallery')}>
				{imagesList.map((image,idx) => (
					<Box key={`image_${idx}`} component={thumb} src={image.url.__cdata} alt={image.alt} onError={({ currentTarget }) => {
						currentTarget.onerror = null; // prevents looping
						currentTarget.src='/static/images/No-Image-found.png';
					}}/>
				))}
			</AvatarGroup>
		</Grid>
	);
};

export default ImageSection;