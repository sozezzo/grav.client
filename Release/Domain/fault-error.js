"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FaultError extends Error {
    constructor(faultCode, faultString) {
        super(faultString);
        this.faultCode = faultCode;
        this.faultString = faultString;
    }
}
exports.FaultError = FaultError;