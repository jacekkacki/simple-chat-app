const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content))
socket.on('join', ( name ) => addMessage('Chat Boy', `<li><b>${name}</b> has joined the conversation!</li>`))
socket.on('leave', ( name ) => addMessage('Chat Boy', `<li><b>${name}</b> has left the conversation... :(</li>`))

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = (e) => {
  e.preventDefault();
  let name = userNameInput.value;

  if(name === ''){
    alert('User name is empty !');
  } else {
    userName = name;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('join', name);
  }
};

loginForm.addEventListener('submit', e => {
  login(e);
});

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if(author === userName){
    message.classList.add('message--self');
  }

  if(author === 'Chat Boy'){
    message.classList.add('message--chatBoy');
  }

  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
};

const sendMessage = (e) => {
  e.preventDefault();
  let messageContent = messageContentInput.value;

  if(messageContent === ''){
    alert('Message is empty !');
  } else {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', { author: userName, content: messageContent });
    messageContentInput.value = '';
  }

};

addMessageForm.addEventListener('submit', e => {
  sendMessage(e);
})