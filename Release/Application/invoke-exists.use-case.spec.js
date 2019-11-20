"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoke_exists_use_case_1 = require("./invoke-exists.use-case");
describe('InvokeExistsUsecase', () => {
    let useCase;
    beforeEach(() => {
        useCase = new invoke_exists_use_case_1.InvokeExistsUseCase();
    });
    it('should work', () => {
        expect(true).toBe(true);
    });
});
