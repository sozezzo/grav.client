import { UseCase } from './use-case.interface';
import { GravatarService } from '../Services/gravatar.service';
import { ExistsMethodResponse } from '../Domain/exists.method-response';
import { Result } from '../Common/result';
export declare class InvokeExistsUseCase implements UseCase<Result<ExistsMethodResponse>> {
    service: GravatarService;
    execute(): Promise<Result<ExistsMethodResponse>>;
}
