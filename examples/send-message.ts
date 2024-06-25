import { sendMessage } from "../flatmates";
import type { SendMessagePayload, SessionConfig } from "../types";

const sessionConfig: SessionConfig = {
    csrfToken: 'testCsrfToken',
    sessionId: 'testSessionId',
    flatmatesSessionId: 'testFlatmatesSessionId',
    KP_UIDz: 'testKpUidz',
};

const sendMessagePayload: SendMessagePayload = {
    listing: 'PROPERTY',
    listing_id: '1539732',
    message: "Hi :)",
};

const sendMessageResponse = await sendMessage(sessionConfig, sendMessagePayload);
console.log('Send message response:', sendMessageResponse);
