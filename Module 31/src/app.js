import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import { User } from "./models/User";
import { generateTestUser } from "./utils";
import { setTaskFieldTemplate } from "./services/taskFieldTemplate";
import { setNoAccessTemplate } from "./services/noAccessTemplate";
import { State } from "./state";
import { authUser } from "./services/auth";
import { setMenuAsAdmin, setMenuAsUser } from "./services/header";

export const appState = new State();
export const documentHTML = function () {
  return document;
};
const loginForm = document.querySelector("#app-login-form");

generateTestUser(User);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  if (authUser(login, password)) {
    setTaskFieldTemplate(document);

    if (User.isAdmin(appState.currentUser)) {
      setMenuAsAdmin(document);
    } else {
      setMenuAsUser(document);
    }
  } else {
    setNoAccessTemplate(document);
  }
});

export const clickOut = function (e) {
  appState._currentUser = null;
  document.querySelector("#content").innerHTML =
    '<p id="content">Please Sign In to see your tasks!</p>';
  for (let i = 0; i < 2; i++) {
    document.querySelectorAll(".form-control")[i].style.display = "block";
  }
  document.querySelector("#app-login-btn").style.display = "block";
  document.querySelector("#app-out-btn").style.display = "none";
};
