import type { SessionConfig } from "../types";

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
