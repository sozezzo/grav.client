const { VerifyAccountUseCase } = require('../Release/Application/verify-account.use-case');
const { SignInUseCase } = require('../Release/Application/sign-in.use-case');

module.exports = class InspectAccount {
  constructor(){
    this.verifyAccountUseCase = new VerifyAccountUseCase();
    this.signInUseCase = new SignInUseCase();
  }
};
