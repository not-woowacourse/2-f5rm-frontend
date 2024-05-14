import axios, { type InternalAxiosRequestConfig } from 'axios';

import { HTTP_HEADERS } from '@/constants/http-headers';
import { API_URL } from '@/constants/url';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const axiosRequestInterceptorConfig = (config: InternalAxiosRequestConfig) => {
  config.headers[HTTP_HEADERS.CONTENT_TYPE_KEY] = 'application/json';
  config.headers[HTTP_HEADERS.CLIENT_NAME_KEY] =
    process.env.NEXT_PUBLIC_CLIENT_NAME;

  return config;
};

axiosInstance.interceptors.request.use(axiosRequestInterceptorConfig);

export { axiosInstance };
