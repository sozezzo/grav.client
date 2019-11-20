"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('grav.client', function () {
    let gravatar;
    beforeEach(() => {
        gravatar = new index_1.Gravatar();
    });
    it('should have login method', function () {
        expect(gravatar.login).toBeDefined();
    });
    it('should have test method', function () {
        expect(gravatar.test).toBeDefined();
    });
});
