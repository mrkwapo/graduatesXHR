const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = "json";

    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const getAllGraduates = () => {
  console.log("working");
  sendHttpRequest("GET", "http://localhost:3000/api/graduates", true).then(
    responseData => {
      console.log(responseData);

      const listItems = responseData.map(element => {
        return (
          "<li>" +
          "First Name: " +
          element.firstName +
          " , " +
          "Last Name: " +
          element.lastName +
          " , " +
          "Email: " +
          element.email +
          "</li>"
        );
      });
      document.getElementById("results").innerHTML =
        "<ul>" + listItems.join("\n") + "</ul>";
    }
  );
};

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
