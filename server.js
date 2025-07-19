import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

//configure env
dotenv.config();

//rest object
const app = express();

//rest api
app.get('/', (req, res) => {
  console.log("Homepage route accessed");
  res.send('<h1 style="color: red;">✨ Updated ESSENZA Homepage ✨</h1>');
});

//secure port
const PORT = process.env.PORT || 8081;

//run listen
app.listen(PORT,() => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});