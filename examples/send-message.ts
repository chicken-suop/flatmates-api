import { sendMessage } from "../src/flatmates";
import type { SendMessagePayload, SessionConfig } from "../src/types";

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
