import { getAPI, handleResult } from "../ApiClient";

const readAPI = (payload: any) =>
  handleResult(
    getAPI.get("nft/get-list-nft", {
      params: payload,
    })
  );
const uploadJSONAPI = (payload: any) =>
  handleResult(getAPI.post("storage/upload-json", payload));
const uploadImageAPI = (payload: any) =>
  handleResult(getAPI.post("storage/upload-image", payload));
export { readAPI, uploadJSONAPI, uploadImageAPI };
