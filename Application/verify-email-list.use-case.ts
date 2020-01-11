import { UseCase } from "./use-case.interface";
import { GravatarClient } from "../Presentation";

export class VerifyEmailListUseCase implements UseCase<boolean> {
  public client: GravatarClient;

  public emailAddresses: Array<string>;

  async execute(): Promise<boolean> {
    const result = await this.client.exists(...this.emailAddresses);
    return result.Value.success;
  }
}
