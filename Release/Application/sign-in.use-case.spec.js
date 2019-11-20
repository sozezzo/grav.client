"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sign_in_use_case_1 = require("./sign-in.use-case");
describe('SignInUseCase', () => {
    let useCase;
    beforeEach(() => {
        useCase = new sign_in_use_case_1.SignInUseCase();
    });
    it('should work', () => {
        expect(useCase.email).toBeDefined();
        expect(useCase.password).toBeDefined();
        expect(useCase.execute).toBeDefined();
    });
    it('should allow user to sign in', () => __awaiter(void 0, void 0, void 0, function* () {
        useCase.email = "tony.stark@examle.com";
        useCase.password = "123";
        const gravatar = yield useCase.execute();
        expect(gravatar).toBeDefined();
    }));
});
