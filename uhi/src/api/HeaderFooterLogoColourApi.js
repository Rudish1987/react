export const getLogoAndColour = async (url) => {
	try {
		const response = await fetch(url);
		const resJson = await response.json();
		return resJson;
	} catch (error) {
		console.log('error', error);
	}
};
