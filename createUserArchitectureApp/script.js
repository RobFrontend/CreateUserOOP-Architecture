"use strict";

// Current year
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();

// Array for users
let Users = [];
// Display Users in HTML

//////////////////////////////////////////
const inputBox = document.querySelector(".inputs-boxes");
const usersBox = document.querySelector(".created-users");
const fNameInput = document.querySelector(".firstName");
const lNameInput = document.querySelector(".lastName");
const nickInput = document.querySelector(".nick");
const birthYearInput = document.querySelector(".birthYear");
const submit = document.querySelector(".submit");
const taken = document.querySelector(".taken");
const modal = document.querySelector(".modal-box");
const btnsCloseModal = document.querySelectorAll(".modal-btn");
const infoCreated = document.querySelector(".created-txt");
const infoNickTaken = document.querySelector(".input-nick");
const h3 = document.querySelector("h3");
////////////////////////////////////////////

// OOP
class User {
  constructor(nick, firstName, lastName, birthYear, age) {
    this.nick = nick.trim();
    this.firstName =
      firstName.at(0).toUpperCase() + firstName.slice(1).toLowerCase();
    this.lastName =
      lastName.at(0).toUpperCase().trim() + lastName.slice(1).toLowerCase();
    this.birthYear = +birthYear;
    this.age = new Date().getFullYear() - birthYear;
    // Array
    this.pushUser();
    this.allUsersBox();
  }
  // add user to Users array
  pushUser() {
    Users.push(this);
  }
  // display users in table
  allUsersBox() {
    usersBox.textContent = "";
    Users.forEach(function (user, i) {
      const html = `<p class="user-created user-created-firstname">${user.firstName}</p>
      <p class="user-created user-created-lastname">${user.lastName}</p>
      <p class="user-created user-created-age">${user.age}</p>`;
      i + 1;
      usersBox.insertAdjacentHTML("afterbegin", html);
    });
  }
}

// exmpl users created here
const rob97 = new User("rob97", "Robert", "Grabowski", "1997");
const jan81 = new User("jan81", "Jan", "Kowalski", "1981");

///////////////////////////////////////////////////////////////////////////
// APLICATION ARCHITECTURE
class App {
  constructor() {
    // create User by clicking button
    submit.addEventListener("click", this.createUser);

    // create User by clicking ENTER
    // ...

    // rest of the handlers
    modal.addEventListener("click", this.closeModal.bind(this));

    btnsCloseModal.forEach((btn) =>
      btn.addEventListener("click", this.closeModal.bind(this))
    );

    // close modal by Escape key
    this.escapeKey();

    // taken nicks
    h3.textContent = Users.map((user) => ` ${user.nick}`);

    this.getLocalStorage();
  }

  closeModal() {
    modal.classList.add("hidden");
  }
  // openModal() {
  //   modal.classList.remove("hidden");
  // }

  // Create User with webpage
  createUser() {
    // check if that nick already exists
    const checkNick = Users.some(({ nick }) => nick === nickInput.value);
    // if (checkNick === true) {
    if (checkNick === true) {
      infoNickTaken.style.color = "#D0342C";
      infoNickTaken.textContent = `Nick '${nickInput.value}' is taken!`;
      infoNickTaken.style.opacity = "1";
      setTimeout(() => {
        infoNickTaken.style.color = "inherit";
        infoNickTaken.textContent = "Nick:";
      }, 3000);
    }
    if (
      nickInput.value.length >= 5 &&
      fNameInput.value.length >= 1 &&
      lNameInput.value.length >= 1 &&
      birthYearInput.value >= 1920 &&
      birthYearInput.value <= new Date().getFullYear() &&
      checkNick === false
    ) {
      const user = new User(
        nickInput.value,
        fNameInput.value.trim(),
        lNameInput.value.trim(),
        +birthYearInput.value
      );
      infoCreated.style.visibility = "visible";
      infoCreated.style.opacity = "1";
      setTimeout(() => {
        infoCreated.style.opacity = "0";
        infoCreated.style.visibility = "hidden";
      }, 1000);
      // save users in local storage
      this.setLocalStorage();
    } else {
      // openModal();
      modal.classList.remove("hidden");
    }
    h3.textContent = Users.map((user) => ` ${user.nick}`);
    console.log(Users);
    // reset input
    nickInput.value = "";
    fNameInput.value = "";
    lNameInput.value = "";
    birthYearInput.value = "";
    taken.style.opacity = 1;
    setTimeout(() => (taken.style.opacity = 0.5), 1500);
  }

  // handlers
  escapeKey() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") modal.classList.add("hidden");
    });
  }

  // Local Storage
  setLocalStorage() {
    localStorage.setItem("users", JSON.stringify(Users));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("users"));
    if (!data) {
      return;
    }
    Users = data;
    usersBox.textContent = "";
    Users.forEach(function (user, i) {
      const html = `<p class="user-created user-created-firstname">${user.firstName}</p>
        <p class="user-created user-created-lastname">${user.lastName}</p>
        <p class="user-created user-created-age">${user.age}</p>`;
      i + 1;
      usersBox.insertAdjacentHTML("afterbegin", html);
    });
  }

  // reset storage
  reset() {
    localStorage.removeItem("users");
    location.reload();
  }
}

// Find User
const findUser = (findnick) => Users.find(({ nick }) => nick === findnick);

const app = new App();
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    app.createUser();
  }
});
