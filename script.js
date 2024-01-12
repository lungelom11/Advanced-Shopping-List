let form = document.querySelector("#item-form");
let listItems = document.querySelector("#item-list");
let item = document.querySelector("#item-input");
let clearBtn = document.querySelector("#clear");
let filter = document.querySelector("#filter");

//Add Item Function
function addItem(e) {
  e.preventDefault();
  let newItem = item.value;

  //Validate input
  if (newItem === "") {
    alert("Please input list item");
    return;
  }
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  let button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  listItems.appendChild(li);
  checkUI();

  item.value = "";
}
//Create Button
function createButton(classes) {
  let button = document.createElement("button");
  button.setAttribute("class", classes);
  icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
//Create Icon
function createIcon(classes) {
  let icon = document.createElement("i");
  icon.setAttribute("class", classes);
  return icon;
}

//Remove Item
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are u sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}
//Clear all

function clearAll() {
  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
  }
  checkUI();
}
//Check UI
function checkUI() {
  const items = listItems.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filter.style.display = "block";
  }
}

//Filter Items
function filterItems(e) {
  const items = listItems.querySelectorAll("li");
  let text = e.target.value.toLowerCase();

  items.forEach((item) => {
    let itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

form.addEventListener("submit", addItem);
listItems.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAll);
filter.addEventListener("input", filterItems);

checkUI();