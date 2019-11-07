// async functions ALWAYS return a Promise
// the return value of an async function is what the Promise will resolve
// that value can be picked up with a .then(value => )
// any thrown Error in an async function is what the Promise will reject
// that error can be picked up with a .catch(error => )
const postJSON = async (url, data) => {
  // stringify the data object
  // remember that JSON is a language agnostic string format we can use to transport structured data over HTTP
  // there is no way to send a JavaScript object over HTTP because that is a language specific construct
  const body = JSON.stringify(data);

  const response = await fetch(url, {
    body, // the JSON-formatted request body
    method: "POST", // send using the POST HTTP method
    headers: {
      // include the content-type as required by the API
      // this is a common header to include when communicating with an API
      // it lets the server know what type of data is being sent in the request
      "Content-Type": "application/json",
    },
  });

  // grab the response status code for use below
  const responseStatus = response.status;

  // capture the response data (JSON) and convert it to a JS object
  // this process is asynchronous because the actual response data is in a stream format (packets of data) that must be pieced together
  // response.json(): stream --piece together--> JSON --convert (parse)--> JS object
  const parsedDataObject = await response.json();

  // check if the status code is in the "success" (200) range
  if (responseStatus >= 200 && responseStatus < 300) {
    // if it is in this range the request was successful
    // return the parsed data so it is available in a .then()
    return parsedDataObject;
  }

  // if it was not in this range then the request failed
  // throw an error so that it can be picked up in the .catch()

  // first create the Error object
  const responseError = new Error();

  // now we will add some properties to the Error object to make it easier to work with
  responseError.data = data;
  responseError.name = "ResponseError";
  responseError.statusCode = responseStatus;

  // now that the Error object has been customized we can throw it
  // it will be available in .catch()
  throw responseError;
};

// anything that relies on the DOM should be written inside this function
// when the DOMContentLoaded event occurs all DOM elements will be loaded in the HTML and ready to be managed by our script
// notice that the fetch function above doesnt have to be defined in here because it has no reliance on anything in the DOM
const runDOMScript = () => {
  // select the targets we will be working with
  const message = document.querySelector("#message");
  const emailInput = document.querySelector("#email");
  const loginForm = document.querySelector("#login-form");
  const passwordInput = document.querySelector("#password");

  // if the request succeeds we will execute this function giving it the response data object
  // used in the .then()
  const handleSuccess = responseData => {
    // HTML can not parse a JS object, it only understands HTML and strings
    // we must convert it to JSON before setting it as the message text content
    // otherwise it will appear as [object Object] or the default "to string" representation of a JS object
    message.textContent = JSON.stringify(responseData);

    // we should check if the red-text class has been applied to the message element
    // if it has we should remove it since the form submission request was succesful
    if (message.classList.contains("red-text")) {
      message.classList.remove("red-text");
    }
  };

  // if the request fails we will execute this function giving it the response error object
  // used in the .catch()
  const handleError = responseError => {
    // once again we must convert the Error object (JS object) into a JSON string for it to be displayed in the HTML
    message.textContent = JSON.stringify(responseError);

    // now we should apply the red-text class to signify an error occurred
    message.classList.add("red-text");
  };

  // register a listener for the "submit" event on the form
  // notice that we do our selections and write any DOM-reliant functions inside the DOMContentLoaded handler but outside the submit handler
  // this is so that only submit event logic is executed rather than re-declaring our selected elements and functions

  const handleSubmit = event => {
    // prevent the Browser default behavior when a form is submitted
    // would normally send a request and reload, we will customize its behavior by sending our own AJAX request
    event.preventDefault();

    // create a form data object
    // notice how the input values are grabbed from within the event handler callback
    // this is an asynchronous callback (it is only executed when the event occurrs)
    // if we grabbed the values outside the callback they would be empty because
    const formData = {
      // we access the "value" property to see the input value
      email: emailInput.value,
      password: passwordInput.value,
    };

    // now that we have our form data object we can create an AJAX request
    // we use our postJSON (fetch wrapper) to make this process simpler (encapsulating the tedious logic of using fetch)
    postJSON("http://localhost:3000/form", formData)
      // we only need to provide the function references here as a shorthand
      // they will be executed and given their respective argument implicitly
      .then(handleSuccess) // same as .then(responseData => handleSuccess(responseData))
      .catch(handleError); // same as .catch(responseError => handleError(responseError))

    // if we chose to make the handleSubmit function async we could write it this way:
    /*
      try {
        const responseData = await postJSON("http://192.168.194.183:3000/form", formData);
        handleSuccess(responseData);
      } catch(responseError) {
        handleError(responseError)
      }
    */
  };

  // finally we register a listener for the submit event and provide it the submit handling callback function defined above
  loginForm.addEventListener("submit", handleSubmit);
};

document.addEventListener("DOMContentLoaded", runDOMScript);
