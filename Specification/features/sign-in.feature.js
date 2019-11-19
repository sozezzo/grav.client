const BaseFeature = require('./base.feature');
const { SignInUseCase } = require('../../Release/Application/sign-in.use-case');

module.exports = class SignInFeature extends BaseFeature {
  constructor(){
    super();
    this.usecase = new SignInUseCase();
  }
};
