import { UseCase } from "./use-case.interface";
import { GravatarClient } from "../Presentation";
import { UserImage } from "../Domain/user-image";
import { GetPrimaryImageUseCase } from "./get-primary-image.use-case";

export class LoadNextImageUseCase implements UseCase<UserImage> {
  public client: GravatarClient;

  execute(): Promise<UserImage> {
    let _userImages: Array<UserImage> = [];
    let getPrimaryImage = new GetPrimaryImageUseCase();

    getPrimaryImage.client = this.client;

    return getPrimaryImage
      .execute()
      .then(async (primaryImage) => {
        const result = await this.client.userImages();
        _userImages = result.Value.userImages;
        return _userImages.findIndex(
          (image) => image.name == primaryImage.name
        );
      })
      .then((primaryImageIndex) => primaryImageIndex + 1)
      .then((nextImageIndex) => {
        return nextImageIndex >= _userImages.length
          ? _userImages[0]
          : _userImages[nextImageIndex];
      })
      .then(async (image) => {
        await this.client.useUserImage(image.name);
        return image;
      });
  }
}
