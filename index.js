const express = require('express');
const app = express();
const mongoose = require('mongoose');



require('dotenv/config');


const formData = require('express-form-data');
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost",  "http://127.0.0.1","http://20.20.20.25"],
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true
  }
});
let users = {};




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse());
app.options('*', cors())
app.use(cors())

// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, family: 4, })
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log("Connected to db")
// })

// import routes
const from_esp32_routes = require('./routes/from_esp32_routes');

// routes
app.use('/api/from_esp32', from_esp32_routes)

app.get('/', (req, res) => {

  console.log("ada pengambilan data")
  res.send('ii dia pyan fdssfsd ');
})

// app.get('/ambil_data_1', (req, res) => {
//   res.send('ini ambil data 1');
// })

const port = process.env.PORT || 3001;

io.on('connection', (socket) => {
  let userId = socket.id;

  if (!users[userId]) users[userId] = [];
  users[userId].push(socket.id);
  console.log('socket connected', userId);

 
  socket.on('angin', (_) => {
    console.log(" ini sebelum broadcast angin")
    socket.broadcast.emit('angin', {
      kecepatan_per_detik : _.kecepatan_per_detik,
      kecepatan_per_jam : _.kecepatan_per_jam,
      rps : _.rps,
      rpm : _.rpm
    });
  })

  socket.on('curah_hujan', (_) => {
    console.log(" ini sebelum broadcast hujan")
    socket.broadcast.emit('curah_hujan', {
      jumlah_tip : _.jumlah_tip,
      curah_hujan_per_menit : _.curah_hujan_per_menit,
      curah_hujan_per_jam : _.curah_hujan_per_jam,
      curah_hujan_per_hari : _.curah_hujan_per_hari
    });

  })

  socket.on('disconnect', (_) => {
    console.log('user disconnected');
    console.log(_)
  });



});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

