I created this MEN STack to demonstrate using XHR to an intermediate class I am teaching at CareerDevs Computer Science Institute.

STEPS TO SETTING UP XHR FILE ON YOUR SCRIPTS.JS FILE:

Step 1. Create a function, sendHttpRequest, we will use to help make a XHR request:
//This function has 3 arguments in which we will accept a URL and optional method type
const sendHttpRequest = (method, url, data) => {
// We are creating a new instance of a promise and we use resolve when what we were doing asynchronously was successful and reject when it failed.
const promise = new Promise((resolve, reject) => {
// Create the XHR request
const xhr = new XMLHttpRequest();
// The open method initializes a request
xhr.open(method, url);
// We use this property to define the response type
xhr.responseType = "json";

//if the response is truthy, the setRequestHeader property sets the value of an HTTP request header. (You must call setRequestHeader()after open(), but before send().)
if (data) {
xhr.setRequestHeader("Content-Type", "application/json");
}

//we need to use the onload event handler to handle if the response is should be rejected or resolved
xhr.onload = () => {
if (xhr.status >= 400) {
reject(xhr.response);
} else {
resolve(xhr.response);
}
};

//we need to use the onerror event handler to reject the promise with a message
xhr.onerror = () => {
reject("Something went wrong!");
};
// Sends the request. If the request is asynchronous (which is the default), this method returns as soon as the request is sent.
// The JSON.stringify() method converts a JavaScript object or value to a JSON string,
xhr.send(JSON.stringify(data));
});
//returns the response
return promise;
};
Step 2a: Creating a GET Request (using the sendHttpRequest function created above)
//creating a function, getAllGraduates, that we use to request all documents in the database and displaying them in a bullet point list.
const getAllGraduates = () => {
sendHttpRequest("GET", "http://localhost:3000/api/graduates", true).then(
responseData => {
console.log(responseData);

      const listGraduates = responseData.map(element => {
        return (
          "<tr>" +
          "<td>" +
          element.firstName +
          "</td>" +
          "<td>" +
          element.lastName +
          "</td>" +
          "<td>" +
          element.email +
          "</td>" +
          "</tr>"
        );
      });
      console.log(listGraduates);
      document.getElementById("results").innerHTML =
        "<table>" +
        "<tr>" +
        "<th>" +
        "First Name" +
        "</th>" +
        "<th>" +
        "Last Name" +
        "</th>" +
        "<th>" +
        "Email" +
        "</th>" +
        "</tr>" +
        listGraduates.join("\n") +
        "</table>";
    }

);
};

Part 2b: Calling the function to your front end
You will need to ensure that the front end can access the functions you are creating on this file. To do so, make sure the script tag is included in the head of your html file located in your public folder, like so:

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="scripts.js"></script>
    <link rel="stylesheet" href="styles.css" />
  </head>

Inside the button you want to fire off the getAllGraduates function, make sure to call this function using the onclick method in your html file. Then add a div that has an id like so:

<h2>Show All Graduates</h2>
<button onclick="getAllGraduates()">Get Request</button>
 <div id="results"></div>
Step 2a: Creating a POST Request (using the sendHttpRequest function created above)
//Creating a function createNewGraduate that is going to post the object containing the new graduate data to the database 
function createNewGraduate() {
  var graduate = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value
  };
  var xhr = new window.XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/graduates");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(graduate));
}

Step 2b: Calling the POST request in your front end

<form>
<h2>Create Graduate</h2>
<label for="firstName">First Name:</label>
<input type="text" id="firstName" />
<br />
<label for="lastName">Last Name:</label>
<input type="text" id="lastName" />
<br />
<label for="email">First Email:</label>
<input type="text" id="email" />
<br />

      <button type="submit" onclick="createNewGraduate()" value="submit">Post Request
      </button>
    </form>

Helpful Resources
XHR Documentaion:
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
https://gomakethings.com/promise-based-xhr/
Promise Documentation:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
