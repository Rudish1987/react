import UseHttp from './UseHttp';
import {GROUND_SERVICES} from './Url';

export const gsSearchApi = (data) => UseHttp({ url : GROUND_SERVICES.get_search_result, method:'POST', body: data});
export const gsSaveApi = (data) => UseHttp({ url : GROUND_SERVICES.save_ground_service, method:'POST', body: data});
export const gsGetAPi = (data) => UseHttp({ url : GROUND_SERVICES.get_ground_service, method:'POST', body: data});
