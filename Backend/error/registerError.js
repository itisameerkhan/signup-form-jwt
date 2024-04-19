const registerError = (err, req, res, next) => {

  console.log("middleware error process");
  const errorStatus = err.statusCode || 200;
  const errorMessage = err.message || "Something went wrong";
  console.log(err.message);

  res.status(errorStatus).json({
    success: false,
    errorStatus: errorStatus,
    errorMessage: errorMessage,
    stack: err.stack || "No Stack Trace",
  });
  
};

export default registerError;
