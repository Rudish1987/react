import API from '../Axios'
import {B2BUSER} from '../Url'

export const newsBlocks = async () => {
	try {
		const response = await API.get(B2BUSER.get_blog_post)
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				return error;
			});

		return response;
	} catch (error) {
		return error;
	}
};
