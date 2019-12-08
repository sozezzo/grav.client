const { SignInUseCase } = require('../Release/Application/sign-in.use-case');
const { VerifyAccountUseCase } = require('../Release/Application/verify-account.use-case');
const { VerifyEmailListUseCase } = require('../Release/Application/verify-email-list.use-case');
const { SetNewImageUseCase } = require('../Release/Application/set-new-image.use-case');
const { GetPrimaryImageUseCase } = require('../Release/Application/get-primary-image.use-case');
const { config }  = require('dotenv');
const { GravatarClient } = require('../Release/Presentation');

config({ path: 'Tests/.env' });

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const client = new GravatarClient(email, password);

module.exports = class World { 
  constructor(){
    this.client = client;
    this.getPrimaryImageUseCase = new GetPrimaryImageUseCase();
    this.setNewImageUseCase = new SetNewImageUseCase();
    this.getPrimaryImageUseCase.client = this.client;
    this.setNewImageUseCase.client = this.client;
    this.signInUseCase = new SignInUseCase();
    this.verifyAccountUseCase = new VerifyAccountUseCase();
    this.verifyEmailListUseCase = new VerifyEmailListUseCase();
    this.verifyAccountUseCase.client = this.client;
    this.verifyEmailListUseCase.client = this.client;
  }
};
