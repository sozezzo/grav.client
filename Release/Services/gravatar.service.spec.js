"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gravatar_service_1 = require("./gravatar.service");
const xml_service_1 = require("./xml.service");
describe('GravatarService', () => {
    let service;
    beforeEach(() => {
        const email = "tony.stark@examle.com";
        const password = "123";
        service = new gravatar_service_1.GravatarService(email, password);
        service.xml = new xml_service_1.XmlService();
    });
    it('should work', () => {
        expect(service).toBeDefined();
    });
});
