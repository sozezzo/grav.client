import { GravatarService } from '../Services/gravatar.service';
export declare class GravatarClient extends GravatarService {
    email: string;
    constructor(email: string, password: string);
}
