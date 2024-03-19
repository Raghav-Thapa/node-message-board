const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running");
});

app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})