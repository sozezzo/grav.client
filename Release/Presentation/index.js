"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar_service_1 = require("../Services/gravatar.service");
class Gravatar {
    login(email, password) {
        this.client = new gravatar_service_1.GravatarService(email, password);
        return this.client;
    }
    test() {
        return "this is a test";
    }
}
exports.Gravatar = Gravatar;
