import { Container } from "inversify";
import { ILogger } from "./src/DI/ILogger";
import { MyLogger } from "./src/DI/myLogger";
import { TYPES } from "./src/DI/TYPES";
import { IMyClass } from "./src/DI/IMyClass";
import { MyClass } from "./src/DI/myClass";

const myContainer = new Container();
myContainer.bind<ILogger>(TYPES.ILogger).to(MyLogger).inSingletonScope();
myContainer.bind<IMyClass>(TYPES.IMyClass).to(MyClass).inSingletonScope();

export { myContainer };