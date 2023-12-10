"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
let db;
const initDb = (callback) => {
    var _a;
    if (db !== null && db !== undefined) {
        console.log('Db is already initialized!');
        return callback(null, db);
    }
    const atlasUri = (_a = process.env.ATLAS_URI) !== null && _a !== void 0 ? _a : ''; // Ensure ATLAS_URI is defined or use an empty string as fallback
    mongodb_1.MongoClient.connect(atlasUri)
        .then((client) => {
        db = client;
        callback(null, db);
    })
        .catch((err) => {
        callback(err);
    });
};
const getDb = () => {
    if (db === null || db === undefined) {
        throw Error('Db not initialized');
    }
    return db;
};
exports.default = {
    initDb,
    getDb
};
//# sourceMappingURL=connect.js.map