import {AppError} from "./AppError";

export class InternalError extends AppError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}