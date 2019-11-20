"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_js_1 = require("xml-js");
class TestMethodResponse {
    constructor(xml) {
        this.xml = xml;
        this.json = xml_js_1.xml2js(xml);
    }
}
exports.TestMethodResponse = TestMethodResponse;
