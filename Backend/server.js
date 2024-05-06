const express = require('express');
const app = express();
const multer = require('multer');
const mongoose = require('mongoose');

// Podešavanje porta
const port = process.env.PORT || 3000;

// Povezivanje sa MongoDB bazom podataka
mongoose.connect('mongodb+srv://haracicbelmin21:belmin@cluster0.09ubkxa.mongodb.net/dbtravel_302')
  .then(() => console.log("Baza podataka povezana!"))
  .catch((error) => console.log(error));

// Middleware
app.use(express.json());
app.use(express.static(__dirname + "/uploads"));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Multer konfiguracija za upload slika
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Čuvanje slika u folderu "uploads"
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Čuvanje slike sa originalnim imenom
    },
  });

const upload = multer({ storage: storage });

// Endpoint za upload slika
app.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send('Nije otpremljena slika.');
    }
    res.send({ imageUrl: `http://localhost:${port}/uploads/${file.originalname}` });
  });

// Endpointi za rute vezane za destinacije, korisnike i rezervacije
const destController = require('./src/controllers/destinations.controller').controller;
const userController = require('./src/controllers/users.controller').controller;
const bookingController = require('./src/controllers/bookings.controller').controller;
app.use(destController);
app.use(userController);
app.use(bookingController);

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server sluša na http://localhost:${port}`);
});
