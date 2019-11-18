"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_shim_1 = require("./http-shim");
describe('HttpShim', function () {
    var http;
    beforeEach(function () {
        http = new http_shim_1.HttpShim();
    });
    it('should work', function () {
        expect(http.rpc).toBeDefined();
    });
});
