const { SignInUseCase } = require('../Release/Application/sign-in.use-case');
const { VerifyAccountUseCase } = require('../Release/Application/verify-account.use-case');
const { VerifyEmailListUseCase } = require('../Release/Application/verify-email-list.use-case');
const { config }  = require('dotenv');
const { GravatarClient } = require('../Release/Presentation');

config({ path: 'Tests/.env' });

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

module.exports = class World { 
  constructor(){
    this.signInUseCase = new SignInUseCase();
    this.verifyAccountUseCase = new VerifyAccountUseCase();
    this.verifyEmailListUseCase = new VerifyEmailListUseCase();
    this.verifyAccountUseCase.client = new GravatarClient(email, password);
    this.verifyEmailListUseCase.client = new GravatarClient(email, password);
    this.foo = "bar";
  }
};
