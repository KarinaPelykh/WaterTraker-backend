const errorStatus = {
  400: "Bad request",
  401: "Unauthorized",
  404: "Not found",
  500: "Server error",
};

const HttpError = (status) => {
  const error = new Error(errorStatus[status]);
  error.status = status;
  return error;
};

module.exports = HttpError;
