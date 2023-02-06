const {Device, DeviceInfo} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
    
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
    
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info);
                info.forEach(i => 
                    DeviceInfo.create({
                        name: i.name,
                        description: i.description,
                        deviceId: device.id
                    })
                );
            }
    
            return res.json(device);       
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    
    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        let devices;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset});
        } else if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
        } else if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
        } else if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset});
        }

        return res.json(devices);
    }

    async getBasket(req, res) {
        const devicesId = req.body;
        console.log(devicesId)
        const devices = await Device.findAndCountAll({where: {id: devicesId}});

        return res.json(devices);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            });

        return res.json(device);
    }
}

module.exports = new DeviceController();