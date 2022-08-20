const logger = require("./logger");
module.exports = {
  onError(error, message, code) {
    logger.error(error);
    return {
      message: error.message || message || "Error",
      code: code || 500,
      status: 0,
    };
  },
  onSuccess(data) {
    return {
      data: data == undefined ? {} : data,
      message: "Success",
      code: 200,
      status: 1,
    };
  },
  onSuccessArray(data) {
    if (data && data.length != 0) {
      return {
        data,
        message: "Success",
        code: 200,
        status: 1,
      };
    }
    return {
      data: [],
      message: "Empty",
      code: 204,
      status: 1,
    };
  },
};
