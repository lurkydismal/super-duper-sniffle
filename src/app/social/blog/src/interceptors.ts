import axios from "axios";
import { isDev } from "./stdvar";
import { log } from "./stdlog";

export function enableInterceptors() {
    if (!isDev) return;

    axios.interceptors.request.use((config) => {
        const data = config.data ? `: '${JSON.stringify(config.data)}'` : "";
        const parameters = config.params
            ? `: '${JSON.stringify(config.params)}'`
            : "";

        log.debug(
            `${config.url} ${config.method?.toUpperCase()}${data}${parameters}`,
        );

        return config;
    });

    axios.interceptors.response.use(
        (res) => {
            log.debug(`${res.config.url} ${res.status}: '${res.data}'`);

            return res;
        },
        (err) => {
            const data = err?.response?.data;

            log.error(
                `${err?.config?.url} ${err?.response?.status}${data ? `: '${data}'` : ""}`,
            );

            return Promise.reject(err);
        },
    );
}
