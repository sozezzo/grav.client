import { UseCase } from './use-case.interface';
import { GravatarService } from '../Services/gravatar.service';
export declare class SignInUseCase implements UseCase<GravatarService> {
    email: string;
    password: string;
    constructor();
    execute(): Promise<GravatarService>;
}
