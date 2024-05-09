const service = `internal-service`;

export const api = {
  auth: {
    login: `${service}/api/auth/login`,
    refreshToken: `${service}/api/auth/refreshToken`,
    logout: `${service}/api/auth/logout`
  },
  init: `${service}/users/init`
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
