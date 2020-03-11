"use strict"
const userController = require("../controllers/userController");

module.exports = (app) => {
    app.route("/user/register")
        .post(userController.register)
    app.route("/user/login")
        .post(userController.login)
    app.route("/user/logout")
        .put(userController.logout)
        
    app.route("/user/getAllCluster")
        .get(userController.getAllCluster);
    app.route("/user/getCluster")
        .get(userController.getClusterById)

    app.route("/user/showAllMovie")
        .get(userController.getAllMovie);
    app.route("/user/getMovie")
        .get(userController.getMovieById);

    app.route("/user/orderTicket")
        .get(userController.orderTicket)
    app.route("/user/confirmTicket")
        .get(userController.confirmTicket)
    app.route("/user/getTicketById")
        .get(userController.getTicketById)
}