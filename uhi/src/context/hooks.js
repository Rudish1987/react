import { createSearchParams, useNavigate } from 'react-router-dom';

export const useNavigateSearch = () => {
	const navigate = useNavigate();
	return (pathname, params = {}, state = {}) =>
		navigate({
			pathname,
			search: params ? `?${createSearchParams(params)}` : {},
			state: state ?? {}
		});
};