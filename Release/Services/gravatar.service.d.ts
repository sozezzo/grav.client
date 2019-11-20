import { HttpShim } from '../Infrastructure/http-shim';
export declare class GravatarService {
    email: string;
    protected hash: string | Int32Array;
    protected origin: string;
    protected endpoint: string;
    protected _password: string;
    http: HttpShim;
    constructor(email: string, password: string);
    test(): string;
}
