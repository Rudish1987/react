import React, { useEffect, useState } from 'react';

function withFetch(WrappedComponent,requestConfig) {
	const defaultHeaders = {
		'Content-type'	: 'application/json',
		'Accept'        : 'application/json',
	}
	const WithFetch = (props) => {
		const {url:requestUrl} = requestConfig;
		const [data, setData] = useState({});
		const [isLoading, setIsLoading] = useState(null);
		const [isError, setIsError] = useState(false);
		useEffect(() => {
			if (requestUrl) fetchData(requestConfig);
		}, [requestUrl]);
		const fetchData = async (requestConfig) => {
			setIsLoading(true);
			setIsError(false);
			try {
				const response = await fetch(requestConfig.url,
					{
						method: requestConfig.method || 'GET',
						headers: {...defaultHeaders,...requestConfig.headers},
						body: requestConfig.body && JSON.stringify(requestConfig.body),
					});
				if (response.ok) {
					const data = await response.json();
					setIsLoading(false);
					setData(data);
				} else {
					throw new Error('Fetch request error');
				}
			} catch (err) {
				setIsLoading(false);
				setIsError(err);
			}
		};
		return (
			<WrappedComponent
				data={data}
				isLoading={isLoading}
				isError={isError}
				{...props}
				getData={(requestUrl) => fetchData(requestUrl)}
			/>
		);
	};
	return WithFetch;
}
export default withFetch;