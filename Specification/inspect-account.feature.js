const { SignInUseCase } = require('../Release/Application/sign-in.use-case');
const { VerifyAccountUseCase } = require('../Release/Application/verify-account.use-case');
const { VerifyEmailListUseCase } = require('../Release/Application/verify-email-list.use-case')

module.exports = class InspectAccountFeature {
  constructor(){
    this.signInUseCase = new SignInUseCase();
    this.verifyAccountUseCase = new VerifyAccountUseCase();
    this.verifyEmailListUseCase = new VerifyEmailListUseCase();
  }
};
