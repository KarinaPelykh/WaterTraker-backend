const errorStatus = {
  400: "Bad request",
  401: "Unauthorized",
  404: "Not found",
  500: "Server error",
  409: "Conflict",
};

const HttpError = (status, message = errorStatus[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
