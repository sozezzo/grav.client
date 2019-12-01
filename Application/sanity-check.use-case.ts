import { UseCase } from './use-case.interface';
import { GravatarClient } from '../Presentation'
import { TestMethodResponse } from '../Domain/method-responses';
import { Result } from '../Common/result';

export class SanityCheckUseCase implements UseCase<boolean> {

  public client: GravatarClient;

  async execute(): Promise<boolean> {
    const result = await this.client.test();
    return !!result.Value.value;
  }
}