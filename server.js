const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html')
})

//identificando uma conexao estabelecida
io.on('connection', (socket) => {
  console.log('new user connected',socket.id);

  //chama callback quando o usuario desconecta
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  //escutando um request com o nome 'mensagem'
  socket.on('mensagem', (mensagem) => {
    console.log(mensagem, socket.id)

    //servidor enviando mensagem para todos os clientes menos para o proprio socket
    socket.broadcast.emit('msg', 'Mensagem para todos menos o socket')
  })

  socket.emit('all users', 'mensagem para todos inclusive o socket');

})

http.listen(3000, function(){
  console.log('listening 3000 port')
})