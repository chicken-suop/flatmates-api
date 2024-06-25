import { getConversationAndMarkAsRead, getMessages, getNewMessagesCount } from "../flatmates";
import type { SessionConfig } from "../types";

const sessionConfig: SessionConfig = {
    csrfToken: 'testCsrfToken',
    sessionId: 'testSessionId',
    flatmatesSessionId: 'testFlatmatesSessionId',
    KP_UIDz: 'testKpUidz',
};

const newMessagesCount = await getNewMessagesCount(sessionConfig);
console.log(`You have ${newMessagesCount} new messages.`);

const messages = await getMessages(sessionConfig);
for (const message of messages.conversations) {
    const conversation = await getConversationAndMarkAsRead(sessionConfig, message.id);
    console.log(`Read conversation with ${conversation.participant.name}`);

    const newMessagesCountAfterRead = await getNewMessagesCount(sessionConfig);
    console.log(`You have ${newMessagesCountAfterRead} new messages.`);
}
