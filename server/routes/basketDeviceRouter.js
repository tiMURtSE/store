const { Router } = require("express");
const basketDeviceController = require("../controllers/basketDeviceController");
const router = new Router();

router.post('/', basketDeviceController.create);

module.exports = router;