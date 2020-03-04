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
    messageContentInput.value = '';
  }

};

addMessageForm.addEventListener('submit', e => {
  sendMessage(e);
})