import Cheerio from "cheerio";
import type { SessionConfig } from "./types";

export const API_BASE_URL = 'https://flatmates.com.au';
const REQUEST_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://flatmates.com.au',
    'Referer': 'https://flatmates.com.au'
};

export function createSessionHeaders({ csrfToken, sessionId, flatmatesSessionId, KP_UIDz }: SessionConfig): Headers {
    const headers = new Headers(REQUEST_HEADERS);
    headers.set('X-CSRF-Token', csrfToken);
    const cookies = {
        _flatmates_session: flatmatesSessionId,
        KP_UIDz
    };
    const cookieString = Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ');
    headers.set('Cookie', cookieString);
    return headers;
}

export async function fetchGet(url: string, headers: Headers) {
    const response = await fetch(`${API_BASE_URL}${url}`, { method: 'GET', headers });
    const data = await response.json();
    return data;
}

export async function fetchPost(url: string, data: any, headers: Headers) {
    const response = await fetch(`${API_BASE_URL}${url}`, { method: 'POST', headers, body: data });
    const responseData = await response.json();
    return responseData;
}

export async function fetchGetHtml(url: string, headers: Headers) {
    const response = await fetch(`${API_BASE_URL}${url}`, { method: 'GET', headers });
    const data = await response.text();
    return Cheerio.load(data);
}
