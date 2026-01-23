import { ActionResult } from "@/lib/types";
import { save } from "@/lib/update_create";

export async function create(
    content: string,
): Promise<ActionResult> {
    return save({ content }, { isUpdate: false });
}
