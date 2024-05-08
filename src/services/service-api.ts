export const api = {
  auth: {
    login: `/api/auth/login`,
    refreshToken: `/api/auth/refreshToken`,
    logout: `/api/auth/logout`
  },
  init: "/api/init"
};

export interface NeoResponse<T = any> {
  data: T;
  status: 0 | 1;
  message: string;
}
