export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  const defaultMessage =
    "We're facing a technical issue. Please try again later.";
  const message = err.message || defaultMessage;

  const errorResponse = {
    status,
    message,
  };

  res.status(status).json(errorResponse);
};
