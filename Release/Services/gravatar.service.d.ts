import { HttpShim } from '../Infrastructure/http-shim';
import { ExistsMethodResponse } from '../Domain/exists.method-response';
import { Result } from '../Common/result';
import { TestMethodResponse } from '../Domain/test.method-response';
export declare class GravatarService {
    email: string;
    protected hash: string;
    protected origin: string;
    protected endpoint: string;
    protected _password: string;
    http: HttpShim;
    constructor(email: string, password: string);
    exists(): Promise<Result<ExistsMethodResponse>>;
    test(): Promise<Result<TestMethodResponse>>;
}
