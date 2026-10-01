const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

const USER = {
  username: "Sumit",
  password: "1718",
};

app.get("/", (req, res) => {
  if (!req.cookies.user) {
    return res.redirect("/login");
  }

  res.render("index", {
    user: req.cookies.user,
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username.toLowerCase() === USER.username.toLowerCase() &&
    password === USER.password
  ) {
    res.cookie("user", USER.username);
    return res.redirect("/");
  }

  res.send("Wrong username or password");
});

app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});