// Get dogs from API
document.addEventListener("DOMContentLoaded", getDogs);

// UI Elements
const table = document.getElementById("table-body");
const dogForm = document.getElementById("dog-form");
const submitBTN = document.getElementById("submit-btn");

// Add Event Listeners
table.addEventListener("click", handleEditClick);
dogForm.addEventListener("submit", handleFormSubmit);

function getDogs() {
  fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(dogs => addDogsToPage(dogs));
}

function addDogsToPage(dogs) {
  dogs.forEach(dog => {
    table.innerHTML += renderDogRowHTML(dog);
  });
}

function renderDogRowHTML(dog) {
  return `
	<tr id="dog-${dog.id}" data-id="${dog.id}">
		<td class="dog-name">${dog.name}</td>
		<td class="dog-breed">${dog.breed}</td>
		<td class="dog-sex">${dog.sex}</td>
		<td>
			<button id="edit-dog-${dog.id}">Edit</button>
		</td>
	</tr>`;
}

function handleEditClick(e) {
  if (e.target.innerHTML === "Edit") {
    dogForm.dataset.id = e.target.parentElement.parentElement.dataset.id;
    dogForm.children.name.value =
      e.target.parentElement.parentElement.children[0].innerText;

    dogForm.children.breed.value =
      e.target.parentElement.parentElement.children[1].innerText;

    dogForm.children.sex.value =
      e.target.parentElement.parentElement.children[2].innerText;
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  let dogID = e.target.dataset.id;

  console.log(e.defaultPrevented);
  let dog = {
    id: dogID,
    name: e.target.children.name.value,
    breed: e.target.children.breed.value,
    sex: e.target.children.sex.value
  };
  updateDogInfo(dog);
  let row = document.querySelector(`#dog-${dog.id}`);
  row.innerHTML = `
		<td class="dog-name">${dog.name}</td>
		<td class="dog-breed">${dog.breed}</td>
		<td class="dog-sex">${dog.sex}</td>
		<td>
			<button id="edit-dog-${dog.id}">Edit</button>
		</td>`;
}

function updateDogInfo(dog) {
  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dog)
  });
}
