const { config }  = require('dotenv');
const { GravatarClient } = require('../Release/Presentation');
const { 
  GetPrimaryImageUseCase,
  LoadNextImageUseCase, 
  LoadPreviousImageUseCase,
  SetNewImageUseCase,
  SignInUseCase,
} = require('../Release/Presentation/index');

config({ path: 'Tests/.env' });

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const newClient = () => new GravatarClient(email, password);

module.exports = class World { 
  constructor(){
    this.client = newClient();
    this.getPrimaryImageUseCase = new GetPrimaryImageUseCase()
    this.loadNextImageUseCase = new LoadNextImageUseCase();
    this.loadPreviousImageUseCase = new LoadPreviousImageUseCase();
    this.setNewImageUseCase = new SetNewImageUseCase();
    this.signInUseCase = new SignInUseCase();
    this.getPrimaryImageUseCase.client = newClient();
    this.loadNextImageUseCase.client = newClient();
    this.loadPreviousImageUseCase.client = newClient();
    this.setNewImageUseCase.client = newClient();
    this.signInUseCase.client = newClient();
  }
};
