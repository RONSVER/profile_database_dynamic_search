// 1.	Сделать авторизацию по username и email, используя следующий url: https://jsonplaceholder.typicode.com/users.
// Для авторизации передавать query параметры username и email. Ответ обрабатывать с помощью async await.
// Если приходит пустой массив значит такого пользователя нет – показываем “Такого пользователя не существует.”
// 1.1 ** Сделать динамическую валидацию, то есть валидация показывается сразу при начале печати и подсказывает, что поле заполнено верно,
// если поле заполнено верно.

// 3.	*** После успешной авторизации так же должна появиться кнопка “Search”, при клике на которую вы переходите на след. страницу.
// На этой странице еще три кнопки “Albums”, “Todos”, “Posts”. При клике на каждую вы переходите на страницу поиска с панелью поиска в виде инпута.
//  При вводе каких-либо символов должны отображаться результаты поиска. Например если вы на странице Todos, поиск должен быть по значению title,
//   если на странице Albums, то поиск происходит тоже по значению title и на поиске Posts тоже по полю title.
// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/albums
// https://jsonplaceholder.typicode.com/todos

// index.js

import { responseParse } from "./foo.js";
import { nameInput, emailInput, btnCheck } from "./var.js";

btnCheck.addEventListener("click", async () => {
  responseParse(nameInput.value, emailInput.value);
});
