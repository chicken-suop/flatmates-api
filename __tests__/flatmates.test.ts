import { describe, expect, it, jest, beforeAll, afterEach } from "bun:test";
import {
    getNewMessagesCount,
    getMessages,
    getConversationAndMarkAsRead,
    sendMessage,
    searchProperties
} from "../flatmates";
import type { SessionConfig, MessagesResponse, ConversationDetailResponse, Property, SendMessageResponse } from "../types";

const sessionConfig: SessionConfig = {
    csrfToken: "testCsrfToken",
    sessionId: "testSessionId",
    flatmatesSessionId: "testFlatmatesSessionId",
    KP_UIDz: "testKpUidz",
};

describe("Flatmates Functions", () => {
    beforeAll(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it("getNewMessagesCount should return the number of new messages", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ new_messages: 5 }),
        });

        const count = await getNewMessagesCount(sessionConfig);
        expect(count).toBe(5);
    });

    it("getMessages should return a MessagesResponse", async () => {
        const mockResponse: MessagesResponse = {
            page_number: 1,
            conversation_count: 1,
            conversations: [],
        };

        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(mockResponse),
        });

        const messages = await getMessages(sessionConfig);
        expect(messages).toEqual(mockResponse);
    });

    it("getConversationAndMarkAsRead should return a ConversationDetailResponse", async () => {
        const mockResponse: ConversationDetailResponse = {
            selected_id: 1,
            participant: {
                id: 1,
                moderation_href: null,
                name: "Test",
                full_name: "Test",
                mobile_verified: true,
                mobile_allow_contact: true,
                last_online: "Today",
                banned: false,
                inactive: false,
                blocked: false,
                listing_count: 1,
                support: false,
                alerts: false,
                readOnly: false,
                why_upgrade_article: "",
                hasAvatar: false,
                masked_mobile_number: "",
                profile_photo: "",
                mobile_country_name: "",
                mobile_country_flag: "",
                verifications: [],
                properties: [],
                current_member: {
                    setup_properties: [],
                    sharable_properties: [],
                    revocable_properties: [],
                    responseRate: null,
                    id: 1,
                },
                feedback_categories: [],
            },
            messages: [],
            current_member: {
                setup_properties: [],
                sharable_properties: [],
                revocable_properties: [],
                responseRate: null,
                id: 1,
            },
        };

        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(mockResponse),
        });

        const conversation = await getConversationAndMarkAsRead(sessionConfig, 1);
        expect(conversation).toEqual(mockResponse);
    });

    it("sendMessage should send a message and return a SendMessageResponse", async () => {
        const mockResponse: SendMessageResponse = {
            status_code: 201,
            conversation: {
                id: 1,
                initiator_id: 1,
                created_at: "2024-06-25T07:16:10.618Z",
                updated_at: "2024-06-25T07:16:10.665Z",
                recipient_id: 1,
                initiator_has_active_messages: true,
                recipient_has_active_messages: true,
            },
        };

        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve(mockResponse),
        });

        const response = await sendMessage(sessionConfig, "listingId", "Hello");
        expect(response).toEqual(mockResponse);
    });

    it("searchProperties should return a list of properties", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            text: () => Promise.resolve('<html><body><div class="listingTileBox">Test Property</div></body></html>'),
        });

        const properties = await searchProperties(sessionConfig, {
            location: "melbourne",
            billsIncluded: false,
        });
        expect(properties.length).toBeGreaterThan(0);
    });
});
