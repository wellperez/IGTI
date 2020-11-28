//+ Carlos R. L. Rodrigues
//@ http://jsfromhell.com/string/extenso [rev. #3]

async function loadUsers() {
  const response = await fetch("http://localhost:3000/results");
  const json = await response.json();
  const user = await Object.values(json);
  return user;
}

async function handleSubmit(event) {
  // Evitando o refresh
  event.preventDefault();

  var userInput = document.querySelector("#user");
  var userInputValue = userInput.value;

  const users = await loadUsers();

  const results = document.getElementById("results");

  console.log(results);

  users.map((user, index) => {
    const firstName = user.name.first;
    const lastName = user.name.last;
    const age = user.dob.age;
    const picture = user.picture.large;
    if (
      firstName.includes(userInputValue) ||
      lastName.includes(userInputValue)
    ) {
			results.appendChild(createImg(picture))
      results.appendChild(createParagraph(firstName, lastName, age));
    }
  });
}

function createParagraph(firstName, lastName, age) {
	const para = document.createElement("P"); // Create a <p> node
	para.textContent = `${firstName} ${lastName}, ${age} anos.`
	return para
}

function createImg(src) {
	const img = document.createElement('img'); 
  img.src = src 
	return img
}

function disableBtn() {
  document.getElementById("user").addEventListener("keyup", function () {
    var userInput = document.getElementById("user").value;
    if (userInput != "") {
      document.getElementById("send").removeAttribute("disabled");
    } else {
      document.getElementById("send").setAttribute("disabled", null);
    }
  });
}

function start() {
  var form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);

  disableBtn();
}

start();
