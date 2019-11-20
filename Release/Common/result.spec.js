"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("./result");
describe('Result', () => {
    let result;
    beforeEach(() => {
        result = result_1.Result.Ok(true);
    });
    it('should work', () => {
        expect(result.DidSucceed).toBe(true);
    });
});
