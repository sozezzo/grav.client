"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const method_response_1 = require("./method-response");
const xml_js_1 = require("xml-js");
class TestMethodResponse extends method_response_1.MethodResponse {
    constructor(xml) {
        super(xml_js_1.xml2js(xml, { compact: true }));
        this.xml = xml;
        if (!this.json.methodResponse.fault) {
            const { name, value } = this.json.methodResponse.params.param.value.struct.member;
            this.name = this.parseFieldValue(name);
            this.value = this.parseFieldValue(value);
        }
    }
}
exports.TestMethodResponse = TestMethodResponse;
