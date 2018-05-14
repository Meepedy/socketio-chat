'use strict';
console.log('app.js loaded');

const messageTypes = {LEFT: 'left', RIGHT: 'right', LOGIN: 'login'};

//Chat Stuff
const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

//Login Stuff
let username = ''
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = []; // {author, date, content, type}
