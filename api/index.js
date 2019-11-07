const express = require("express");

const { formSubmitHandler } = require("./handlers");
const { allowCORS, enforceJSON } = require("./middleware");

const app = express();

// globally apply handle CORS response headers and browser pre-flight OPTIONS requests (see middleware.js for details on this middleware function)
app.use(allowCORS);

// a reminder that this API only responds to POST requests
app.get("/form", (_, res) => res.send("use the POST, Luke."));

// for POST requests to /form path:
// first run the enforceJSON middleware (see middleware.js for notes)
// then use the express.json middleware to process the request packets into JSON then parse it into an object attached on req.body
// finally (if both middleware functions succeed) pass the request to the form submission handler (see handlers.js for notes)
app.post("/form", enforceJSON, express.json(), formSubmitHandler);

// extract the PORT variable from the environment
// or (if not present) default to a value of 3000
const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log(`app server listening on ${PORT}`));
