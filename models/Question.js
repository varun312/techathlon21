const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    number:{
        type:Number,
        required:true,
        unique:true
    },
    quesTitle:{
        type:String,
        required:false,
        default:""
    },
    text:{
        type:String,
        required:false,
        default:""
    },
    imagePath:{
        type:String,
        required:false,
        default:""
    },
    pageTitle:{
        type:String,
        required:false,
        default:"Techathlon"
    },
    comments:{
        type:String,
        default: ""
    },
    answer:{
        type:String,
        required:true,
    },
    
});

questionSchema.statics.checkAns = async function(number, clientAnswer) {
    const question = await this.findOne({ number });
    if (question) {
      if(question.answer === clientAnswer) {
        return(true)
      }else {
        return(false);
      }
    }
  };

  module.exports = mongoose.model("Question",questionSchema); 


