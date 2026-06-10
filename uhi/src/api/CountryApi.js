import UseHttp from './UseHttp';
import {LANDING} from './Url';

export const countryList = () => UseHttp({ url: LANDING.get_country_list });