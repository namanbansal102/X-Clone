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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../clients/db");
const JWT = require('jsonwebtoken');
// import JWT from "jsonwebtoken";
class JWTService {
    static getService(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Get Service Function is Running");
            console.log(userId);
            const user = yield db_1.prismaClient.user.findUnique({
                where: { id: userId }
            });
            const payload = {
                id: user === null || user === void 0 ? void 0 : user.id,
                email: user === null || user === void 0 ? void 0 : user.email
            };
            const jwtToken = JWT.sign(payload, "salt123343nama");
            return jwtToken;
        });
    }
}
exports.default = JWTService;
