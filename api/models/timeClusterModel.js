"use strict"
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const moment = require('moment-timezone');
const dateVietNam = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");

var timeCluster = new Schema({
    //move_id
    //start_time
    //end_time
    //ticket_amount
    //ticket_price
    //remain_ticket
    //status: 'disabled,active',

    movie_id:{
        type:String,
        required:[true,"Can not empty name movie"],
        index:true,
    },
    start_time:{
        type:Date,
        required:[true,"Can not empty author"]
    },
    end_time : {
        type: Date,
        required:[true,"Cant not empty endTIme"]
    },
    ticket_price : {
        type: Number,
        required:[true,"Cant not empty price"]
    },
    ticket_amount:{
        type: Number,
        required:[true,"Can not empty amount"]
    },
    remain_ticket:{
        type:Number,
        require:[true,"Can not empty remain"]
    },
    status:{
        type:String,
        default:"active"
    }
});

module.exports = mongoose.model("cluster",timeCluster);