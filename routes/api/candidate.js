const router = require("express").Router();
const candidateController = require("../../controllers/candidateController");

// Matches with "/api/candidate"
router.route("/")
  .get(candidateController.findAll)
  .get(candidateController.find)
  .post(candidateController.create);

// Matches with "/api/candidate/:id"
router
  .route("/:id")
  .get(candidateController.findById)
  .put(candidateController.update)
  .delete(candidateController.remove);

module.exports = router;