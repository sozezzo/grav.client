import { UseCase } from "./use-case.interface";
import { GravatarClient, ImageRating } from "../Presentation";

export class SetNewImageUseCase implements UseCase<string> {
  public client: GravatarClient;

  public imagePath: string;
  public imageRating: ImageRating;

  public execute(): Promise<string> {
    return this.client
      .saveImage(this.imagePath, this.imageRating)
      .then(result => result.Value.imageName)
      .then(imageName => {
        this.client.useUserImage(imageName);
        return imageName;
      });
  }
}
