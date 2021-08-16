if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const Question = require("./models/Question");
const authRoutes = require("./routes/authRoutes");
const playRoutes = require("./routes/playRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/Middleware");
const dbURL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// DB CONNECTION
async function connectDB() {
  await mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
}
connectDB();

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/techathlon", (req, res) => res.render("crypticHome"));
app.use(authRoutes);
app.use(playRoutes);
app.use(adminRoutes);
app.get("*", (req, res) => res.render("404"));
