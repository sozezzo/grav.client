import { UseCase } from './use-case.interface';
import { GravatarClient } from '../Presentation';
import { imageUrl } from '../Common/TestDoubles/primitive-stubs';

export class SetNewImageUseCase implements UseCase<string> {

  public client: GravatarClient;
  
  public imageUrl: string;

  public execute(): Promise<string> {
    return this.client.saveImageUrl(this.imageUrl)
              .then(result => result.Value.imageName)
              .then(imageName => {
                this.client.useUserImage(imageName);
                return imageName;
              });
  }

}