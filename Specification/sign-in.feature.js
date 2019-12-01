const { SignInUseCase } = require('../Release/Application/sign-in.use-case');

module.exports = class SignInFeature {
  constructor(){
    this.signInUseCase = new SignInUseCase();
  }
};
