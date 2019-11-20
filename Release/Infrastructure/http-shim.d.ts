export declare class HttpShim {
    endpoint: string;
    rpc(message: string): Promise<Response>;
}
