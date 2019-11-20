export declare class Result<T> {
    constructor(DidSucceed: Boolean, ErrorMessage?: string);
    private didSucceed;
    get DidSucceed(): Boolean;
    private didFail;
    get DidFail(): Boolean;
    private errorMessage;
    get ErrorMessage(): String;
    private value;
    get Value(): T;
    static Ok<T>(Value: T): Result<T>;
    static Fail<T>(ErrorMessage: string): Result<T>;
}
