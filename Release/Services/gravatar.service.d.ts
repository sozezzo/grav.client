import { HttpShim } from '../Infrastructure/http-shim';
import { XmlService } from './xml.service';
export declare class GravatarService {
    email: string;
    protected hash: string;
    protected origin: string;
    protected endpoint: string;
    protected _password: string;
    http: HttpShim;
    xml: XmlService;
    constructor(email: string, password: string);
    exists(): Promise<void>;
    test(): Promise<void>;
}
