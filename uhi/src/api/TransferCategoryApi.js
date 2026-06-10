import UseHttp from './UseHttp';
import {TRANSFERS} from './Url';

export const transferCategory = () => UseHttp({ url: TRANSFERS.get_category_list });