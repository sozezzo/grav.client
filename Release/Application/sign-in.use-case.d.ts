import { UseCase } from './use-case.interface';
export declare class SignInUseCase implements UseCase<boolean> {
    email: string;
    password: string;
    constructor();
    execute(): Promise<boolean>;
}
