"use strict"

const clusterController = require("./clusterController");
const movieController = require("./movieController");
const ticketController = require("./ticketController");

exports.addCluster = clusterController.addCluster;
exports.getAllCluster = clusterController.getAllCluster;
exports.getClusterById = clusterController.getClusterById;
exports.updateCluster = clusterController.updateCluster;

exports.insertMovie = movieController.insertMovie;
exports.getAllMovie = movieController.getAllMovie;
exports.updateMovie = movieController.updateMovie;
exports.deleteMovie = movieController.deleteMovie;
exports.getMovieById = movieController.getMovieById;
exports.getMovieByStatus = movieController.getMovieByStatus;

exports.addTicket = ticketController.addTicket;
exports.getAllTicket = ticketController.getAllTicket;
exports.getTicketById = ticketController.getTicketById;
exports.confirmTicket = ticketController.confirmTicket;

