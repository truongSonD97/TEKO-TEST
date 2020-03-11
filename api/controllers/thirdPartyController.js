"use strict"
const thirdParty = require('../models/thirdPartyModel');
const bcrypt = require("bcrypt");
const saltRound = 10;
var randomstring = require("randomstring");
const movieController = require("./movieController");
const clusterController = require("./clusterController")
const ticket = require("../models/ticketModel");
const ticketController = require("./ticketController")

exports.register = async (req, res) => {
    if (typeof req.body.email === "undefined"
        || typeof req.body.password === "undefined"
        || typeof req.body.companyName === "undefined"
        || typeof req.body.phoneNumber === "undefined") {
        res.status(422).json({ msg: "Invalid data" });
        return;
    }
    let { email, password, companyName, phoneNumber } = req.body;
    if (email.indexOf("@") === -1 && email.indexOf(".") === -1
        || password.length < 6) {
        res.status(422).json({ msg: "Invalid data" });
        return;
    }
    let userFind = false
    try {
        userFind = await thirdParty.exists({ email: email });

    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }

    if (userFind) {
        res.status(409).json({ msg: "Email already exist" });
        return;
    }
    password = bcrypt.hashSync(password, saltRound);
    const newThirdParty = new thirdParty({
        email: email,
        password: password,
        companyName: companyName,
        phoneNumber: phoneNumber,
        token: randomstring.generate({
            length: 12,
        })
    });

    try {
        await newThirdParty.save();
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    res.status(201).json({ msg: "success" });
}

exports.login = async (req, res) => {
    if (req.body.email === "undefined" || req.body.password === "undefined") {
        res.status(402).json({ msg: "Invalid data" });
        return;
    }
    let { email, password } = req.body;
    let ThirdUserFind = null;
    try {
        ThirdUserFind = await thirdParty.findOne({ email: email });
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    if (ThirdUserFind == null) {
        res.status(422).json({ msg: "Invalid data" });
        return
    }
    if (!bcrypt.compareSync(password, ThirdUserFind.password)) {
        res.status(422).json({ msg: "Invalid password" });
        return;
    }

    res.status(200).json({
        smg: "success",
        user: {
            email: ThirdUserFind.email,
            companyName: ThirdUserFind.companyName,
            phoneNumber: ThirdUserFind.phoneNumber,
        },
        //add token: asfasdff,
        token: ThirdUserFind.token,
    })
}

exports.changeToken = async (req, res) => {
    let { token } = req.body;
    if (typeof token === "undefined") {
        res.status(422).json({ msg: "Invalid id" });
        return;
    }
    let ThirdUserFind = null;
    try {
        ThirdUserFind = await thirdParty.findOne({ token: token })

    } catch (error) {

        res.status(500).json({ msg: "find id by token" + error });
    }
    if (ThirdUserFind === null) {
        res.status(422).json({ msg: "Not found user" });
        return
    }
    //set new token for user
    let newToken = randomstring.generate({
        length: 12,
    })
    console.log("THIRD USER FIND -----------",ThirdUserFind);
    ThirdUserFind.token = newToken;
    console.log("THIRD USER FIND -----------",ThirdUserFind);
    try {

        await ThirdUserFind.save();

    } catch (error) {
        res.status(500).json({ msg: "save token error " + error });
        return;
    }
    res.status(202).json({ msg: "success", newToken: newToken });
}

exports.getMovieByStatus = movieController.getMovieByStatus;
exports.getMovieById = movieController.getMovieById;
exports.getAllMovie = movieController.getAllMovie;
exports.getCluster = clusterController.getAllCluster;

exports.orderTicket = async (req, res) => {
    let { cluster_id,checkout_time,status} = req.body;
    let token = req.headers.authorization;

    if (typeof cluster_id === "undefined"
        || typeof status === "undefined"
        || typeof token === "undefined"
        || typeof checkout_time === "undefined") {
        res.status(422).json({ msg: "Invalid data" });
        return;
    }
    let thirdUserAddTicket = null ;
    try {
        thirdUserAddTicket = await thirdParty.findOne({token:token})
    } catch (error) {
        res.status(500).json({msg:"Server error when find user"})
        return
    }
   
    if(thirdUserAddTicket === null){
        res.status(423).json({msg:"Invalid Token"});
        return
    }

    const newTicket = new ticket({
        user_id: thirdUserAddTicket.id,
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
};

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
    let thirdUserConfirm = null;
    try {
        thirdUserConfirm = await thirdParty.findOne({token:token});
    } catch (error) {
        res.status(500).json({ msg: error });
        return; 
    }
    if(thirdUserConfirm === null){
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

};
exports.getTicketById = ticketController.getTicketById;