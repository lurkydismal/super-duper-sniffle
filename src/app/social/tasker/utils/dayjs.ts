import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { dateFormat } from "@/utils/stdvar";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: string | Date) =>
    dayjs(date).local().format(dateFormat);

export default dayjs;
