const { BasketDevice } = require("../models/models");

class BasketDeviceController {
    async create(req, res) {
        const { basketId, deviceId} = req.body;

        const basketDevice = await BasketDevice.create({basketId, deviceId});

        return res.json(basketDevice);
    }

    async delete(req, res) {
        const { deviceId, basketId } = req.query;

        const deletedDevive = await BasketDevice.destroy({where: {deviceId, basketId}});

        return res.json(deletedDevive);
    }
}

module.exports = new BasketDeviceController();