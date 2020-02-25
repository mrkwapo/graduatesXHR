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
  sendHttpRequest("GET", "http://localhost:3000/api/graduates", true).then(
    responseData => {
      console.log(responseData);
      // document.getElementById("results").innerHTML = JSON.stringify(
      //   responseData
      // );

      const listGraduates = responseData.map(element => {
        return (
          //Unordered List beginning
          // "<li>" +
          // "First Name:" +
          // element.firstName +
          // "," +
          // "Last Name: " +
          // element.lastName +
          // "," +
          // "Email: " +
          // element.email +
          // "</li>"
          //Unordered List end

          //table beginining
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
          "</tr>" +
          "</table>"

          //table end
        );
      });
      console.log(listGraduates);
      document.getElementById("results").innerHTML =
        "<ul>" + listGraduates.join("\n") + "</ul>";
    }
  );
};

function createNewGraduate() {
  event.preventDefault();
  var graduate = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value
  };

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "http://localhost:3000/api/graduates");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(graduate));
}
