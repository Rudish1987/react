import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export default function AdditionalTags() {
	return (
		<Helmet>
			<meta name="DC.title" content="Makkah hotels, Umrah hotel deals, Umrah hotel deals"/>
			<meta name="geo.region" content="AE-UQ"/>
			<meta name="geo.position" content="25.093525;55.151572"/>
			<meta name="ICBM" content="25.093525, 55.151572"/>
			<meta name="DC.title" content="Discounted Rates in Saudi Arabia, Saudi Hotel Distribution, Madinah Ziyarat"/>
			<meta name="geo.region" content="SA"/>
			<meta name="geo.placename" content="Medina"/>
			<meta name="geo.position" content="24.471153;39.611122"/>
			<meta name="ICBM" content="24.471153, 39.611122"/>
			<meta name="geo.region" content="EG"/>
			<meta name="geo.placename" content="Cairo"/>
			<meta name="geo.position" content="30.044388;31.235726"/>
			<meta name="ICBM" content="30.044388, 31.235726"/>
			<meta name="classification" content="UmrahHolidays International"/>
			<meta name="search engines" content="Google, Googlebot, Bing"/>
			<link rel="pingback" href="https://www.uhitravel.com/sitemap.xml"/>
			<meta name="rating" content="General"/>
			<meta name="YahooSeeker" content="INDEX, FOLLOW"/>
			<meta name="msnbot" content="INDEX, FOLLOW"/>
			<meta name="allow-search" content="yes"/>
			<meta name="google-site-verification" content="ZV0ZOKOGL-hXo1rSL-gTcXvqQVtjxo3UdL5QJ2Vfyio"/>
			<meta name="msvalidate.01" content="26E323F52E957E97274EAB03AC439737"/>
			<meta name="distribution" content="Local"/>
			<link rel="canonical" href="https://www.tacobell.com/"/>
			<script async src="https://www.googletagmanager.com/gtag/js?id=G-VXK08BQCYD"></script>
			<script>
				{`window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-VXK08BQCYD');`}
			</script>
			<script type="application/ld+json">
				{`{
						"@context": "https://schema.org",
						"@type": "Corporation",
						"name": "UHI Travel",
						"alternateName": "UHI",
						"url": "www.uhitravel.com",
						"logo": "https://www.uhitravel.com/_laravel/public/ci/images/umrah/umrah-logo.png",
						"sameAs": "https://www.uhitravel.com/interface/en/contactUs"
					}`}
			</script>
		</Helmet>
	)
}
