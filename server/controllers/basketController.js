const { Basket, BasketDevice } = require("../models/models");

class BasketController {
    async getOne(req, res) {
        const { userId } = req.body;

        const basket = await Basket.findOne({
            where: {userId},
            include: [{model: BasketDevice, as: 'info'}]
        });

        return res.json(basket);
    }
}

module.exports = new BasketController();