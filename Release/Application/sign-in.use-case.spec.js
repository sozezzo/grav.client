"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sign_in_use_case_1 = require("./sign-in.use-case");
describe('LoginUseCase', () => {
    let useCase;
    beforeEach(() => {
        useCase = new sign_in_use_case_1.SignInUseCase();
    });
    it('should work', () => {
        expect(useCase.email).toBeDefined();
        expect(useCase.password).toBeDefined();
        expect(useCase.execute).toBeDefined();
    });
});
