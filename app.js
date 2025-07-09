require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Message = require("./models/Message.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const { messageSchema } = require("./schemaJoi.js");
const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

PORT = process.env.PORT;

// const DB_URL = process.env.ATLASDB_URL;

const DB_URL = process.env.ATLASDB_URL || process.env.LOCAL_DB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((e) => {
    console.log(e);
  });
async function main() {
  await mongoose.connect(DB_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl: DB_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});

app.get("/", (req, res) => {
  res.render("allParts/index");
});

const validateMessage = (req, res, next) => {
  let { error } = messageSchema.validate(req.body.connect);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

app.post(
  "/submit",
  validateMessage,
  wrapAsync(async (req, res, next) => {
    const newMessage = new Message(req.body.contact);
    await newMessage.save();
    req.flash("success", "Message send Successfully");
    res.redirect("/");
  })
);

app.get("/Admin", async (req, res) => {
  const { AccessToken } = req.query;
  if (AccessToken === process.env.AccessToken) {
    const allMessages = await Message.find({});
    res.render("Messages/allMessages.ejs", { allMessages });
  } else {
    res.render("includes/pageNotFound.ejs");
  }
});

app.use((req, res) => {
  res.status(404).render("includes/pageNotFound.ejs");
});

app.use((error, req, res, next) => {
  let { status = 500, message = "Something Went Wrong!" } = error;
  res.status(status).render("error.ejs", { error });
});

app.listen(PORT, () => {
  console.log("server is listening to port 8080");
});
