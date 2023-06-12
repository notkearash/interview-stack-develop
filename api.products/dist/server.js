"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const sequelize_1 = require("sequelize");
const cors_1 = __importDefault(require("cors"));
// require('dotenv').config();
const app = (0, express_1.default)();
exports.sequelize = new sequelize_1.Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mariadb',
    logging: () => console.log('[ DB ] Request made to DB'),
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        console.log('[ OK ] Connected to DB');
    }
    catch (error) {
        console.error('[FATAL] Unable to connect to the database:', error);
    }
}))();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/static', express_1.default.static('./static'));
app.use((0, morgan_1.default)('< :method > :url :status :res[content-length] - :response-time ms'));
app.use('/api/products', (0, products_routes_1.default)(exports.sequelize));
app.use((req, res) => res.status(404).json({ message: "404 not found" }));
app.listen(process.env.LPORT, () => console.log(`[ OK ] Listening on ${process.env.LPORT}`));
//# sourceMappingURL=server.js.map