import log from "@/utils/stdlog";
import { ActionResult } from "@/lib/types";

// TODO: Validate what returns
export async function getRows(): Promise<ActionResult> {
    try {
        return {
            ok: true,
            data: [],
        };
    } catch (err) {
        // err is a ZodError on validation failure or other error
        log.error("Get error:", err);

        return { ok: false, error: "Get error" };
    }
}
