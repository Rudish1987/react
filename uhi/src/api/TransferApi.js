import UseHttp from './UseHttp';
import {TRANSFERS} from './Url';

export const maqamRoutes = () => UseHttp({ url: TRANSFERS.get_maqam_route, method:'POST' });
export const transferSearchApi = (data) => UseHttp({ url : TRANSFERS.get_search_result, method:'POST', body: data});
export const maqamSuppliers = () => UseHttp({ url: TRANSFERS.get_maqam_supplier, method:'GET' });
export const saveTransferApi = (data) => UseHttp({ url : TRANSFERS.save_transfer, method:'POST', body: data});
