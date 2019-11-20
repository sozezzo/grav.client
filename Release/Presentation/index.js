"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar_service_1 = require("../Services/gravatar.service");
const http_shim_1 = require("../Infrastructure/http-shim");
const xml_service_1 = require("../Services/xml.service");
class GravatarClient extends gravatar_service_1.GravatarService {
    constructor(email, password) {
        super(email, password);
        this.email = email;
        this.http = new http_shim_1.HttpShim();
        this.xml = new xml_service_1.XmlService();
        this.http.endpoint = this.endpoint;
    }
}
exports.GravatarClient = GravatarClient;
