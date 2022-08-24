import { getAPI, handleResult } from "../ApiClient";

const getListIDOAPI = (payload: any) =>
  handleResult(
    getAPI.get("nft/get-list-ido", {
      params: payload,
    })
  );
export { getListIDOAPI };
