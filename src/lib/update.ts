import { ActionResult } from "@/lib/types";
import { save } from "@/lib/update_create";

export async function update(
    id: number,
    content: string,
): Promise<ActionResult> {
    return save({ id, content }, { isUpdate: true });
}
