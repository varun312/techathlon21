const User = require("../models/User");
const Log = require("../models/Log");
const jwt = require("jsonwebtoken");
const Question = require("../models/Question");

module.exports.play_get = async (req, res, next) => {
  if (Math.floor(new Date().getTime() / 1000) <= 1629223920) {
    res.render("timer", { isCorrect: false });
  } else {
    res.render("play", { isCorrect: false });
  }
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
  // let data = await User.find({}, "name level").sort({
  //   level: "descending",
  //   lastAnswer: "ascending",
  // });
  let users = await User.find({ isBanned: false }).sort({
    level: -1,
  });

  let logs = await Log.find({ status: true }).sort({
    level: "descending",
    time: "ascending",
  });

  let data = [];

  for (let log of logs) {
    for (let user of users) {
      if (user.email === log.username) {
        // console.log(`${user.name}, ${user.level}`);
        if (!data.includes(user)) data.push(user);
      }
    }
  }

  let zeroLevelUsers = await User.find({ level: 0 });

  for (let user of zeroLevelUsers) {
    if (!data.includes(user)) data.push(user);
  }

  let kevin = await User.findOne({ name: "Kevin" });
  data.unshift(kevin);

  leaderboard = [];
  cnt = 1;
  for (let i = 0; i < data.length; i++) {
    let name;
    name = data[i].name;
    {
      if (data[i].level == 10) {
        leaderboard.push({ rank: cnt, name: name, level: "Completed" });
      } else if (data[i].name !== "hm") {
        leaderboard.push({
          rank: cnt,
          name: name,
          level: data[i].level,
        });
      }
      cnt++;
    }
  }
  res.render("leaderboard", { leaderboard: leaderboard });
};

module.exports.question_get = async (req, res) => {
  res.status(201).json({ question: res.locals.question });
};
