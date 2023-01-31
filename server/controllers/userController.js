const ApiError = require("../error/ApiError");
const { User, Basket } = require("../models/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJWT = (id, email, role, basketId) => {
    return jwt.sign(
        {id, email, role, basketId},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body;

        // проверка на заполнения полей
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректные имейл или пароль'));
        }

        // проверка на повторную регистрацию
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким имейлом уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, password: hashPassword});
        const basket = await Basket.create({userId: user.id});
        const token = generateJWT(user.id, user.email, user.role, basket.id);
        
        return res.json({token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        const basket = await Basket.findOne({where: {userId: user.id}})
        console.log(user)

        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }

        let comparedPasswords = bcrypt.compareSync(password, user.password);

        if (!comparedPasswords) {
            return next(ApiError.internal('Неверный пароль'));
        }

        const token = generateJWT(user.id, user.email, user.role, basket.id);

        return res.json({token});
    }

    async check(req, res) {
        console.log(req.user)
        const token = generateJWT(req.user.id, req.user.email, req.user.role, req.user.basketId);

        return res.json({token});
    }
}

module.exports = new UserController();