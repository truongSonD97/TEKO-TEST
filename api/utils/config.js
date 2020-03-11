
const hostDatabase = "mongodb://localhost/movies_db";
const port = process.env.PORT || 8080;
module.exports = Object.constant({
    hostDatabase: hostDatabase,
    port: port

})