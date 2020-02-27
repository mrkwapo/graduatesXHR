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
  xhr.send(JSON.stringify(graduate));
}

//READ All
function getAllGraduates() {
  var url = "http://localhost:3000/api/graduates";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    var graduates = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.log(graduates);
      document.getElementById("results").innerHTML = JSON.stringify(graduates);
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
  console.log(input);

  xhr.onload = function() {
    console.log(JSON.parse(xhr.responseText));
    var graduate = JSON.stringify(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.log(graduate);
      document.getElementById("emailResult").innerHTML = graduate;
    } else {
      document.getElementById("emailResult").innerHTML =
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
  xhr.open("PUT", "http://localhost:3000/api/graduates/" + email, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.onload = function() {
    var graduate = JSON.stringify(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.log(graduate);
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
