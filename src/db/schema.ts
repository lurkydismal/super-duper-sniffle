import { Dayjs } from "dayjs";

export type TableRow = {
    id: number;
    content: string;
    created_at: Dayjs;
    updated_at: Dayjs;
};

export type TableRowInsert = {
    id?: number | undefined
    content: string;
    created_at?: Dayjs | undefined;
    updated_at?: Dayjs | undefined;
};
