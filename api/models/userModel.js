'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user = new Schema({
    email:{
        type: String,
        required:[true,"can't not empty"],
        index:true,
    },
    password:{
        type:String,
        required:[true,"can't not empty"],
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    phoneNumber:{
        type:String,
    },
    is_admin:{
        type:Boolean,
        default: false
    },
    token : {
        type:String,
    },
    tokenExpire:{
        type:Number
    }
})
module.exports = mongoose.model("user",user);