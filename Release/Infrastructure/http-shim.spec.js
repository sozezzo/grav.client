"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_shim_1 = require("./http-shim");
describe('HttpShim', () => {
    let http;
    beforeEach(() => {
        http = new http_shim_1.HttpShim();
    });
    it('should work', () => {
        expect(http.rpc).toBeDefined();
    });
});
