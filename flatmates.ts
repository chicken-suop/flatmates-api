import { createSessionHeaders, fetchGet, fetchGetHtml, fetchPost } from './client';
import { buildSearchUrl, extractPropertyDetails, fetchPropertiesPage, getNumberOfPagesToFetch, parsePropertiesFromPage } from './property-search';
import type { ConversationDetailResponse, MessagesResponse, Property, SearchPropertiesArgs, SendMessagePayload, SendMessageResponse, SessionConfig } from './types';
import { toUrlEncoded } from './utils';

const PROPERTIES_PER_PAGE = 12;

export async function getNewMessagesCount(sessionConfig: SessionConfig): Promise<number> {
    const headers = createSessionHeaders(sessionConfig);
    const response = await fetchGet('/conversations/new_messages', headers);
    return response.new_messages as number;
}

export async function getMessages(sessionConfig: SessionConfig): Promise<MessagesResponse> {
    const headers = createSessionHeaders(sessionConfig);
    const url = '/conversations/unread.json';
    const response = await fetchGet(url, headers);
    return response as MessagesResponse;
}

export async function getConversationAndMarkAsRead(sessionConfig: SessionConfig, conversationId: number): Promise<ConversationDetailResponse> {
    const headers = createSessionHeaders(sessionConfig);
    const url = `/conversations/${conversationId}.json`;
    const response = await fetchGet(url, headers);
    return response as ConversationDetailResponse;
}


export async function sendMessage(
    sessionConfig: SessionConfig,
    payload: SendMessagePayload,
): Promise<SendMessageResponse> {
    const headers = createSessionHeaders(sessionConfig);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = toUrlEncoded(payload);

    const url = '/conversations/create';
    const response = await fetchPost(url, body, headers);
    return response as SendMessageResponse;
}

export async function peopleSearch(sessionConfig: SessionConfig, params: any) {
    const headers = createSessionHeaders(sessionConfig);
    // Implement query parameter construction based on params
    return await fetchGet(`/people/search?${new URLSearchParams(params).toString()}`, headers);
}

export async function searchProperties(
    sessionConfig: SessionConfig,
    searchArgs: SearchPropertiesArgs
): Promise<Property[]> {
    const headers = createSessionHeaders(sessionConfig);
    headers.set('Accept', 'text/html');

    const { numberOfPropertiesToReturn = PROPERTIES_PER_PAGE, sort = '' } = searchArgs;
    const numberOfPagesToFetch = getNumberOfPagesToFetch(numberOfPropertiesToReturn, PROPERTIES_PER_PAGE);

    const properties: Property[] = [];
    const urlBase = buildSearchUrl(searchArgs);

    for (let page = 1; page <= numberOfPagesToFetch; page++) {
        const url = `/${urlBase}?page=${page}&search_source=search_function`;
        console.log('Fetching page:', page, url)
        const $ = await fetchPropertiesPage(url, headers);
        const pageProperties = parsePropertiesFromPage($);
        properties.push(...pageProperties);

        if (properties.length >= numberOfPropertiesToReturn) break;
    }

    return properties.slice(0, numberOfPropertiesToReturn);
}
