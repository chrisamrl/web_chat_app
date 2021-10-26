const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://127.0.0.1:5500']
    }
})

const users = {}

io.on("connection", socket => {
    socket.on('new-user-joined', name => {
        users[socket.id]= name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('received-chat-message', {text : message, name: users[socket.id]})
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
      })   
})
