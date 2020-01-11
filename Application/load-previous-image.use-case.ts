import { UseCase } from "./use-case.interface";
import { GravatarClient } from "../Presentation";
import { UserImage } from "../Domain/user-image";
import { GetPrimaryImageUseCase } from "./get-primary-image.use-case";

export class LoadPreviousImageUseCase implements UseCase<string> {
  public client: GravatarClient;

  execute(): Promise<string> {
    let _userImages: Array<UserImage> = [];
    let getPrimaryImage = new GetPrimaryImageUseCase();

    getPrimaryImage.client = this.client;

    return getPrimaryImage
      .execute()
      .then(async primaryImage => {
        const result = await this.client.userImages();
        _userImages = result.Value.userImages;
        return _userImages.findIndex(image => image.name == primaryImage);
      })
      .then(primaryImageIndex => primaryImageIndex - 1)
      .then(previousImageIndex => {
        return previousImageIndex < 0
          ? _userImages[_userImages.length - 1].name
          : _userImages[previousImageIndex].name;
      })
      .then(async imageName => {
        await this.client.useUserImage(imageName);
        return imageName;
      });
  }
}
