"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SignInUseCase {
    constructor() {
        this.email = "";
        this.password = "";
    }
    execute() {
        return Promise.resolve(true);
    }
}
exports.SignInUseCase = SignInUseCase;
