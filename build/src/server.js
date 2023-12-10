"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const connect_1 = __importDefault(require("./db/connect"));
const express_openid_connect_1 = require("express-openid-connect");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/', index_1.default);
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_openid_connect_1.auth)(config));
app.use('/', index_1.default);
connect_1.default.initDb((err) => {
    var _a;
    console.log(err);
    app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : port, () => {
        var _a;
        console.log(`Web server is listening at port ${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : port}`);
    });
});
exports.default = app;
//# sourceMappingURL=server.js.map