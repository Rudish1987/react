import React, { createContext, useContext, useEffect, useState } from 'react';
import { getWhitelabelCustomeTheme } from '../api/whiteLabel/WhitelabelCustomTheme'
import LandingSkeleton from '../components/skeleton/LandingSkeleton';
import { useStoreActions } from 'easy-peasy';

const DomainContext = createContext(); // by default UHI user & theme

export const useDomain = () => {
	return useContext(DomainContext)
}

const DomainProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [port, setPort] = useState(0);
	const [domainName, setDomainName] = useState(0);
	
	const setIsWhiteLabel = useStoreActions(action => action.whitelabel.setIsWhiteLabel)
	const setLayoutDetails = useStoreActions(action => action.whitelabel.setLayoutDetails)

	useEffect(() => {
		let fetchData = async (hostname) => {
			let domainNameText = hostname;
			if(hostname == 'localhost' || hostname == 'qa3-umrahholidays.stage.aws.dotw.com') {
				domainNameText = 'whitelabel.umrah-suppliers.stage.aws.dotw.com'; // default for testing
			}
			setDomainName(domainNameText)
			let response = await getWhitelabelCustomeTheme(domainNameText);
			if(response.status) {
				setIsLoading(true)
				setLayoutDetails(response.data)
				
				// update FavIcon
				let link = document.querySelector('link[rel~=\'icon\']');
				if(response.data.favIcon !== undefined || response.data.favIcon !== '') {
					link.href = response.data.favIcon
				}
			}
		}

		//check domain, testing purpose checking port
		let checkDomain = () => {
			let hostname = window.location.hostname;
			let currentPort = window.location.port;
			setPort(window.location.port);
			
			if (hostname == 'localhost') {
				if(parseInt(currentPort) !== 3000) {
					setIsWhiteLabel(true)
					fetchData(hostname)
				} else {
					setIsWhiteLabel(false)
					setIsLoading(true)
				}
			} /*else if(hostname == 'qa3-umrahholidays.stage.aws.dotw.com') {
				setIsWhiteLabel(true)
				fetchData(hostname)
			} */ else {
				setIsWhiteLabel(false)
				setIsLoading(true)
			}
		}

		checkDomain();
	}, []);

	return isLoading ? (
		<DomainContext.Provider value={{port, domainName}}>
			{children}
		</DomainContext.Provider>
	) : (<LandingSkeleton></LandingSkeleton>);
}

export default DomainProvider;
