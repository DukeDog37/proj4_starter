const router = require("express").Router();
const managerController = require("../../controllers/managerController");

// Matches with "/api/manager"
router.route("/")
  .get(managerController.findAll)
  .post(managerController.create);

// Matches with "/api/manager/:id"
router
  .route("/:id")
  .get(managerController.findById)
  .put(managerController.update)
  .delete(managerController.remove);

module.exports = router;