"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysqlController_1 = __importDefault(require("./mysqlController"));
const dynamoController_1 = __importDefault(require("./dynamoController"));
const app = (0, express_1.default)();
const port = 8085;
app.use(body_parser_1.default.json());
app.use('/mysql', mysqlController_1.default);
app.use('/dynamo', dynamoController_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
