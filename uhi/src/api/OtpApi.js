import UseHttp from './UseHttp';
import {USER} from './Url';

export const validateOtpApi = (data) => UseHttp({ url : USER.validateOtp, method:'POST', body: data});
export const resendOtpApi = (data) => UseHttp({ url : USER.resendOtp, method:'POST', body: data});
export const loguserApi = (data) => UseHttp({ url : USER.loguser, method:'POST', body: data});