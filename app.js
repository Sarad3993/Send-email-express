require("dotenv").config();
const express = require("express");
const app = express();

const sendEmail = require("./controllers/sendEmail");

app.get("/", (req, res) => {
  res.send('<h1>Email Project</h1> <a href="/send">Send Email</a>');
});

app.get("/send", sendEmail);

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Listening on port ${port}`);
  }
});
