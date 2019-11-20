"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(DidSucceed, ErrorMessage = "") {
        this.didSucceed = DidSucceed;
        this.didFail = !DidSucceed;
        this.errorMessage = ErrorMessage;
    }
    get DidSucceed() {
        return this.didSucceed;
    }
    get DidFail() {
        return this.didFail;
    }
    get ErrorMessage() {
        return this.errorMessage;
    }
    get Value() {
        return this.value;
    }
    static Ok(Value) {
        const result = new Result(true);
        result.value = Value;
        return result;
    }
    static Fail(ErrorMessage) {
        return new Result(false, ErrorMessage);
    }
}
exports.Result = Result;
