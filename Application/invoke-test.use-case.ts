import { UseCase } from './use-case.interface';
import { GravatarClient } from '../Presentation'
import { TestMethodResponse } from '../Domain/test.method-response';
import { Result } from '../Common/result';

export class InvokeTestUseCase implements UseCase<Result<TestMethodResponse>> {

  public client: GravatarClient;

  async execute(): Promise<Result<TestMethodResponse>> {
    return await this.client.test();
  }
}