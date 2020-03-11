"use strict"
const adminController = require("../controllers/adminController");

module.exports = (app) => {

    app.route("/admin/addCluster")
        .post(adminController.addCluster);
    app.route("/admin/update")
        .put(adminController.updateCluster);

    app.route("/admin/addMovie")
        .post(adminController.insertMovie);

    app.route('/admin/deleteMovie')
        .delete(adminController.deleteMovie)
    app.route("/admin/updateMovie")
        .put(adminController.updateMovie)

    app.route("/admin/getMovieByStatus")
        .get(adminController.getMovieByStatus);

    app.route("/admin/showAllTicket")
        .get(adminController.getAllTicket);

}