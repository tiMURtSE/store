const { BasketDevice } = require("../models/models");

class BasketDeviceController {
    async create(req, res) {
        const { basketId, deviceId} = req.body;

        const basketDevice = await BasketDevice.create({basketId, deviceId});

        return res.json(basketDevice);
    }
}

module.exports = new BasketDeviceController();