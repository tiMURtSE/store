const { BasketDevice } = require("../models/models");

class BasketDeviceController {
    async create(req, res) {
        const { basketId, deviceId} = req.body;

        const basketDevice = await BasketDevice.create({ basketId, deviceId });

        return res.json(basketDevice);
    }

    async getDevice(req, res) {
        const { basketId, deviceId } = req.query;

        const device = await BasketDevice.findOne({where: { basketId, deviceId }});

        return res.json(device);
    }

    async delete(req, res) {
        const { basketId, deviceId } = req.query;

        const deletedDevice = await BasketDevice.destroy({where: { deviceId, basketId }});

        return res.json(deletedDevice);
    }
}

module.exports = new BasketDeviceController();