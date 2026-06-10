import UseHttp from './UseHttp';
import {GROUND_SERVICES} from './Url';

export const groundServiceCategory = () => UseHttp({ url: GROUND_SERVICES.get_category_list });