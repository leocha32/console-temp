import axios, { AxiosRequestConfig } from 'axios';

export const baseURL = window.location.origin;
const MAX_TIMEOUT = 6000; // Timeout 정책 (Max:15초)

const initialConfig: AxiosRequestConfig = Object.freeze({
  headers: {
    Accept: 'application/json',
    email: 'leo.cha@netmarble.com',
  },
  baseURL,
  timeout: MAX_TIMEOUT,
});

const createApiInstance = () => {
  const instance = axios.create({
    ...initialConfig,
  });
  return instance;
};

export const api = createApiInstance();

api.interceptors.response.use(
  (result) => result,
  async (error) => {
    // Server does not response
    console.log(error);
    if (error === undefined) throw error;
    if (error) {
      const e = { ...error.response?.data, status: error.response?.status };
      throw e;
    }

    throw error;
  },
);
export default api;
