import { GravatarService } from '../Services/gravatar.service';
export declare class Gravatar {
    private client;
    login(email: string, password: string): GravatarService;
    test(): string;
}
