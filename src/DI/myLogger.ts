import { injectable } from "inversify";
import { ILogger } from "./ILogger";

@injectable()
export class MyLogger implements ILogger{
    log(s: string): void {
       console.log(s);
    }
}