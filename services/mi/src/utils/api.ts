import axios, { AxiosRequestConfig } from 'axios';
import * as Sentry from '@sentry/react';
import { getToken, getUserEmail } from '$utils/utils';

export const baseURL = window.location.origin;
const MAX_TIMEOUT = 60000;
const initialConfig: AxiosRequestConfig = Object.freeze({
  headers: {
    Accept: 'application/json',
  },
  baseURL,
  timeout: MAX_TIMEOUT,
});

const createApiInstance = () => {
  return axios.create({
    ...initialConfig,
  });
};

export const api = createApiInstance();

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = await getToken(true);
  const email = getUserEmail();

  if (config.headers) {
    config.headers.Authorization = token;
    config.headers.email = email;
  }
  return config;
});

api.interceptors.response.use(
  (result) => result,
  async (error) => {
    // Server does not response
    console.log(error);
    Sentry.captureException(error);
    if (error === undefined) throw error;
    if (error) {
      throw { ...error.response?.data, status: error.response?.status };
    }

    throw error;
  },
);

export default api;
