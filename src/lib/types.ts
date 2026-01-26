export type ActionResult =
    | { ok: true; data?: any }
    | { ok: false; error: string };
