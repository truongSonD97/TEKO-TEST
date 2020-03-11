"use strict"
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const moment = require('moment-timezone');
const dateVietNam = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");

var movie = new Schema({

    //status: disabled,active
    name:{
        type:String,
        required:[true,"Can not empty name movie"],
        index:true,
        uppercase:true
    },
    director:{
        type:String,
        required:[true,"Can not empty author"]
    },
    duration : {
        type: String,
        required:[true,"Cant not empty duration"]
    },
    quality:{
        type: Array,
        required:[true,"Can not empty quality"]
    },
    country:{
        type:String,
        required:[true,"Can not empty country"]
    },
    release:{
        type: Date,
        $dateToString: { format: "%Y-%m-%d", date: "$date"},
        default: dateVietNam
    },
    status:{
        type:String,
        required: [true,"Can not status movie"]
    }
});

module.exports = mongoose.model("movie",movie);