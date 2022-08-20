import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../constants/config";
const createAPI = () => {
  const APIInstant = axios.create();
  APIInstant.defaults.baseURL = BASE_URL;
  APIInstant.defaults.timeout = 100000;
  APIInstant.interceptors.request.use(
    async (config) => {
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  APIInstant.interceptors.response.use((response) => {
    return response;
  });
  return APIInstant;
};

const getAPI = createAPI();

const handleResult = (
  api: Promise<AxiosResponse>,
  isShowMessageError: boolean = true
) =>
  api
    .then((res) => {
      if (res.data.status != 1) {
        let msg = res.data.message;
        if (isShowMessageError) alert(msg);
        return Promise.reject(res.data.message);
      }
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      if (err.message == "Network Error" && isShowMessageError)
        alert("Oops, looks like a network error has occurred");
    });

export { getAPI, handleResult };
