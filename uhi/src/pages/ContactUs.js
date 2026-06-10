import React, {useEffect, useState} from 'react';
// components
import StaticContent from '../components/StaticContent';
import {useLocale} from '../context/LocaleContext';
import {contactUs} from '../api/StaticContentApi';

// ----------------------------------------------------------------------

export default function AboutUs() {

	const {locale} = useLocale();
	const [allData, setallData] = useState('');

	//get content
	useEffect(()=>{
		let isMounted = true;
		contactUs().then((res) =>{
			if(isMounted) {
				setallData(res)
			}
		});
		return () => {
			isMounted = false;
		}
	},[])

	return (
		<StaticContent data={allData[locale.value]} pageTitle='Contact Us'></StaticContent>
	);
}
