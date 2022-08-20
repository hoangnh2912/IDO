import { getAPI, handleResult } from "../ApiClient";

const getListNFTAPI = (payload: any) =>
  handleResult(
    getAPI.get("nft/get-list-nft", {
      params: payload,
    })
  );
export { getListNFTAPI };
