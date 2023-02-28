const users = require("./models/user.json").users;
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const port = 3000;

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const userKeyIn = req.body;
  let user = users.filter(
    (user) =>
      user.email === userKeyIn.emil && user.password === userKeyIn.userPassword
  );
  if (user.length) {
    res.render("welcome", { user });
  } else {
    const incorrect = "incorrect";
    res.render("index", { incorrect });
  }
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
