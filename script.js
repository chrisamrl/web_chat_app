const socket = io("ws://localhost:3000");
const chatInput = document.getElementById('typed-text');
const chatContainer = document.getElementById('chat-container');
const sendButton = document.getElementById('send');

//Function to add new chat
function appendChatBox(message) {
    const singleChat = document.createElement('div')
    singleChat.innerText = message
    chatContainer.append(singleChat)
}

//Adding Event Listener to the send button
sendButton.addEventListener('submit', e => {
    e.preventDefault()
    const message = chatInput.value
    appendChatBox(`You : ${message}`)
    socket.emit('send-chat-message', message)
    chatInput.value = ''
})

//When User Joined, 
const userName= prompt('Pick your username!')
appendChatBox("You're now in the chatroom")
socket.emit('new-user-joined', userName)

//User connected
socket.on('user-connected', names => {
    appendChatBox(`New User: ${names} has joined`)
})

//Receiving chat
socket.on('received-chat-message', message =>{
    appendChatBox(`${message.name}: ${message.text}`)
})

//User disonnected
socket.on('user-disconnected', names => {
    appendChatBox(`${names} has left`)
  })