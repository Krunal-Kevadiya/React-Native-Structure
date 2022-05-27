import { ApisauceInstance } from 'apisauce';
import { apiConfig } from '@configs';
import { AppConst } from '@constants';
import AuthService from './Auth.service';

export type { AuthServiceType } from './Auth.service';

/**
 * Use AuthorizedAPI when Authorization token required for the API request
 * Use UnauthorizedAPI when Authorization token NOT required for the API request
 */
const authorizedAPI: ApisauceInstance = apiConfig(AppConst.apiUrl);
//const unauthorizedAPI: ApisauceInstance = apiConfig(AppConst.apiUrl);

export function setAuthorizedApiHeader(token: string = ''): void {
  authorizedAPI.setHeader('authorization', token);
}

export default {
  authApi: AuthService(authorizedAPI)
};
