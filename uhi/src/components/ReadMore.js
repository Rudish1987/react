import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { t } from 'i18next';

const ReadMore = ({ size = 100, children }) => {
	const text = children;
	const [isMore, setIsMore] = useState(true)

	const toggleReadMore = () => {
		setIsMore(prevState => !prevState)
	}

	if (text.length <= size) {
		return text;
	}

	return (
		<>
			{isMore ? text.slice(0, size) + '...' : text}
			<Typography onClick={toggleReadMore} variant="caption" component="a" sx={{ cursor: 'pointer' }} color="primary">
				{isMore ? t(' show more') : t(' show less')}
			</Typography>
		</>
	)
};

export default ReadMore;
