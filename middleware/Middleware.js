const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Question = require("../models/Question");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        // console.log(decodedToken)
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log("ERRERERERERERER\n\n", err)
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const levelInfo = async (req, res, next) => {
  if (res.locals.user) {
    if (res.locals.user.level === 10) {
      res.locals.question = {}
      res.locals.question.quesTitle = "gg";
      res.locals.question.text = "gg";
      res.locals.question.pageTitle = "gg";
      res.locals.question.comments = "gg";
    } else {
      const levInfo = await Question.findOne(
        { number: res.locals.user.level },
        { answer: 0, _id: 0 }
      );
      res.locals.question = levInfo;
    }
    next();
  }else {
    res.redirect('/login')
  }
};

const stopBanned = async (req, res, next) => {
  if (res.locals.user) {
    if (res.locals.user.isBanned) {
      res.render("banned");
    } else {
      next()
    }
  } else {
    res.redirect('/login')
  }
};

module.exports = { requireAuth, checkUser, levelInfo, stopBanned };
