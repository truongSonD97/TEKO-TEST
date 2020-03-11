'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var thirdParty = new Schema({
    companyName:{
        type: String,
        required:[true,"can not empty"],
        index:true,
        uppercase: true,
    },
    email:{
        type : String,
        required:[true,"can not empty"],
        index:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"can not empty"],
    },
    phoneNumber:{
        type:String,
    },
    token : {
        type:String,
    },
    tokenExpire:{
        type:Number,
        default: 0
    }
})
module.exports = mongoose.model("thirdParty",thirdParty);