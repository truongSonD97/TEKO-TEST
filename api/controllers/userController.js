"use strict"
const user = require('../models/userModel');
const bcrypt = require("bcrypt");
const saltRound = 10;
var randomstring = require("randomstring");
const movieController = require("./movieController");
const clusterController = require("./clusterController");
const ticketController = require("./ticketController")


exports.register = async (req, res) => {
    if (typeof req.body.email === "undefined"
        || typeof req.body.password === "undefined"
        || typeof req.body.firstName === "undefined"
        || typeof req.body.lastName === "undefined"
        || typeof req.body.phoneNumber === "undefined") {
        res.status(422).json({ msg: "Invalid data" });
        return;
    }
    let { email, password, firstName, lastName, phoneNumber, is_admin } = req.body;
    if (email.indexOf("@") === -1 && email.indexOf(".") === -1
        || password.length < 6) {
        res.status(422).json({ msg: "Invalid data" });
        return;
    }
    let userFind = false
    try {

        userFind = await user.exists({ email: email });


    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }

    if (userFind) {
        res.status(409).json({ msg: "Email already exist" });
        return;
    }
    password = bcrypt.hashSync(password, saltRound);
    const newUser = new user({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        is_admin: is_admin || false
    });

    try {
        await newUser.save();
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
    let userFind = null;
    try {
        userFind = await user.findOne({ email: email });
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    if (userFind == null) {
        res.status(422).json({ msg: "Invalid data" });
        return
    }
    if (!bcrypt.compareSync(password, userFind.password)) {
        res.status(422).json({ msg: "Invalid password" });
        return;
    }

    //generate a token
    //store token to user,
    userFind.token = randomstring.generate({
        length: 12,
      });
    userFind.tokenExpire = Date.now() + 86400000;
    try {
        await userFind.save();
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }

    res.status(200).json({
        smg: "success",
        user: {
            email: userFind.email,
            firstName: userFind.firstName,
            lastName: userFind.lastName,
            phoneNumber: userFind.phoneNumber,
            id: userFind._id

        },
        //add token: asfasdff,
        token: userFind.token,
    })
}
exports.logout = async (req, res) => {
    let { id } = req.body;
    if (typeof id === "undefined") {
        res.status(422).json({ msg: "Invalid id" });
        return;
    }
    let userFind = null;
    try {
        userFind = await user.findById(id)
    } catch (error) {
        res.status(500).json({ msg: error });
    }
    if (userFind === null) {
        res.status(422).json({ msg: "Not found user" });
        return
    }
    //clear new token for user, 
    userFind.token = randomstring.generate({
        length: 12,
      });
    try {
        await userFind.save();
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    res.status(202).json({msg:"success"});



}

exports.getMovieByStatus = movieController.getMovieByStatus;
exports.getMovieById = movieController.getMovieById;
exports.getAllMovie = movieController.getAllMovie;

exports.getAllCluster = clusterController.getAllCluster;
exports.getClusterById = clusterController.getClusterById;

exports.orderTicket = ticketController.addTicket;
exports.getTicketById = ticketController.getTicketById;
exports.confirmTicket = ticketController.confirmTicket;
