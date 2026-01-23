"use client";

import TableDataGrid from "@/components/TableDataGrid";
import { TableRow } from "@/db/schema";
import { create } from "@/lib/create";
import { getRows } from "@/lib/get";
import { update } from "@/lib/update";
import log from "@/utils/stdlog";

export default function Page() {
    interface EmptyRow {
        content: string;
    }

    const emptyRow: EmptyRow = {
        content: "-",
    };

    const _getRows = async () => {
        const result = await getRows();

        if (result.ok) {
            return result.data;
        } else {
            // handle/report error if needed
            const message = `Failed to get rows in action: ${result.error}`;
            log.error(message);
            throw new Error(message);
        }
    };

    const createRow = async (content: string) => {
        const result = await create(content);

        if (!result.ok) {
            // handle/report error if needed
            const message = `Failed to create row in action: ${result.error}`;
            log.error(message);
            throw new Error(message);
        }
    };

    const updateRow = async (id: number, content: string) => {
        const result = await update(id, content);

        if (!result.ok) {
            // handle/report error if needed
            const message = `Failed to update row in action: ${result.error}`;
            log.error(message);
            throw new Error(message);
        }

        return result.ok;
    };

    return (
        <TableDataGrid<TableRow, EmptyRow>
            emptyRow={emptyRow}
            getRows={_getRows}
            createRow={createRow}
            updateRow={updateRow}
        />
    );
}
