import { ApiResponse, ApisauceInstance } from 'apisauce';
import { apiWithCancelToken } from '@configs';
import { ApiUrlConst } from '@constants';
import { SignInRequest, SuccessUserResponse } from '@models';

export type AuthServiceType = {
  signIn: (credentials: SignInRequest) => Promise<ApiResponse<SuccessUserResponse, SuccessUserResponse>>;
};

const authService = (api: ApisauceInstance) => (): AuthServiceType => {
  function signIn(credentials: SignInRequest): Promise<ApiResponse<SuccessUserResponse, SuccessUserResponse>> {
    return apiWithCancelToken<SuccessUserResponse>(api, 'POST', ApiUrlConst.signIn, {}, credentials.plainRequest, {});
  }

  return {
    signIn
  };
};

export default authService;
