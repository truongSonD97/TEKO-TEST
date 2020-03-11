"use strict"
const thirdPartyController = require("../controllers/thirdPartyController");

module.exports = (app) => {
    app.route("/third/register")
        .post(thirdPartyController.register)

    app.route("/third/login")
        .post(thirdPartyController.login)

    app.route("/third/changeToken")
        .post(thirdPartyController.changeToken)

    app.route("/third/getAllMovie")
        .get(thirdPartyController.getAllMovie)

    app.route("/third/getMovieByStatus")
        .get(thirdPartyController.getMovieByStatus)
    app.route("/third/getMovieById")
        .get(thirdPartyController.getMovieById)

    app.route("/third/getCluster")
        .get(thirdPartyController.getCluster)


    app.route("/third/orderTicket")
        .get(thirdPartyController.orderTicket)
    app.route("/third/confirmTicket")
        .get(thirdPartyController.confirmTicket)
    app.route("/third/getTicketById")
        .get(thirdPartyController.getTicketById)


}