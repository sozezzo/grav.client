"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_service_1 = require("./xml.service");
describe('XmlService', () => {
    let service;
    beforeEach(() => {
        service = new xml_service_1.XmlService();
    });
    it('should work', () => {
        expect(service.exists).toBeDefined();
        expect(service.test).toBeDefined();
    });
});
