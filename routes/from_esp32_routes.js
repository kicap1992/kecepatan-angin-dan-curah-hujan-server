const express = require('express');
const router = express.Router();
require('dotenv/config');
// const { deviceModel, newDeviceModel, notificationModel } = require('../models/device_model');
const io_sock = require("socket.io-client");
// const socket = io_sock(`https://tanah-longosor-be.herokuapp.com/`);
const socket = io_sock(process.env.URL+":"+process.env.PORT);







router.post('/', async (req, res) => {
  const { kecepatan_per_detik , kecepatan_per_jam , rps,rpm} = req.body;
  console.log("ini kecepatan per detik",kecepatan_per_detik)
  console.log("ini kecepatan per jam",kecepatan_per_jam)
  console.log("ini rps",rps)
  console.log("ini rpm",rpm)
  socket.emit('angin', {
    kecepatan_per_detik : kecepatan_per_detik,
    kecepatan_per_jam : kecepatan_per_jam,
    rps : rps,
    rpm : rpm
  });
  res.status(200).send({ status: true, message: "success" });
})

router.post('/curah_hujan', async (req, res) => {
  // const device_list = await newDeviceModel.find({});
  const { jumlah_tip , curah_hujan_per_menit , curah_hujan_per_jam , curah_hujan_per_hari } = req.body;
  console.log("ini jumlah tip",jumlah_tip)
  console.log("ini curah hujan per menit",curah_hujan_per_menit)
  console.log("ini curah hujan per jam",curah_hujan_per_jam)
  console.log("ini curah hujan per hari",curah_hujan_per_hari)
  socket.emit('curah_hujan', {
    jumlah_tip : jumlah_tip,
    curah_hujan_per_menit : curah_hujan_per_menit,
    curah_hujan_per_jam : curah_hujan_per_jam,
    curah_hujan_per_hari : curah_hujan_per_hari
  })
  res.status(200).send({ status: true, message: "success" });
})


module.exports = router;