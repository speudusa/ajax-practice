#Hello - test

# API startup

- enter the command below into your Terminal

```sh
$ cd api && npm start
```

# Client startup

- run using the VSCode LiveServer extension
  - right click `client/index.html` and select "Open with LiveServer"
- alternatively serve using Python (version 3.X required)
  - enter the commands below into your Terminal
  - the first will bring you back to the root directory (since the API command above put you in the `api/` directory)
  - the second command will start a static HTTP server in Python to serve the client files
  - then open your browser to `http://localhost:8000` to view

```sh
$ cd ../
$ python -m http.server -d client/
```

# Exercise Requirements

- 1: create an HTML doc that contains a `<form>` and `<p>` (message)
- 2: create 3 inputs in the form, email, password, submit (button)
- 3: you do not need to put a form `action` or `method` attribute
- 4: listen for the submit event and prevent the default (browser) submission behavior
- 5: capture the values (for the email and password inputs) from the form in an object
- 6: send the form data as an AJAX POST to the form API
  - API: http://localhost:3000/form
  - the API accepts and responds in JSON format only
- 7: handle the response or error
  - response: put the response data in the message `<p>` tag
  - error: put the response error in the message `<p>` tag and make it red (apply a class that colors the font red)
