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

//take in message object, and return corresponding message HTML
function createMessageHTML (message) {
    if(message.type === message.messageTypes.LOGIN) {
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
    messagesList.innerHTML = messageHTML;
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

    messages.push({
        author:username,
        type: messageTypes.LOGIN
    });

    loginWindow.classList.add('hidden');
    chatWindow.classList.remove('hidden');
    displayMessages();

    messageInput.value = '';

});

sendBtn.addEventListener('click', e => {
    e.preventDefault();
    if (!messageInput.value){
        return console.log('Must supply message');
    }

    const message = {
        author: username,
        date: new Date(),
        content: messageInput.value,
        type: messageTypes.RIGHT
    }

    messages.push(message);
    displayMessages();
});
