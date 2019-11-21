export declare enum RpcMessageType {
    EXISTS = 0,
    TEST = 1
}
interface RpcMessage {
}
export declare class RpcMessageExists implements RpcMessage {
    xml(hash: string, password: string): string;
}
export declare class RpcMessageTest implements RpcMessage {
    xml(password: string): string;
}
export declare class RpcMessageFactory {
    static get(messageType: RpcMessageType): RpcMessage;
}
export {};
