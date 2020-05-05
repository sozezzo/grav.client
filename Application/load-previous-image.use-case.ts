import { UseCase } from "./use-case.interface";
import { GravatarClient } from "../Presentation";
import { UserImage } from "../Domain/user-image";
import { GetPrimaryImageUseCase } from "./get-primary-image.use-case";

export class LoadPreviousImageUseCase implements UseCase<UserImage> {
  public client: GravatarClient;

  execute(): Promise<UserImage> {
    let _userImages: Array<UserImage> = [];
    let getPrimaryImage = new GetPrimaryImageUseCase();

    getPrimaryImage.client = this.client;

    return getPrimaryImage
      .execute()
      .then(async (primaryImage) => {
        const response = await this.client.userImages();
        _userImages = response.userImages;
        return _userImages.findIndex(
          (image) => image.name == primaryImage.name
        );
      })
      .then((primaryImageIndex) => primaryImageIndex - 1)
      .then((previousImageIndex) => {
        return previousImageIndex < 0
          ? _userImages[_userImages.length - 1]
          : _userImages[previousImageIndex];
      })
      .then(async (image) => {
        await this.client.useUserImage(image.name);
        return image;
      });
  }
}
