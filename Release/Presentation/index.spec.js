"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('grav.client', function () {
    var grav;
    beforeEach(function () {
        grav = new index_1.Grav();
    });
    it('should have login method', function () {
        expect(grav.login).toBeDefined();
    });
    it('should have test method', function () {
        expect(grav.test).toBeDefined();
    });
});
