const User = require("../models/User");
const Log = require("../models/Log");
const jwt = require("jsonwebtoken");
const Question = require("../models/Question");

module.exports.play_get = async (req, res, next) => {
  res.render("timer", { isCorrect: false });
};

// controller actions
module.exports.play_post = async (req, res) => {
  const num = res.locals.question.number;
  const ans = req.body.answerString;

  const isCorr = await Question.checkAns(num, ans);

  if (isCorr === false) {
    const log = await Log.create({
      username: res.locals.user.email,
      level: res.locals.user.level,
      input: ans,
      time: Date.now() + 1000 * 60 * 60 * 5.5,
      status: false,
    });
    res.json({ correct: false });
  } else {
    const log = await Log.create({
      username: res.locals.user.email,
      level: res.locals.user.level,
      input: ans,
      time: Date.now() + 1000 * 60 * 60 * 5.5,
      status: true,
    });
    const user = res.locals.user;
    user.level += 1;
    await user.save();
    res.json({ correct: true });
  }
};

module.exports.leaderboard_get = async (req, res) => {
  data = await User.find({}, "name level").sort({
    level: "descending",
    lastAnswer: "ascending",
  });
  leaderboard = [];
  cnt = 1;
  for (let i = 0; i < data.length; i++) {
    //check if user is from VK
    let name;
    name = data[i].name;
    console.log(data[i])
    {
      if (data[i].level == 10) {
        leaderboard.push({ rank: cnt, name: name, level: "Completed" });
      } else {
        leaderboard.push({
          rank: cnt,
          name: name,
          level: data[i].level,
        });
      }
      cnt += 1;
    }
  }
  res.render("leaderboard", { leaderboard: leaderboard });
};

module.exports.question_get = async (req, res) => {
  res.status(201).json({ question: res.locals.question });
};
