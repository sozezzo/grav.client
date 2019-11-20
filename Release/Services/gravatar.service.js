"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = require("ts-md5/dist/md5");
class GravatarService {
    constructor(email, password) {
        this.email = email;
        this.origin = "https://secure.gravatar.com";
        const _email = `${email}`.trim().toLowerCase();
        this.hash = md5_1.Md5.hashStr(_email);
        this.endpoint = `${this.origin}/xmlrpc?user=${this.hash}`;
        this._password = password;
    }
    test() {
        return this.hash.toString();
    }
}
exports.GravatarService = GravatarService;
;
