import { TableRowInsert } from "@/db/schema";
import { ActionResult } from "@/lib/types";
import log from "@/utils/stdlog";
import { rowSchema } from "@/utils/validate/schemas";

type Input = {
    id?: number;
    content: string;
};

async function buildInsert(parsed: {
    content: string;
}): Promise<TableRowInsert> {
    return {
        content: parsed.content,
    } as const;
}

export async function save(
    input: Input,
    opts: { isUpdate?: boolean } = {},
): Promise<ActionResult> {
    try {
        const parsed = rowSchema.parse({
            id: input.id,
            content: input.content,
        });

        const row = await buildInsert({
            content: parsed.content,
        });

        if (opts.isUpdate) {
            // TODO: Implement
        } else {
            // TODO: Implement
        }

        return { ok: true };
    } catch (err) {
        log.error(opts.isUpdate ? "Update error:" : "Create error:", err);
        return {
            ok: false,
            error: opts.isUpdate ? "Update error" : "Create error",
        };
    }
}
