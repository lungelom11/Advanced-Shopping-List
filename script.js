let form = document.querySelector("#item-form");
let listItems = document.querySelector("#item-list");
let item = document.querySelector("#item-input");
let clearBtn = document.querySelector("#clear");
let filter = document.querySelector("#filter");
let formBtn = form.querySelector("button");
let editMode = false;

function displatItems() {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });

  checkUI();
}

//Add Item Function
function onAddItemSubmit(e) {
  e.preventDefault();
  let newItem = item.value;

  //Validate input
  if (newItem === "") {
    alert("Please input list item");
    return;
  }
  //if on edit mode
  if (editMode) {
    let itemToEdit = listItems.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    editMode = false;
  }

  addItemToDOM(newItem);

  //Add items to local storage
  addItemToStorage(newItem);

  checkUI();

  item.value = "";
}

//Add Item To the DOM
function addItemToDOM(item) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  let button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  listItems.appendChild(li);
}
// Add Items to Local Storage
function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
//Get Items from Storage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
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

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(editItem) {
  editMode = true;

  listItems.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
  });

  formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
  formBtn.style.backgroundColor = "#228B22";
  item.value = editItem.textContent;
  editItem.setAttribute("class", "edit-mode");
}

//Remove Item
function removeItem(item) {
  if (confirm("Are u sure?")) {
    //remove item from DOM
    item.remove();

    //Remove item from Storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  //Filter array
  itemsFromStorage = itemsFromStorage.filter((i) => {
    return i !== item;
  });

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
//Clear all

function clearAll() {
  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
  }
  //Clear localStorage
  localStorage.removeItem("items");

  checkUI();
}
//Check UI
function checkUI() {
  item.value = "";

  const items = listItems.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filter.style.display = "block";
  }

  formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
  formBtn.style.backgroundColor = "#333";

  editMode = false;
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

function init() {
  form.addEventListener("submit", onAddItemSubmit);
  listItems.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearAll);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displatItems);

  checkUI();
}

init();
