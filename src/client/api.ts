import Cheerio from 'cheerio';
import { API_BASE_URL } from './session';

export async function fetchGetHtml(url: string, headers: Headers): Promise<cheerio.Root> {
    const response = await fetch(`${API_BASE_URL}${url}`, { method: 'GET', headers });
    const data = await response.text();
    return Cheerio.load(data);
}

export async function fetchGet(url: string, headers: Headers) {
    const response = await fetch(`${API_BASE_URL}${url}`, { method: 'GET', headers });
    const data = await response.json();
    return data;
}

export async function fetchPost(url: string, data: any, headers: Headers) {
    const response = await fetch(`${API_BASE_URL}${url}`, { method: 'POST', headers, body: JSON.stringify(data) });
    const responseData = await response.json();
    return responseData;
}