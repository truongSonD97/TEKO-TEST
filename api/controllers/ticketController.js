"use strict"
const ticket = require('../models/ticketModel');
const user = require('../models/userModel');

exports.addTicket = async (req, res) => {
    let { cluster_id,checkout_time,status} = req.body;
    let token = req.headers.authorization;

    if (typeof cluster_id === "undefined"
        || typeof status === "undefined"
        || typeof token === "undefined"
        || typeof checkout_time === "undefined") {
        res.status(422).json({ msg: "Invalid data" });
        return;
    }
    let userAddTicket = null ;
    try {
        userAddTicket = await user.findOne({token:token})
    } catch (error) {
        res.status(500).json({msg:"Server error when find user"})
        return
    }
   
    if(userAddTicket === null || userAddTicket.tokenExpire < Date.now()){
        res.status(423).json({msg:"Invalid Token"});
        return
    }

    const newTicket = new ticket({
        user_id: userAddTicket.id,
        cluster_id: cluster_id,
        checkout_time: checkout_time,
        status: status
    });

    try {
        await newTicket.save();
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    res.status(201).json({ msg: "success" });
}

exports.getAllTicket = async (req, res) => {
    let tickets = []
    try {
        tickets = await ticket.find().exec();
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
   res.status(200).json({msg:"success",data : tickets})
}
exports.getTicketById = async (req,res) => {
    let {id} = req.query;
    if(typeof id === "undefined"){
        res.status(422).json({msg:"Invalid data"})
        return
    }
    let ticketFind = null;
    try {
        ticketFind = await ticket.findById(id);
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    if(ticketFind === null){
        res.status(422).json({ msg: "Not Found ticket" });
        return;
    }
    res.status(200).json({msg:"success",data:ticketFind});
}

exports.confirmTicket = async(req,res) => {
    let {id_ticket,status} = req.body;
    let token = req.headers.authorization;
    if(typeof id_ticket === "undefined"
    || typeof status === "undefined"
    || typeof token === "undefined") {
        res.status(422).json({msg:"Invalid data"});
        return
    }
    let ticketFind = null;
    try {
        ticketFind = await ticket.findById(id_ticket);
    } catch (error) {
        res.status(500).json({ msg: error });
        return; 
    }
    if(ticketFind === null){
        res.status(422).json({ msg: "Invalid id ticket" });
        return
    }
    let userConfirm = null;
    try {
        userConfirm = await user.findOne({token:token});
    } catch (error) {
        res.status(500).json({ msg: error });
        return; 
    }
    if(userConfirm === null || userConfirm.tokenExpire < Date.now()){
        res.status(423).json({ msg: "Invalid Token" });
        return
    }
    ticketFind.status = status;
    try {
         await ticketFind.save();
    } catch (error) {
        res.status(500).json({ msg: error });
        return; 
    }
    res.status(202).json({msg:"Update Success"});

}