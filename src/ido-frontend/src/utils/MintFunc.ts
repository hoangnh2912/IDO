import Compress from "compress.js";
import { uploadImageAPI, uploadJSONAPI } from "../services";

const resizeImageFn = async (imageFile: File) => {
  const compress = new Compress();
  const resizedImage = await compress.compress([imageFile], {
    size: 2, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth: 350, // the max width of the output image, defaults to 1920px
    maxHeight: 350, // the max height of the output image, defaults to 1920px
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
  });
  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);
  // return "data:image/png;base64," + base64str;
  return resizedFile;
};

const pinDataToIPFS = async (payload: any) => {
  try {
    const response = await uploadJSONAPI(payload);
    return {
      success: true,
      pinataUrl: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      pinataUrl: "",
    };
  }
};

const pinFileToIPFS = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await uploadImageAPI(formData);
    return {
      success: true,
      pinataUrl: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      pinataUrl: "",
    };
  }
};

export { pinDataToIPFS, resizeImageFn, pinFileToIPFS };
