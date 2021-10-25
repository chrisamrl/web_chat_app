const socket = io("ws://localhost:3000");
const form = document.getElementById('send')
const chatInput = document.getElementById('typed-text')
const container = document.getElementById('chat-container')

const namel= prompt('What is your name?')
appendMessage("you joinedx")

socket.emit('new-user', namel)

socket.on('chat-message', message =>{
    appendMessage(`${message.name}: ${message.message}`)
})

socket.on('user-connected', names => {
    appendMessage(`${names} connected`)
})

socket.on('user-disconnected', names => {
    appendMessage(`${names} disconnected`)
  })

form.addEventListener('submit', e => {
    e.preventDefault()
    const message = chatInput.value
    appendMessage(`You : ${message}`)
    socket.emit('send-chat-message', message)
    chatInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    container.append(messageElement)
}