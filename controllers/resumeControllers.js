const db = require("../models");
const resume = require("../routes/api/resumeScrape.js")

// Defining methods for the booksController
module.exports = {

  create: function(req, res) {
    db.Resume
      .save(resume)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  }

};