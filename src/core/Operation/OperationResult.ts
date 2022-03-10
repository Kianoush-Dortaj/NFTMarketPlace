export default class OperationResult<TResult>
{

    public success: boolean;
    public message: string;
    public result?: TResult;

    constructor(success: boolean, message: string, result?: TResult) {
        this.success = success;
        this.message = message;
        this.result = result;
    }

    public static BuildSuccessResult<TResult>(message: string, reult: TResult): OperationResult<TResult> {
        return new OperationResult<TResult>(true, message, reult);
    }

    public static BuildFailur<TResult>(message: string): OperationResult<TResult> {
        return new OperationResult<TResult>(false, message);
    }

}