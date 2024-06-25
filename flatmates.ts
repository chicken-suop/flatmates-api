import { createSessionHeaders, fetchGet, fetchGetHtml, fetchPost } from './client';
import { buildSearchUrl, extractPropertyDetails } from './property-search';
import type { ConversationDetailResponse, MessagesResponse, Property, SearchPropertiesArgs, SendMessagePayload, SendMessageResponse, SessionConfig } from './types';
import { toUrlEncoded } from './utils';

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

    const url = buildSearchUrl(searchArgs);
    console.log(url)
    const $ = await fetchGetHtml(url, headers);

    const properties: Property[] = [];

    $('[class*="listingTileBox"]').each((index, element) => {
        const property = extractPropertyDetails(element, $);
        properties.push(property);
    });

    return properties;
}

