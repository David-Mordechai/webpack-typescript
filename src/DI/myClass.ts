import { inject, injectable } from "inversify";
import { BehaviorSubject } from "rxjs";
import { ILogger } from "./ILogger";
import { IMyClass } from "./IMyClass";
import { TYPES } from "./TYPES";

@injectable()
export class MyClass implements IMyClass {
    subject: BehaviorSubject<number>;

    constructor(@inject(TYPES.ILogger) private logger: ILogger) {
        this.subject = new BehaviorSubject<number>(5);
    }

    doWork(): void {
        this.logger.log('doing work in myClass + ${this.subject}');
    }
}