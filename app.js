const users = require("./models/user.json").users;
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const port = 3000;
const session = require("express-session");

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "test", resave: false, saveUninitialized: true }));

//首頁
app.get("/", (req, res) => {
  const user = req.session;
  if (Object.keys(user).length > 2) {
    res.render("welcome", { user });
  } else {
    res.render("index");
  }
});
//處理登入提交
app.post("/", (req, res) => {
  const { userEmail, userPassword, keepLoginCheck } = req.body;
  //驗證身分
  let user = users.find(
    (user) => user.email === userEmail && user.password === userPassword
  );
  //成功登入
  if (user) {
    console.log(keepLoginCheck);
    if (keepLoginCheck) {
      req.session.userEmail = user.email;
      req.session.userPassword = user.password;
      req.session.firstName = user.firstName;
    }
    res.render("welcome", { user });
  } else {
    //失敗回首頁 顯示錯誤
    const incorrect = "incorrect";
    res.render("index", { incorrect });
  }
});

// 登出 (使用session delete 或是 req.session.destroy() )
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
// 監聽伺服器
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
