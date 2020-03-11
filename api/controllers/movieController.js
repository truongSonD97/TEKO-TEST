"use strict"
const movie = require('../models/movieModel');
const user = require("../models/userModel");
const moment = require('moment-timezone');
const dateVietNam = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");

exports.insertMovie = async (req, res) => {
    //const token = req.headers.authorization;
    //const user = userModel.find({token});
    //if(user && user.isAdmin && user.tokenExpire > Date.now()){}
    let { name, director, duration, quality, country, release, status } = req.body;
    let token = req.headers.authorization;
    if (typeof name === "undefined"
        || typeof director === "undefined"
        || typeof duration === "undefined"
        || typeof quality === "undefined"
        || typeof country === "undefined"
        || typeof status === "undefined"
    ) {
        res.status(422).json({ msg: "Invalid input movies" });
        return;
    }

    let userAddMovie = null;
    try {
        userAddMovie = await user.findOne({token: token});
        console.log("USER FIND BY TOKEN ----------",userAddMovie);
    } catch (error) {
        res.status(500).json({ msg: "server error: ", error });
        return;
    }
    if( userAddMovie === null || userAddMovie.tokenExpire < Date.now() || !userAddCluster.is_admin){
        res.status(423).json({msg:"Invalid Token"});
        return
    }
    const newMovie = new movie({
        name: name,
        director: director,
        duration: duration,
        quality: quality,
        country: country,
        release: release || dateVietNam,
        status: status
    })
    try {
        await newMovie.save();
    } catch (error) {
        res.status(500).json({ msg: "server error: ", error });
        return;
    }

    res.status(201).json({
        msg: "success"
    })
}
exports.getAllMovie = async (req, res) => {
    let movies = []
    try {
        movies = await movie.find().exec();
    } catch (error) {
        res.status(500).json({ msg: "Server error when get data :", error })
        return
    }
    res.status(200).json({ msg: "success", data: movies })
}
exports.updateMovie = async (req, res) => {
    let { id, name, director, duration, quality, country, release, status } = req.body;
    let token = req.headers.authorization;
    if (
        typeof id === "undefined"
        || typeof token === "undefined"
    ) {
        res.status(422).json({ msg: "Invalid input movies" });
        return;
    }
    let userUpdateMovie = null;
    try {
        userUpdateMovie = await user.findOne({token: token});
    } catch (error) {
        res.status(500).json({ msg: "server error: ", error });
        return;
    }
    if(userUpdateMovie === null || userUpdateMovie.tokenExpire < Date.now() || !userAddCluster.is_admin){
        res.status(423).json({msg:"Invalid Token"});
    }
    let movieFind = null;

    try {
        movieFind = await movie.findById(id)
    } catch (error) {
        res.status(500).json({ smg: "Server error :", error });
        return
    }
    if (movieFind === null) {
        res.status(422).json({ msg: "Not found movie" });
        return;
    }
    movieFind.name = name || movieFind.name;
    movieFind.director = director || movieFind.director;
    movieFind.duration = duration || movieFind.duration;
    movieFind.quality = quality || movieFind.quality;
    movieFind.release = release || movieFind.release;
    movieFind.status = status || movieFind.status;

    try {
        await movieFind.save();
    } catch (error) {
        res.status(500).json({ msg: "Server error to update to database", error });
        return;
    }
    res.status(202).json({ smg: "Update success" });
}
exports.deleteMovie = async (req, res) => {
    let { id } = req.query;
    if (typeof id === "undefined") {
        res.status(422).json({ msg: "Invalid id" });
        return
    }
    let token = req.headers.authorization;
    let userDeleteMovie = null;
    try {
        userDeleteMovie = await user.findOne({token: token});
    } catch (error) {
        res.status(500).json({ msg: "server error: ", error });
        return;
    }
    if(userDeleteMovie === null || userDeleteMovie.tokenExpire < Date.now() || !userAddCluster.is_admin){
        res.status(423).json({msg:"Invalid Token"});
    }
    let movieFind = null;
    try {
        movieFind = await movie.findById(id);
    } catch (error) {
        res.status(500).json({ msg: "Server error when find ", error });
        return;
    }
    if (movieFind === null) {
        res.status(422).json({ smg: "Not found id" });
        return;
    }
    try {
        await movieFind.remove();
    } catch (error) {
        res.status(500).json({ msg: "Server error when delete ", error });
    }

    res.status(200).json({ msg: "success" });

}
exports.getMovieById = async (req, res) => {

    let { id } = req.query;
    if (typeof id === "undefined") {
        res.status(422).json({ msg: "Invalid data" });
        return
    }
    let movieFind = null;
    try {
        movieFind = await movie.findById(id);
    } catch (error) {
        res.status(500).json({ msg: "Server error to find to database", error });
    }
    if (movieFind === null) {
        res.status(422).json({ msg: "Not Found" });
        return;
    }
    res.status(200).json({ msg: "success", data: movieFind })
}

exports.getMovieByStatus = async(req,res) => {
    let { status } = req.query;
    if (typeof status === "undefined") {
        res.status(422).json({ msg: "Invalid data" });
        return
    }
    let movieFinds = [];
    try {
        movieFinds = await movie.find({status:status});
    } catch (error) {
        res.status(500).json({ msg: "Server error to find to database", error });
    }
    res.status(200).json({ msg: "success", data: movieFinds })
}