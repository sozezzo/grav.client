const { SignInUseCase } = require('../../Release/Application/sign-in.use-case');

module.exports = class SignInFeature {
  constructor(){
    this.usecase = new SignInUseCase();
  }
};
