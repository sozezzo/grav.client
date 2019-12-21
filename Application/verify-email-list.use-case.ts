import { UseCase } from "../Common/use-case.interface";
import { GravatarClient } from "../Presentation";

export class VerifyEmailListUseCase
  implements UseCase<{ [emailHash: string]: boolean }> {
  public client: GravatarClient;

  public emailAddresses: Array<string>;

  async execute(): Promise<{ [emailHash: string]: boolean }> {
    const result = await this.client.exists(...this.emailAddresses);
    return result.Value.exists;
  }
}
