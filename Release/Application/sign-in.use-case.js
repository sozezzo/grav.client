"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar_service_1 = require("../Services/gravatar.service");
class SignInUseCase {
    constructor() {
        this.email = "";
        this.password = "";
    }
    execute() {
        const gravatarService = new gravatar_service_1.GravatarService(this.email, this.password);
        return Promise.resolve(gravatarService);
    }
}
exports.SignInUseCase = SignInUseCase;
