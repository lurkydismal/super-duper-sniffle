import axios, { AxiosRequestConfig } from 'axios';
import { apiGateway, isDev } from './stdvar';
import { user } from './shared/TestData';
import { log } from './stdlog';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

export async function sendRequest<T = any>(
    endpoint: string,
    data?: Record<string, any> | FormData,
    method: Method = 'POST',
    devResponse?: T,
): Promise<T> {
    log.trace(`${method} request to ${endpoint}${data ? ` with data: '${JSON.stringify(data)}'` : ""}`);

    if (isDev && devResponse) {
        log.debug(`Mock response: ${devResponse}`);

        return new Promise((resolve) =>
            setTimeout(() => resolve(devResponse), 100),
        );
    }

    const isFormData = data instanceof FormData;

    try {
        const config: AxiosRequestConfig = {
            method,
            url: `${apiGateway}/${endpoint}`,
            headers: isFormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' },
            data: data,
        };

        log.trace(`${method} request to ${config.url}`);

        const response = await axios(config);

        log.trace(`Status: ${response.status}`);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        log.trace(`Data: ${response.data}`);

        return response.data;
    } catch (error: any) {
        log.trace(`Request failed: ${error?.response?.status || error.message}`);

        throw error;
    }
}

export async function checkAuth(): Promise<boolean> {
    if (isDev) {
        log.debug("Auth verification skipped");

        return true;
    }

    if (!getCredentials()) {
        return false;
    }

    try {
        await sendRequest(`auth/verify`);

        return true;
    } catch {
        return false;
    }

}

interface UserCredentials {
    id: number;
    username: string;
}

export function storeCredentials(credentials: UserCredentials) {
    if (isDev) {
        log.debug('Skipping credential store in dev');

        return;
    }

    log.debug(`Storing credentials for '${credentials.username}'`);

    localStorage.setItem('id', String(credentials.id));
    localStorage.setItem('username', credentials.username);
}

export function getCredentials(): UserCredentials {
    if (isDev) {
        log.debug(`Returning dev credentials: ${user}`);

        return user;
    }

    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    if (!id || !username) {
        log.error('Missing credentials');

        throw new Error(`Getting credentials failed`);
    }

    return {
        id: Number(id),
        username,
    };
}

export function paginate<T>(
    items: T[],
    currentPage: number,
    perPage: number,
): T[] {
    log.trace(`Paginate page=${currentPage} size=${perPage}`);

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return items.slice(start, end);
}
