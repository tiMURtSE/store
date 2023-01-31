require("dotenv").config();
const express = require("express");
const sequelize = require("./db")
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddlware");
const path = require("path");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// middleware, который работает с ошибками должен идти в конце
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate(); /* установка подключения с базой данных */
        await sequelize.sync(); /* сверяет состояние базы данных со схемой данных */
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error)
    }
};

start();