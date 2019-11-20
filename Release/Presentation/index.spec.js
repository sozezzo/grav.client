"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('grav.client', function () {
    let client;
    beforeEach(() => {
        const email = "peter.parker@example.com";
        const password = "123";
        client = new index_1.GravatarClient(email, password);
    });
    it('should have test method', function () {
        expect(client.test).toBeDefined();
    });
});
