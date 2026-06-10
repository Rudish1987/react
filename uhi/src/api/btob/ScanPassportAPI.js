import API from '../Axios';
import {B2B_VISA} from '../Url';
//import {useTranslation} from 'react-i18next';

export const ScanPassportAPI = async (data) => {
	//const { t } = useTranslation();
	try {
		const response = await API.post(B2B_VISA.scan_passport_post, data)
			.then(function (response) {
				var isSuccess = false;
				if(response.status === true)
				{
					var passportParsedData = response.data.body.data;

					if(passportParsedData.parsed.document_number != null)
					{
						isSuccess = true;
						return passportParsedData;
					}
				}

				if(isSuccess === false)
				{
					var jsonMessage = {
						success: false,
						message: 'Upload correct passport image'
					};
					return jsonMessage;
				}
			})
			.catch(function (error) {
				return error;
			});

		return response;
	} catch (error) {
		return error;
	}
}