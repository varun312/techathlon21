const Question = require("../models/Question");
const User = require("../models/User");
const Log = require("../models/Log");

module.exports.adminloginz_get = async (req, res, next) => {
  console.log(req.cookies)
  if(req.cookies.V1ZkU2RHRlhORDA9===process.env.ADMIN_PASS) {
      next()
  }else {
      res.render("404")
  }
}

module.exports.ques_create_post = async (req, res) => {
    const { number, quesTitle, quesText, imagePath, pageTitle, comments, answer} = req.body;
    console.log(req.body)
  
    try {
      const ques = await Question.create({ number, title:quesTitle, text:quesText, imagePath, pageTitle, comments , answer});
      res.status(201).json("Created Successfully");
      console.log("After")
    }
    catch(err) {
      if(err.code===11000)
      res.status(400).json({ err:"duplicate" });
      console.log(err)
    }
}

module.exports.see_questions_get = async(req, res) => {
  data = await Question.find().sort({number:"ascending"});
  questions = []
  for(let i=0;i < data.length;i++){      
    questions.push({"imagePath":data[i].imagePath,"pageTitle":data[i].pageTitle,"comments":data[i].comments,"number":data[i].number,"title":data[i].title,"text":data[i].text, "answer":data[i].answer});
  }
  res.render("seeQuestions", {questions})
}

module.exports.ques_edit_post = async (req, res) => {
  const { number, quesTitle, quesText, imagePath, pageTitle, comments } = req.body;
  // console.log(req.body)

  try {
    const query = { number };
    const update = {
      "$set": { number, title:quesTitle, text:quesText, imagePath, pageTitle , comments}
    };
    await Question.updateOne(query, update)
    res.status(201).json("Created Successfully");
    // console.log("After")
  }
  catch(err) {
    console.log(err)
    res.status(400).json({ err });
  }
}

module.exports.ques_delete_post = async (req, res) => {
  const { number } = req.body;

  try {
    const query = { number };
    await Question.deleteOne(query)
    res.status(201).json("Created Successfully");
  }
  catch(err) {
    console.log(err)
    res.status(400).json({ err });
  }
}

module.exports.ban_post = async (req, res) => {
  User.ban(req.body.username)
}

module.exports.unban_post = async (req, res) => {
  User.unban(req.body.username)
}

module.exports.see_users_get = async(req, res) => {
  data = await User.find().sort({level:"descending",lastAnswer:"ascending"});
  users = []
  for(let i=0;i < data.length;i++){      
    users.push({"username":data[i].username,"name":data[i].name,"email":data[i].email,"isBanned":data[i].isBanned,"isDpsVk":data[i].isDpsVk,"lastAnswer":data[i].lastAnswer,"level":data[i].level});
  }
  res.render("seeUsers", {users})
}

module.exports.logs_get = async (req, res) => {
  data = await Log.find({},{__v:0,_id:0}).sort({time:"descending"});
  res.json(data)
}