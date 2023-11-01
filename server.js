const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cookieParser = require("cookie-parser");
const cors=require('cors');
const bodyParser = require('body-parser')
const path = require('path');
const { json } = require('body-parser');
const multer = require('multer');


//Env File 
require('dotenv').config();

const app = express();
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ dest: 'uploads/' });

app.use(upload.single('file'))

// const storage = multer.memoryStorage(); // Store the file in memory
// const upload = multer({ storage });
// app.use(upload.single('file'));
app.use(cors());
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "routes")));


app.use(cookieParser());
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());

app.use(express.static('public'))
app.use('/api', routes);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}....`));


