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

var socket = io();

socket.on('message', message => {
    console.log(message);
    if(message.type !== messageTypes.LOGIN) {
        if(message.author === username) {
            message.type = messageTypes.RIGHT;
        }
        else {
            message.type = messageTypes.LEFT;
        }
    }

    messages.push(message);
    displayMessages();
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

//take in message object, and return corresponding message HTML
function createMessageHTML (message) {
    if(message.type === messageTypes.LOGIN) {
        return `<p class="secondary-text text-center mb-2">${message.author} joined the chat...</p>`;
    }
    return `
        <div class="message ${message.type === messageTypes.LEFT ? 'message-left' : 'message-right'}">
            <div id="message-details" class="flex">
            <p class="message-author">${message.type === messageTypes.RIGHT ? '' : message.author}</p>
            <p class="message-date">${message.date}</p>
            </div>
            <p class="message-content">${message.content}</p>
        </div>
    `;
}

//calls createMessageHTML and renders generated HTML
function displayMessages () {
    //TODO this doesn't seen efficient 
    const messagesHTML = messages
        .map ((message) => createMessageHTML(message))
        .join('');
    messagesList.innerHTML = messagesHTML;
}

displayMessages();

//loginbtn callback
loginBtn.addEventListener('click', e => {
    e.preventDefault();
    if(!usernameInput.value) {
        return console.log('Must supply a username');
    }
    username = usernameInput.value;
    console.log(username);

    sendMessage({
        author: username,
        type: messageTypes.LOGIN
    });

    loginWindow.classList.add('hidden');
    chatWindow.classList.remove('hidden');
});

function sendMessage(message) {
    socket.emit('message', message);
}

sendBtn.addEventListener('click', e => {
    e.preventDefault();
    if (!messageInput.value){
        return console.log('Must supply message');
    }

    const date = new Date();
    const day = date.getDay();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 4)).slice(-2);
    const dateString = `${month}/${day}/${year}`;
    const message = {
        author: username,
        date: dateString,
        content: messageInput.value,
    }

    messageInput.value = '';

    sendMessage(message);
});
