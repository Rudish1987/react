import axios from 'axios';

export default function AxiosDownloadFile(url, fileName){
	return axios({
		url,
		method: 'GET',
		responseType: 'blob',
	})
		.then(response => {
			const href = window.URL.createObjectURL(response.data);

			const anchorElement = document.createElement('a');

			anchorElement.href = href;
			anchorElement.download = fileName;

			document.body.appendChild(anchorElement);
			anchorElement.click();

			document.body.removeChild(anchorElement);
			window.URL.revokeObjectURL(href);
		})
		.catch(error => {
			console.log('error: ', error);
		});
}

// const fileURL = 'http://localhost:3000/example-file.pdf';

// axiosDownloadFile(fileURL, 'my-file.pdf');
