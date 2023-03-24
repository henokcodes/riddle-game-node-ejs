const express = require("express");
var path = require("path");
let app = express.Router();
const bcrypt = require("bcryptjs");
const Question = require('../models/question')
const User = require("../models/user");
var level = 'easy';


app.get("/", (req, res, next) => {
  if (
    req.cookies.user_name != null &&
    req.cookies.isLoggedIn == "true" &&
    req.cookies.user_role != "admin"
  ) {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
  } else if (
    req.cookies.user_name != null &&
    req.cookies.user_role == "admin"
  ) {
    // res.sendFile(path.join(__dirname, "../views", "admin.html"));
    res.redirect('/admin')
  } else {
    res.redirect("/login");
  }
});

app.get('/admin', async (req, res) => {
  const questions = await Question.find();
  res.render('admin.html', { questions });
});

app.get("/signup", function (req, res, next) {
  res.render("signup");
});

app.get("/login", function (req, res, next) {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const response = await bcrypt.compare(password, user.password);
  // Check if password is correct
  if (!response) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // If user exists and password is correct, set cookies and redirect to dashboard
  res.cookie("isLoggedIn", true);
  res.cookie("user_name", user.username);
  res.cookie("user_role", user.role);
  res.redirect("/");
});

app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.cookie("user_name", null);
    res.cookie("isLoggedIn", false);
    // Redirect to the home page or any other page after logout
    res.redirect("/login");
  });
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  let score = 0;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      req.flash("error_msg", "Email already taken.");
      res.redirect("/signup");
    } else {
      const newUser = new User({
        username,
        email,
        password,
        score,
      });

     

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              req.flash(
                "success_msg",
                "You are now registered and can log in."
              );
              res.redirect("/login");
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

app.get("/dashboard", async function (req, res) {
  try {
    const users = await User.find();
    const single_user = users.map((user) => {
      console.log(user.username);
      return user;
    });
    let current_user = req.cookies.user_name;
    console.log("************", current_user);
    res.render("dashboard", { single_user, current_user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});

app.post("/updatescore", async (req, res) => {
  const username = req.body.username;
  const score = parseInt(req.body.score);
  var d = new Date();

  const obj = {
    timestamp: d.toLocaleString(),
    score: score,
  };

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  await User.updateOne({ username: username }, { $push: { score: obj } });

  res.send("success");
});

app.post("/gethighscore", async (req, res) => {
  const username = req.body.username;

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  res.send(user.score.sort((a, b) => b.score - a.score));
});

app.post("/getallscore", async (req, res) => {
  const user = await User.find();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  let data = [];
  let max = {};
  let obj;
  for (let ele of user) {
    max.score = 0;
    for (let elem in ele.score) {
      // console.log(ele.score[elem])
      if (ele.score[elem].score >= max.score) {
        max.score = ele.score[elem].score;
        max.timestamp = ele.score[elem].timestamp;
      }
    }
    if (max.score > 0) {
      obj = {
        username: ele.username,
        score: {
          score: max.score,
          timestamp: max.timestamp,
        },
      };

      data.push(obj);
    }
  }

  data.sort((a, b) => b.score.score - a.score.score);
  console.log(data);
  res.send(data);
});








app.post('/questions', async (req, res) => {
  const { text, choices, answer, difficulty } = req.body;
  const question = new Question({ text, choices: choices.split(','), answer, difficulty });
  await question.save();
  res.redirect('/');
});

app.post('/post_level', function(req, res) {
   level = req.body.level;
   res.redirect('back')
});

app.get('/display_all_questions', async (req, res) => {
  const questions = await Question.find({difficulty: level});
  res.send({questions})
  
  
});

app.delete('/questions/:id', async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({ _id: req.params.id });
    if (!question) {
      return res.status(404).send();
    }
    res.redirect('/admin');
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});




app.get("/error", (req, res, next) => {
  res.status(401).sendFile(path.join(__dirname, "../html", "error.html"));
});

app.use((err, req, res, next) => {
  res.redirect("/");
});

app.use((req, res, next) => {
  res.status(404).send("404, resource not found");
});

module.exports = app;
