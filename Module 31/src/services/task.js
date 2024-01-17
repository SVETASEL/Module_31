import { appState } from "../app";
import { Task } from "../models/Task";
import { Status } from "../models/support";
import { User } from "../models/User";

export const showBacklog = function (document) {
  document.querySelector(".dropdown-task-backlog").innerHTML = "";
  document.querySelector(".dropdown-content-backlog").innerHTML = "";

  if (isAdmin()) {
    let isHasTask = false;
    for (const user of User.getListUserFromLocalStorage()) {
      let countTask = 0;
      const btnDeleteTask =
        '<div class="dropdown">' +
        '<button class="button-delete button-delete-task" type="button">- Delete card</button>' +
        '<div class="dropdown-content delete-content-id-backlog-' +
        user.id +
        '">' +
        "</div></div>";
      document.querySelector(".dropdown-task-backlog").innerHTML +=
        "<p>" + user.login + "</p>" + btnDeleteTask;
      for (const task of Task.getListTaskForBackLog()) {
        if (user.id == task.idUser) {
          countTask++;
          isHasTask = true;
          document.querySelector(".dropdown-task-backlog").innerHTML +=
            '<li class="list-task-backlog" id="' +
            task.id +
            '" contenteditable="true">' +
            task.description +
            "</li> ";
          document.querySelector(".dropdown-content-backlog").innerHTML +=
            '<li class="tasks-from-backlog" id="' +
            task.id +
            '">' +
            task.description +
            " (" +
            user.login +
            ")" +
            "</li>";
          document.querySelector(
            ".delete-content-id-backlog-" + user.id + ""
          ).innerHTML +=
            '<li class="tasks-delete button-deleteTask" id="' +
            task.id +
            '">' +
            task.description +
            " (" +
            user.login +
            ")" +
            "</li>";
        }
      }
      if (countTask == 0) {
        document.querySelector(".dropdown-task-backlog").innerHTML +=
          "<p> (No tasks yet) </p>";
      }
    }

    if (isHasTask) {
      document.querySelector(".button-add-ready").className =
        "button-add-ready active-add";
    } else {
      document.querySelector(".button-add-ready").className =
        "button-add-ready no-active-add";
    }
  } else {
    let isHasTask = false;
    for (const task of Task.getListTaskForBackLog()) {
      isHasTask = true;
      document.querySelector(".dropdown-task-backlog").innerHTML +=
        '<li class="list-task-backlog" id="' +
        task.id +
        '" contenteditable="true">' +
        task.description +
        "</li>";
      document.querySelector(".dropdown-content-backlog").innerHTML +=
        '<li class="tasks-from-backlog" id="' +
        task.id +
        '">' +
        task.description +
        "</li>";
    }

    if (isHasTask) {
      document.querySelector(".button-add-ready").className =
        "button-add-ready active-add";
    } else {
      document.querySelector(".button-add-ready").className =
        "button-add-ready no-active-add";
    }
  }
};

export const showReady = function (document) {
  document.querySelector(".dropdown-task-ready").innerHTML = "";
  document.querySelector(".dropdown-content-ready").innerHTML = "";

  if (isAdmin()) {
    let isHasTask = false;
    for (const user of User.getListUserFromLocalStorage()) {
      let countTask = 0;
      const btnDeleteTask =
        '<div class="dropdown">' +
        '<button class="button-delete button-delete-task" type="button">- Delete card</button>' +
        '<div class="dropdown-content delete-content-id-ready-' +
        user.id +
        '">' +
        "</div></div>";
      document.querySelector(".dropdown-task-ready").innerHTML +=
        "<p>" + user.login + "</p>" + btnDeleteTask;
      for (const task of Task.getListTaskForReady()) {
        if (user.id == task.idUser) {
          countTask++;
          isHasTask = true;
          document.querySelector(".dropdown-task-ready").innerHTML +=
            '<li class="list-task-ready" id="' +
            task.id +
            '" contenteditable="true">' +
            task.description +
            "</li> ";
          document.querySelector(".dropdown-content-ready").innerHTML +=
            '<li class="tasks-from-ready" id="' +
            task.id +
            '">' +
            task.description +
            " (" +
            user.login +
            ")" +
            "</li>";
          document.querySelector(
            ".delete-content-id-ready-" + user.id + ""
          ).innerHTML +=
            '<li class="tasks-delete button-deleteTask" id="' +
            task.id +
            '">' +
            task.description +
            " (" +
            user.login +
            ")" +
            "</li>";
        }
      }
      if (countTask == 0) {
        document.querySelector(".dropdown-task-ready").innerHTML +=
          "<p> (No tasks yet) </p>";
      }
    }
    if (isHasTask) {
      document.querySelector(".button-add-progress").className =
        "button-add-progress active-add";
    } else {
      document.querySelector(".button-add-progress").className =
        "button-add-progress no-active-add";
    }
  } else {
    let isHasTask = false;
    for (const task of Task.getListTaskForReady()) {
      isHasTask = true;
      document.querySelector(".dropdown-task-ready").innerHTML +=
        '<li class="list-task-ready" id="' +
        task.id +
        '" contenteditable="true">' +
        task.description +
        "</li>";
      document.querySelector(".dropdown-content-ready").innerHTML +=
        '<li class="tasks-from-ready" id="' +
        task.id +
        '">' +
        task.description +
        "</li>";
    }
    if (isHasTask) {
      document.querySelector(".button-add-progress").className =
        "button-add-progress active-add";
    } else {
      document.querySelector(".button-add-progress").className =
        "button-add-progress no-active-add";
    }
  }

  document.querySelectorAll(".tasks-from-backlog").forEach((element) => {
    element.addEventListener("click", function (e) {
      Task.changeStatus(element.id, Status.READY);
      element.parentNode.removeChild(element);
      document.querySelectorAll(".list-task-backlog").forEach((elementLTB) => {
        if (element.id == elementLTB.id) {
          elementLTB.parentNode.removeChild(elementLTB);
        }
      });
      showAll(document);
    });
  });
};

export const showInProgress = function (document) {
  document.querySelector(".dropdown-task-progress").innerHTML = "";
  document.querySelector(".dropdown-content-progress").innerHTML = "";

  if (isAdmin()) {
    let isHasTask = false;
    for (const user of User.getListUserFromLocalStorage()) {
      let countTask = 0;
      const btnDeleteTask =
        '<div class="dropdown">' +
        '<button class="button-delete button-delete-task" type="button">- Delete card</button>' +
        '<div class="dropdown-content delete-content-id-progress-' +
        user.id +
        '">' +
        "</div></div>";
      document.querySelector(".dropdown-task-progress").innerHTML +=
        "<p>" + user.login + "</p>" + btnDeleteTask;
      for (const task of Task.getListTaskForProgress()) {
        if (user.id == task.idUser) {
          countTask++;
          isHasTask = true;
          document.querySelector(".dropdown-task-progress").innerHTML +=
            '<li class="list-task-progress" id="' +
            task.id +
            '" contenteditable="true">' +
            task.description +
            "</li> ";
          document.querySelector(".dropdown-content-progress").innerHTML +=
            '<li class="tasks-from-progress" id="' +
            task.id +
            '">' +
            task.description +
            " (" +
            user.login +
            ")" +
            "</li>";
          document.querySelector(
            ".delete-content-id-progress-" + user.id + ""
          ).innerHTML +=
            '<li class="tasks-delete button-deleteTask" id="' +
            task.id +
            '">' +
            task.description +
            " (" +
            user.login +
            ")" +
            "</li>";
        }
      }
      if (countTask == 0) {
        document.querySelector(".dropdown-task-progress").innerHTML +=
          "<p> (No tasks yet) </p>";
      }
    }
    if (isHasTask) {
      document.querySelector(".button-add-finished").className =
        "button-add-finished active-add";
    } else {
      document.querySelector(".button-add-finished").className =
        "button-add-finished no-active-add";
    }
  } else {
    let isHasTask = false;
    for (const task of Task.getListTaskForProgress()) {
      isHasTask = true;
      document.querySelector(".dropdown-task-progress").innerHTML +=
        '<li class="list-task-progress" id="' +
        task.id +
        '" contenteditable="true">' +
        task.description +
        "</li>";
      document.querySelector(".dropdown-content-progress").innerHTML +=
        '<li class="tasks-from-progress" id="' +
        task.id +
        '">' +
        task.description +
        "</li>";
    }
    if (isHasTask) {
      document.querySelector(".button-add-finished").className =
        "button-add-finished active-add";
    } else {
      document.querySelector(".button-add-finished").className =
        "button-add-finished no-active-add";
    }
  }

  document.querySelectorAll(".tasks-from-ready").forEach((element) => {
    element.addEventListener("click", function (e) {
      Task.changeStatus(element.id, Status.IN_PROGRESS);
      element.parentNode.removeChild(element);
      document.querySelectorAll(".list-task-ready").forEach((elementLTB) => {
        if (element.id == elementLTB.id) {
          elementLTB.parentNode.removeChild(elementLTB);
        }
      });
      showAll(document);
    });
  });
};

export const showFinished = function (document) {
  document.querySelector(".dropdown-task-finished").innerHTML = "";

  if (isAdmin()) {
    for (const user of User.getListUserFromLocalStorage()) {
      let countTask = 0;
      const btnDeleteTask =
        '<div class="dropdown">' +
        '<button class="button-delete button-delete-task" type="button">- Delete card</button>' +
        '<div class="dropdown-content delete-content-id-finished-' +
        user.id +
        '">' +
        "</div></div>";
      document.querySelector(".dropdown-task-finished").innerHTML +=
        "<p>" + user.login + "</p>" + btnDeleteTask;
      for (const task of Task.getListTaskForFinished()) {
        if (user.id == task.idUser) {
          countTask++;
          document.querySelector(".dropdown-task-finished").innerHTML +=
            '<li class="list-task-finished" id="' +
            task.id +
            '" contenteditable="true">' +
            task.description +
            "</li> ";
          document.querySelector(
            ".delete-content-id-finished-" + user.id + ""
          ).innerHTML +=
            '<li class="tasks-delete button-deleteTask" id="' +
            task.id +
            '">' +
            task.description +
            " (" +
            user.login +
            ")" +
            "</li>";
        }
      }
      if (countTask == 0) {
        document.querySelector(".dropdown-task-finished").innerHTML +=
          "<p> (No tasks yet) </p>";
      }
    }
  } else {
    for (const task of Task.getListTaskForFinished()) {
      document.querySelector(".dropdown-task-finished").innerHTML +=
        '<li class="list-task-finished" id="' +
        task.id +
        '" contenteditable="true">' +
        task.description +
        "</li>";
    }
  }

  document.querySelectorAll(".tasks-from-progress").forEach((element) => {
    element.addEventListener("click", function (e) {
      Task.changeStatus(element.id, Status.FINISHED);
      element.parentNode.removeChild(element);
      document.querySelectorAll(".list-task-progress").forEach((elementLTB) => {
        if (element.id == elementLTB.id) {
          elementLTB.parentNode.removeChild(elementLTB);
        }
      });
      showAll(document);
    });
  });
};

export const showAll = function (document) {
  showBacklog(document);
  showReady(document);
  showInProgress(document);
  showFinished(document);
  onChange(document, ".list-task-backlog");
  onChange(document, ".list-task-ready");
  onChange(document, ".list-task-progress");
  onChange(document, ".list-task-finished");
  onDelete(document);
  fillLenghtInFooter(document);
};

function fillLenghtInFooter(document) {
  document.querySelector(".backlog-lenght").innerHTML = Task.getBackLogSize();
  document.querySelector(".finished-lenght").innerHTML = Task.getFinishedSize();
  document.querySelector(".name-footer").innerHTML =
    appState._currentUser.login;
  document.querySelector(".year-footer").innerHTML = new Date().getFullYear();
}

export const updateAll = function (document) {
  showAll(document);
};

export const addListenerOnce = function (document) {
  document
    .querySelector(".button-add-backlog")
    .addEventListener("click", function (e) {
      const inputTask = document.querySelector(".input-task-backlog");
      if (inputTask.value != "") {
        const listDropdawn = document.querySelector(".dropdown-task-backlog");
        const list =
          '<li class="list-task-backlog">' + inputTask.value + "</li>";
        listDropdawn.innerHTML += list;
        const task = new Task(inputTask.value);
        Task.save(task);
        document.querySelector(".dropdown-content-backlog").innerHTML +=
          '<li class="tasks-from-backlog" id="' +
          task.id +
          '">' +
          task.description +
          "</li>";
        inputTask.value = "";
        showAll(document);
      }
    });
};

function onChange(document, className) {
  document.querySelectorAll(className).forEach((element) => {
    element.addEventListener("blur", function () {
      Task.changeDescription(element.id, element.textContent);
      showAll(document);
    });
  });
}

function onDelete(document) {
  document.querySelectorAll(".button-deleteTask").forEach((element) => {
    element.addEventListener("click", function () {
      Task.deleteTask(element.id);
      showAll(document);
    });
  });
}

function isAdmin() {
  return User.isAdmin(appState.currentUser);
}
