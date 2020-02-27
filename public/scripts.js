//CREATE
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
  document.getElementById("createResult").innerHTML =
    "<i>Graduate has been created</i>";
  xhr.send(JSON.stringify(graduate));
}

//READ ALL
function getAllGraduates() {
  var url = "http://localhost:3000/api/graduates";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    var graduates = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.log(graduates);
      const listGraduates = graduates.map(element => {
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
    } else {
      console.error(graduates);
    }
  };
  xhr.send(null);
}

//READ One (by Email)
function getOneGraduateByEmail() {
  event.preventDefault();
  const input = document.getElementById("findByEmail").value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/graduates/" + input, true);

  xhr.onload = function() {
    var graduate = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.log(graduate);
      document.getElementById("findOneResult").innerHTML = JSON.stringify(
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
          graduate.firstName +
          "</td>" +
          "<td>" +
          graduate.lastName +
          "</td>" +
          "<td>" +
          graduate.email +
          "</td>" +
          "</tr>" +
          "</table>"
      );

      console.log(graduate);
    } else {
      document.getElementById("findOneResult").innerHTML =
        "<i>graduate not found</i>";
      console.error(graduate);
    }
  };
  xhr.send(null);
}

//UPDATE
function updateGraduate() {
  event.preventDefault();
  const email = document.getElementById("updateByEmail").value;
  var updatedGraduate = {};

  (updatedGraduate.firstName = document.getElementById(
    "updateFirstName"
  ).value),
    (updatedGraduate.lastName = document.getElementById(
      "updateLastName"
    ).value);

  var json = JSON.stringify(updatedGraduate);

  var xhr = new XMLHttpRequest();
  xhr.open("PATCH", "http://localhost:3000/api/graduates/" + email, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.onload = function() {
    var graduate = json;
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.log(graduate);
      document.getElementById("updateResult").innerHTML =
        "<i>Graduate has been updated</i>";
    } else {
      console.error(graduate);
    }
  };
  xhr.send(json);
}
//DELETE

function deleteGraduate() {
  event.preventDefault();
  const input = document.getElementById("delete").value;
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "http://localhost:3000/api/graduates/" + input, true);
  xhr.onload = function() {
    var graduate = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      document.getElementById("deleteResult").innerHTML =
        "<i>Graduate has been deleted</i>";
      console.log(graduate);
    } else {
      console.error(graduate);
    }
  };
  xhr.send(null);
}
