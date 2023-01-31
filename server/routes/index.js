const { Router } = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const deviceRouter = require("./deviceRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
const basketRouter = require("./basketRouter");
const basketDeviceRouter = require("./basketDeviceRouter");

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/brand", brandRouter);
router.use("/type", typeRouter);
router.use("/basket", basketRouter);
router.use("/basket_device", basketDeviceRouter);

module.exports = router;