const express = require('express');
const router = express.Router()
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const sendRouter = require('./routes/send');
const delivertSMTPRouter = require('./routes/delivery');
const listRouter = require('./routes/list');
const templateRouter = require('./routes/template');
const campainRouter = require('./routes/campain');

app.use('/send', sendRouter);
app.use('/delivery', delivertSMTPRouter);
app.use('/list', listRouter);
app.use('/template', templateRouter);
app.use('/campain', campainRouter);

app.listen(port, ()=>{
    console.log(`server is on port: ${port}`);
});