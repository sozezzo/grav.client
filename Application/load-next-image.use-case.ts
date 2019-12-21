import { UseCase } from "./use-case.interface";
import { GravatarClient } from "../Presentation";
import { UserImage } from "../Domain/user-image";
import { GetPrimaryImageUseCase } from "./get-primary-image.use-case";

export class LoadNextImageUseCase implements UseCase<string> {
  public client: GravatarClient;

  execute(): Promise<string> {
    let _userImages: Array<UserImage> = [];
    let getPrimaryImage = new GetPrimaryImageUseCase();

    getPrimaryImage.client = this.client;

    return getPrimaryImage
      .execute()
      .then(async currentImage => {
        const result = await this.client.userImages();
        _userImages = result.Value.userImages;
        return _userImages.findIndex(image => image.name == currentImage);
      })
      .then(currentImageIndex => currentImageIndex + 1)
      .then(nextImageIndex => {
        return nextImageIndex >= _userImages.length
          ? _userImages[0].name
          : _userImages[nextImageIndex].name;
      })
      .then(async imageName => {
        await this.client.useUserImage(imageName);
        return imageName;
      });
  }
}
