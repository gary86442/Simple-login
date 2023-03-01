const users = require("./models/user.json").users;
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const port = 3000;

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

//首頁
app.get("/", (req, res) => {
  res.render("index");
});
//處理登入提交
app.post("/", (req, res) => {
  const userKeyIn = req.body;
  //驗證身分
  let user = users.find(
    (user) =>
      user.email === userKeyIn.userEmail &&
      user.password === userKeyIn.userPassword
  );
  //成功登入
  if (user) {
    res.render("welcome", { user });
  } else {
    //失敗回首頁 顯示錯誤
    const incorrect = "incorrect";
    res.render("index", { incorrect });
  }
});
// 監聽伺服器
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
