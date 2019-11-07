// middleware uses a 3rd parameter called "next"
// next is used to send the request down to the next middleware / handler
// or in some cases to exit early by returning a response before the request reaches the next MW / handler function

// sets the appropriate CORS headers and handles OPTIONS requests
const allowCORS = (req, res, next) => {
  // allow requests from any (*, wildcard) origin
  res.set("Access-Control-Allow-Origin", "*");
  // allow the content-type header to be included in the request
  res.set("Access-Control-Allow-Headers", "content-type");
  // allow only GET and POST requests
  res.set("Access-Control-Allow-Methods", "GET, POST");

  // if a pre-flight OPTIONS browser request is issued
  if (req.method === "OPTIONS") {
    // send back a 200 response so it can continue to issuing the original request
    return res.sendStatus(200);
  }

  // otherwise call next() which will move the request down to the next middleware / handler
  next();
};

// this middleware enforces that the correct content-type header has been included in the request
const enforceJSON = (req, res, next) => {
  const contentType = req.header("content-type");

  if (contentType !== "application/json") {
    // if an incorrect (or missing) content-type header then exit the request chain early by sending back a (client failure) response and message
    return res.status(400).json({
      error: {
        message: "Content-Type is not application/json",
        hint: "add the Content-Type header to your request",
      },
    });
  }

  // otherwise continue to the next middleware / handler
  next();
};

module.exports = {
  allowCORS,
  enforceJSON,
};
