import React, {useEffect, useState} from 'react';
// components
import StaticContent from '../components/StaticContent';
import {useLocale} from '../context/LocaleContext';
import {ourStory} from '../api/StaticContentApi';

// ----------------------------------------------------------------------

export default function OurStory() {
	const {locale} = useLocale();
	const [allData, setallData] = useState('');
	
	//get content
	useEffect(()=>{
		ourStory().then((res) =>{
			setallData(res)
		});
	},[])

	return (
		<StaticContent data={allData[locale.value]} pageTitle='Our Story'></StaticContent>
	);
}
