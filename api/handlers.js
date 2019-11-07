const formSubmitHandler = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    // email property is missing or empty
    // exit early with a (client error) response and error details
    return res.status(400).json({
      error: {
        message: "missing email",
        hint:
          "make sure your JSON includes the form email value and that it is non-empty",
      },
    });
  }

  if (!password) {
    // password property is missing or empty
    // exit early with a (client error) response and error details
    return res.status(400).send({
      error: {
        message: "missing password",
        hint:
          "make sure your JSON includes the form password value and that it is non-empty",
      },
    });
  }

  // if form data is valid reflect it back to the submitter client
  return res.json(req.body);
};

module.exports = {
  formSubmitHandler,
};
