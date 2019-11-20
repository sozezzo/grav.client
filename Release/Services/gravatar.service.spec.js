"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar_service_1 = require("./gravatar.service");
describe('GravatarService', () => {
    let service;
    beforeEach(() => {
        const email = "tony.stark@examle.com";
        const password = "123";
        service = new gravatar_service_1.GravatarService(email, password);
    });
    it('should work', () => {
        expect(service).toBeDefined();
    });
});
