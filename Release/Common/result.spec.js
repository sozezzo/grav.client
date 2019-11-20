"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = __importDefault(require("./result"));
describe('Result', () => {
    let result;
    beforeEach(() => {
        result = result_1.default.Ok(true);
    });
    it('should work', () => {
        expect(result.DidSucceed).toBe(true);
    });
});
