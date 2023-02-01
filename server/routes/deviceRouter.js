const { Router } = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController")

router.post("/", deviceController.create);
router.post("/my_basket", deviceController.getBasket);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

module.exports = router;

// нарисовать роутер    