import { getAPI, handleResult } from "../ApiClient";

const getBalanceAPI = (payload: any) =>
  handleResult(
    getAPI.get("wallet/get-balance", {
      params: payload,
    })
  );
export { getBalanceAPI };
