import { Logger } from "tslog";
import { isDev, needTrace } from "@/utils/stdvar";

const logLevel = needTrace ? 1 : isDev ? 2 : 3;

const log = new Logger({
    type: "pretty",
    minLevel: logLevel,
    prettyLogTemplate: "{{logLevelName}}\t{{filePathWithLine}}\t",
});

export default log;
