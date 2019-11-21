"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fault_error_1 = require("./fault-error");
class MethodResponse {
    constructor(json) {
        this.json = json;
        let faultCode = 0;
        let faultString = "";
        const { fault } = this.json.methodResponse;
        if (fault) {
            const members = fault.value.struct.member;
            members.map(member => {
                if (member.name._text == "faultCode") {
                    faultCode = this.parseFieldValue(member.value);
                }
                else if (member.name._text == "faultString") {
                    faultString = this.parseFieldValue(member.value);
                }
            });
            throw new fault_error_1.FaultError(faultCode, faultString);
        }
    }
    parseFieldValue(fieldValue) {
        if (fieldValue.boolean)
            return fieldValue.boolean._text;
        if (fieldValue.int)
            return fieldValue.int._text;
        if (fieldValue.string)
            return fieldValue.string._text;
        return fieldValue._text;
    }
    ;
}
exports.MethodResponse = MethodResponse;
