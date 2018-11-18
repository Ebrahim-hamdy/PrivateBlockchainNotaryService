/*jshint esversion: 6 */
module.exports = (app) => {
    require('./block.routes')(app);
    require('./star.routes')(app);
    require('./request-validator.routes')(app);

    /* GET home page. */
    app.get('/', (req, res) => {
        res.json({"message": "Welcome To Star Notary Service."});
    });
};
