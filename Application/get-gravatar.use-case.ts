import { UseCase } from './use-case.interface';

export class GetGravatarUseCase implements UseCase<boolean> {
  execute(): Promise<boolean> {
    return Promise.resolve(true);
  }
}