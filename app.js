const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const upload = require("express-fileupload");
const session = require("express-session");
const flash = require("connect-flash");
const { mongoDBUrl } = require("./config/database");
const passport = require("passport");
const cors = require("cors");
const fs = require("fs");

mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true })
  .then(db => {
    console.log("MONGO connected");
  })
  .catch(err => console.log(err));
// mongoose.connect('mongodb://localhost:27017/cms').then(db => {
//      console.log('MONGO Connected')
// }).catch(err => console.log(err));

app.use(express.static(path.join(__dirname, "public")));

// Set View Engines

const {
  select,
  generateTime,
  paginate
} = require("./helpers/handlebars-helpers");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "home",
    helpers: { select: select, generateTime: generateTime, paginate: paginate }
  })
);
app.set("view engine", "handlebars");

app.use(cors({ origin: "*" }));

// Upload MiddleWare
app.use(upload());

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "bikramaryal",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// Local Variables using middlewares

app.use((req, res, next) => {
  res.locals.user = req.user || null;

  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");

  res.locals.from_errors = req.flash("flash_errors");

  res.locals.error = req.flash("error");
  next();
});

// Load Routes

const home = require("./routes/home/main");
const api = require("./routes/home/api");
const admin = require("./routes/admin/main");
const posts = require("./routes/admin/posts");
const categories = require("./routes/admin/categories");
const comments = require("./routes/admin/comments");

// Use ROutes

app.use("/", home);
app.use("/admin", admin);
app.use("/admin/posts", posts);
app.use("/admin/categories", categories);
app.use("/admin/comments", comments);
app.use("/downloads", api);

let PORT = process.env.PORT | 4500;

app.listen(PORT, () => {
  console.log(`Listening on port 4500`);
});
