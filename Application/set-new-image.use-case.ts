import { UseCase } from "./use-case.interface";
import { GravatarClient, ImageRating } from "../Presentation";
import { SaveImageUrlMethodResponse } from "../Domain/method-responses";

export class SetNewImageUseCase implements UseCase<string> {
  public client: GravatarClient;

  public imageFilePath: string;
  public imageUrl: string;
  public imageRating: ImageRating;

  public execute(): Promise<string> {
    if (this.imageFilePath) {
      return this.client
        .saveImage(this.imageFilePath)
        .then(this._handleResponse.bind(this));
    }
    if (this.imageUrl) {
      return this.client
        .saveImageUrl(this.imageUrl)
        .then(this._handleResponse.bind(this));
    }
    throw new Error("Please provide an image URL or file path");
  }

  private _handleResponse(response: SaveImageUrlMethodResponse) {
    const { imageName } = response;
    this.client.useUserImage(imageName);
    return imageName;
  }
}
