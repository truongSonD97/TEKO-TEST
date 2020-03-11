"use strict"
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const moment = require('moment-timezone');
const dateVietNam = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");

var ticket = new Schema({

    //user_id
    //time_cluster_id
    //buy_time
    //status: 'pending','used','cancelled','paid'
    user_id:{
        type:String,
        required:[true,"Can not empty name movie"],
        index:true,
    },
    cluster_id:{
        type:String,
        required:[true,"Can not empty author"],
        index:true
    },
    checkout_time:{
        type: Date,
        $dateToString: { format: "%Y-%m-%d", date: "$date"},
        index:true,
        default: dateVietNam
    },
    status:{
        type:String,
        default: "pending"
    }
});

module.exports = mongoose.model("ticket",ticket);