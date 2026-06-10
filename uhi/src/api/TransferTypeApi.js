import UseHttp from './UseHttp';
import {TRANSFERS} from './Url';

export const transferType = () => UseHttp({ url: TRANSFERS.get_vehicle_type_list });