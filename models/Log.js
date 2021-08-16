const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true
    },
    level:{
        type:Number,
        required:true
    },
	input:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    time:{
        type:Date,
        required: true
    }
});

module.exports = mongoose.model("Log",logSchema);