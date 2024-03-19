const express = require("express");
const app = express();
const router = require("./src/routes/index");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use("/api", router);

const MongoUrl =
  "mongodb+srv://raghav:raghav1234@cluster0.aguznsx.mongodb.net/LoginTest";

mongoose.connect(MongoUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// mongoose
//   .connect(MongoUrl, {
//     autoCreate: true,
//     autoIndex: true,
//   })
//   .then((conn) => {
//     console.log("DB server connected");
//   })
//   .catch((except) => {
//     console.log("Error establishing db connection...");
//   });

// const User = mongoose.model(
//   "User",
//   new Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//   })
// );
app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.get("/signup", (req, res) => res.render("sign-up-form"));

app.post("/signup", async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      const result = await user.save();
      res.redirect("/");
    });
  } catch (err) {
    return next(err);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log("Server is running");
});

// app.get("/", (req, res) => {
//   res.send("<h1>Home Page</h1>");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });
