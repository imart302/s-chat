import axios, { AxiosError } from "axios";

export const chatApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_APIURL,
});

chatApi.interceptors.request.use((config) => {
  config.headers.set('x-token', localStorage.getItem('x-token'));
  return config;
});

chatApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if(error.response){
      const data = error.response.data as {message: String};
      throw data.message ?? error.message;
    }
    throw error.message;
  }
);