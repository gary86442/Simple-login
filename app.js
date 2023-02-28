const users = require("./models/user.json").users;
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const port = 3000;

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
