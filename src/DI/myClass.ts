import { inject, injectable } from "inversify";
import { ILogger } from "./ILogger";
import { IMyClass } from "./IMyClass";
import { TYPES } from "./TYPES";

@injectable()
export class MyClass implements IMyClass {
    constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    }

    doWork(): void {
        this.logger.log('doing work in myClass + ${this.subject}');
    }
}