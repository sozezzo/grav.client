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
const md5_1 = require("ts-md5/dist/md5");
const xml_js_1 = require("xml-js");
class GravatarService {
    constructor(email, password) {
        this.email = email;
        this.origin = "https://secure.gravatar.com";
        const _email = `${email}`.trim().toLowerCase();
        this.hash = md5_1.Md5.hashStr(_email).toString();
        this.endpoint = `${this.origin}/xmlrpc?user=${this.hash}`;
        this._password = password;
    }
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.xml.exists(this.hash, this._password);
            const response = yield this.http.rpc(message);
            // TODO: incorporate result class
            if (response.ok) {
                const data = yield response.text();
                return xml_js_1.xml2js(data);
            }
            else {
                return {};
            }
        });
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.xml.test(this._password);
            const response = yield this.http.rpc(message);
            if (response.ok) {
                const data = yield response.text();
                return xml_js_1.xml2js(data);
            }
            else {
                return {};
            }
        });
    }
}
exports.GravatarService = GravatarService;
;
