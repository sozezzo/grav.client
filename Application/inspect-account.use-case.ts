import { UseCase } from './use-case.interface';
import { GravatarClient } from '../Presentation'

export class InspectAccountUseCase implements UseCase<{[email: string]: boolean}> {

  public client: GravatarClient;

  public accountEmailAddresses: Array<string>;

  async execute(): Promise<{[email: string]: boolean}> {
    const result = await this.client.exists(...this.accountEmailAddresses);
    return result.Value.exists;
  }
}