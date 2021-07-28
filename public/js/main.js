const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

//Join chat 

socket.emit('joinRoom', {username, room});

const { username, room  } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
console.log(username, room);
//message from server
socket.on('message', message =>{
    console.log(message);
    outputMessage(message);

    //Scrool Down
    chatMessages.scrollTop = chatMessages.scrollHeight;


});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //get message text
    const msg = e.target.elements.msg.value;

    //Emit message to the server
    socket.emit('chatMessage',msg);

    //Clear screen
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

} );

//Ouput message to DOM

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </span></p>
        <p class= "text" >
        ${message.text}
                    </p >`;
    docum