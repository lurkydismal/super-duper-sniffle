import { Logger } from "tslog";
import { isDev, needTrace } from "./stdvar";

export const log = new Logger({
    type: 'pretty',
    minLevel: needTrace ? 1 : isDev ? 2 : 3,
    prettyLogTemplate: "{{logLevelName}}\t{{filePathWithLine}}\t{{msg}}",
});
