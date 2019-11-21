"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar_service_1 = require("../Services/gravatar.service");
const http_shim_1 = require("../Infrastructure/http-shim");
class GravatarClient extends gravatar_service_1.GravatarService {
    constructor(email, password) {
        super(email, password);
        this.email = email;
        this.http = new http_shim_1.HttpShim();
        this.http.endpoint = this.endpoint;
    }
}
exports.GravatarClient = GravatarClient;
