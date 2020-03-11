"use strict"
const cluster = require('../models/timeClusterModel');
const user = require('../models/userModel');
const movie = require("../models/movieModel");

exports.addCluster = async (req, res) => {
    let { movie_id,start_time,end_time,ticket_amount,ticket_price,remain_ticket,status} = req.body;

    let token = req.headers.authorization;

    if (typeof movie_id === "undefined"
        || typeof start_time === "undefined"
        || typeof end_time === "undefined"
        || typeof token === "undefined"
        || typeof ticket_price === "undefined"
        || typeof remain_ticket === "undefined"
        || typeof ticket_amount === "undefined"
        ) {
        res.status(422).json({ msg: "Invalid data input" });
        return;
    }
    let movieFInd = null ;
    try {
        movieFInd = await movie.findById(movie_id)
    } catch (error) {
        res.status(500).json({msg:"Server error when find user"})
        return
    }
    if(movieFInd === null){
        res.status(422).json({ msg: "Invalid data movie" });
        return;
    }
    
    let userAddCluster = null ;
    try {
        userAddCluster = await user.findOne({token:token})
    } catch (error) {
        res.status(500).json({msg:"Server error when find user"})
        return
    }
   
    if(userAddCluster === null || userAddCluster.tokenExpire < Date.now() || !userAddCluster.is_admin){
        res.status(423).json({msg:"Invalid Token"});
        return
    }


    const newCluster = new cluster({
        movie_id: movie_id,
        start_time: start_time,
        end_time: end_time,
        ticket_price: ticket_price,
        ticket_amount: ticket_amount,
        remain_ticket: remain_ticket,
        status: status || "active"
    });

    try {
        await newCluster.save();
    } catch (error) {
        res.status(500).json({ msg: "error when save data" + error });
        return;
    }
    res.status(201).json({ msg: "success" });
}
exports.updateCluster = async (req, res) => {
    let { cluster_id, movie_id,start_time,end_time,ticket_amount,ticket_price,remain_ticket,status} = req.body;

    let token = req.headers.authorization;

    if (typeof movie_id === "undefined"
        || typeof cluster_id === "undefined"
        || typeof token === "undefined"
        ) {
        res.status(422).json({ msg: "Invalid data input" });
        return;
    }
    let movieFInd = null ;
    try {
        movieFInd = await movie.findById(movie_id)
    } catch (error) {
        res.status(500).json({msg:"Server error when find user"})
        return
    }
    if(movieFInd === null){
        res.status(422).json({ msg: "Invalid data movie" });
        return;
    }

    let clusterFind = null;
    try {
        clusterFind = await cluster.findById(cluster_id);
        
    } catch (error) {
        res.status(500).json({msg:"Server error when find user"})
        return
    }
   
    if(clusterFind === null){
        res.status(422).json({msg:"Invalid data cluster"});
        return
    }
    
    let userAddCluster = null ;
    
    try {
        userAddCluster = await user.findOne({token:token});

    } catch (error) {
        res.status(500).json({msg:"Server error when find user"})
        return
    }
   
    if(userAddCluster === null || userAddCluster.tokenExpire < Date.now() || !userAddCluster.is_admin){
        res.status(423).json({msg:"Invalid Token"});
        return
    }
    
       clusterFind.movie_id = movie_id || clusterFind.movie_id;
       clusterFind.start_time = start_time || clusterFind.start_time;
       clusterFind.end_time= end_time || clusterFind.end_time;
       clusterFind.ticket_price =ticket_price || clusterFind.ticket_price;
       clusterFind.ticket_amount= ticket_amount || clusterFind.ticket_amount;
       clusterFind.remain_ticket= remain_ticket || clusterFind.remain_ticket;
       clusterFind.status =  status || clusterFind.status;


    try {
        await clusterFind.save();
    } catch (error) {
        res.status(500).json({ msg: "error when save data" + error });
        return;
    }
    res.status(202).json({ msg: "success" });
}
exports.getAllCluster = async (req, res) => {
    console.log("GET ALL");
    let clusters = []
    try {
        clusters = await cluster.find();
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    console.log("LIST CLUSTER",clusters)
   res.status(200).json({msg:"success", data : clusters})
}


exports.getClusterById = async (req,res) => {
    let {id} = req.query;
    if(typeof id === "undefined"){
        res.status(422).json({msg:"Invalid data"})
        return
    }
    let clusterFind = null;
    try {
        clusterFind = await cluster.findById(id);
    } catch (error) {
        res.status(500).json({ msg: error });
        return;
    }
    if(clusterFind === null){
        res.status(422).json({ msg: "Not Found ticket" });
        return;
    }
    res.status(200).json({msg:"success",data:clusterFind});
}
