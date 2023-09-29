import { body } from "./var.js";
let p = document.createElement("p");

async function resData(username, email) {
  let url = `https://jsonplaceholder.typicode.com/users?name=${username}&email=${email}`;
  let response = await fetch(url);
  let data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return data;
}

function madeDivInfo(data) {
  let objVarsArr = [
    {
      box: "div",
      classBox: "divId",
      elPar: "p",
      label: "label",
      labelContent: "ID:",
      content: data[0].id,
    },

    {
      box: "div",
      classBox: "divName",
      elPar: "p",
      label: "label",
      labelContent: "Name:",
      content: data[0].name,
    },

    {
      box: "div",
      classBox: "divUsername",
      elPar: "p",
      label: "label",
      labelContent: "Username:",
      content: data[0].username,
    },

    {
      box: "div",
      classBox: "divEmail",
      elPar: "p",
      label: "label",
      labelContent: "Email:",
      content: data[0].email,
    },

    {
      box: "div",
      classBox: "divPhone",
      elPar: "p",
      label: "label",
      labelContent: "Phone:",
      content: data[0].phone,
    },

    {
      box: "div",
      classBox: "divWebsite",
      elPar: "p",
      label: "label",
      labelContent: "Website:",
      content: data[0].website,
    },
  ];

  let div = document.getElementById("userInfo");
  let pMess = document.createElement("p");
  pMess.style.border = "5px solid black";
  pMess.style.width = "300px";
  pMess.style.textAlign = "center";
  pMess.innerHTML = "if u wanna change use double click";

  if (!div) {
    div = document.createElement("div");
    div.id = "userInfo";
    body.append(div);

    objVarsArr.forEach(
      ({ box, classBox, elPar, label, labelContent, content }) => {
        let divbox = document.createElement(box);
        divbox.classList.add(classBox);
        let p = document.createElement(elPar);
        let labelFirst = document.createElement(label);
        labelFirst.innerHTML = labelContent;
        p.innerHTML = content;
        divbox.style.display = "flex";
        divbox.style.alignItems = "center";
        labelFirst.style.marginRight = "5px";
        divbox.append(labelFirst, p);
        div.append(divbox);

        p.addEventListener("dblclick", () => {
          p.setAttribute("contenteditable", true);
          p.focus();
          p.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              p.removeAttribute("contenteditable");
              p.blur();
            }
          });
        });
      }
    );
  }
}

async function responseParse(username, email) {
  try {
    let data = await resData(username, email);

    if (username === "" || email === "") {
      p.innerHTML = "напишите текст";
      p.style.color = "red";
      body.append(p);
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(username)) {
      p.innerHTML = "Введите корректные символы!";
      p.style.color = "red";
      body.append(p);
    } else if (!Array.isArray(data) || data.length === 0) {
      p.innerHTML = "Такого пользователя нет =(";
      p.style.color = "red";
      body.append(p);
    } else {
      // 2.	После успешного входа отображать данные о пользователе в карточке,
      // а именно: id, name, username, email, phone, website. При этом давать пользователю редактировать поле website.
      p.innerHTML = "вы вошли!";
      p.style.color = "green";
      body.append(p);
      madeDivInfo(data);
      searching();

      // Leanne Graham Sincere@april.biz
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    let p = document.createElement("p");
    p.innerHTML = "Ошибка сервера";
    p.style.color = "red";
    body.append(p);
  }
}

function searching() {
  let existingSearchBtn = document.querySelector(".button-box-search");

  if (!existingSearchBtn) {
    // Если кнопки нет, то создаем ее
    let searchBtn = document.createElement("button");
    searchBtn.classList.add("button-box-search");

    let searchA = document.createElement("a");
    searchA.setAttribute("href", "searchHtml.html");
    searchA.innerHTML = "Search";

    searchBtn.append(searchA);
    body.append(searchBtn);
  }
}

function setupDynamicSearch() {
  let inputAlbums = document.createElement("input");
  inputAlbums.setAttribute("placeholder", "Search");
  document.body.prepend(inputAlbums);

  let saveArr = {
    firstSave: [],
  };

  async function parseAlb(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  function fill(arr, values) {
    let newData = arr.filter((el) =>
      el.title.toLowerCase().includes(values.toLowerCase())
    );
    return newData;
  }

  function updateResults(results) {
    let resultContainer = document.getElementById("results");
    resultContainer.innerHTML = "";

    results.forEach((el) => {
      let resultElement = document.createElement("p");
      resultElement.textContent = el.title;
      resultContainer.appendChild(resultElement);
    });

    if (inputAlbums.value === "") {
      resultContainer.innerHTML = "";
    }
  }

  async function initialize() {
    let data = await parseAlb("https://jsonplaceholder.typicode.com/albums");
    saveArr.firstSave = data;
    return data;
  }

  initialize().then((data) => {
    inputAlbums.addEventListener("input", async () => {
      let newDatas = await fill(data, inputAlbums.value.trim());
      saveArr.firstSave = newDatas;
      updateResults(newDatas);
    });
  });

  let exitBtn = document.querySelector("buttog");

  if (!exitBtn) {
    // Если кнопки нет, то создаем ее
    let searchBtn = document.createElement("button");
    searchBtn.classList.add("button-box-search");

    let searchA = document.createElement("a");
    searchA.setAttribute("href", "searchHtml.html");
    searchA.innerHTML = "back in searching menu";

    searchBtn.append(searchA);
    body.append(searchBtn);
    searchBtn.style.marginTop = "10px";
  }
}

export { responseParse, madeDivInfo, resData, setupDynamicSearch };
