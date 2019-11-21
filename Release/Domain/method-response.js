"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MethodResponse {
    constructor(json) {
        this.json = json;
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
