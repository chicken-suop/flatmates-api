import { fetchGet, fetchPost } from '../client/api';
import { createSessionHeaders } from '../client/session';
import type { ConversationDetailResponse, MessagesResponse, SendMessagePayload, SendMessageResponse, SessionConfig } from '../types';
import { toUrlEncoded } from '../utils/url';

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
    return await fetchGet(`/people/search?${new URLSearchParams(params).toString()}`, headers);
}
