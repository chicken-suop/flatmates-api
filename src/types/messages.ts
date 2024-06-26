import type { Property } from "./property";

export interface ConversationDetailResponse {
    selected_id: number;
    participant: Participant;
    messages: Message[];
    current_member: CurrentMember;
}

export interface MessagesResponse {
    page_number: number;
    conversation_count: number;
    conversations: Conversation[];
}

export interface SendMessageResponse {
    status_code: number;
    conversation: {
        id: number;
        initiator_id: number;
        created_at: string;
        updated_at: string;
        recipient_id: number;
        initiator_has_active_messages: boolean;
        recipient_has_active_messages: boolean;
    };
}

export interface SendMessagePayload {
    listing: string;
    listing_id: string;
    member_id?: string;
    message: string;
}

export interface Conversation {
    id: number;
    created_at: string;
    updated_at: string;
    participant: Participant;
    has_new_message: boolean;
    recent: RecentMessage;
}

export interface Message {
    id: number;
    created_at: string;
    delivered_at: string;
    sender_id: number;
    message: string;
    regarding: Regarding;
    adminMode: boolean;
    read_receipts: ReadReceipts;
    seen_at: string;
    own_message: boolean;
    participant: ParticipantMini;
    kind: null | string;
}

export interface Participant {
    id: number;
    moderation_href: null | string;
    name: string;
    full_name: string;
    mobile_verified: boolean;
    mobile_allow_contact: boolean;
    last_online: string;
    banned: boolean;
    inactive: boolean;
    blocked: boolean;
    listing_count: number;
    support: boolean;
    alerts: boolean;
    readOnly: boolean;
    why_upgrade_article: string;
    hasAvatar: boolean;
    masked_mobile_number: string;
    profile_photo: string;
    mobile_country_name: string;
    mobile_country_flag: string;
    verifications: Verification[];
    properties: Property[];
    current_member: CurrentMember;
    feedback_categories: FeedbackCategory[];
}

export interface RecentMessage {
    message: string;
    read_receipts: ReadReceipts;
    own_message: boolean;
    kind: string | null;
}

export interface ReadReceipts {
    status: string;
    status_message: string;
}

export interface ParticipantMini {
    full_name: string;
    profile_photo: string;
    hasAvatar: boolean;
}

export interface Regarding {
    listing_type: string;
    listing_id: number;
    subject: string;
    own_listing: boolean;
    link: string;
    canonical_link: string;
    status: string;
}

export interface CurrentMember {
    setup_properties: SetupProperty[];
    sharable_properties: SharableProperty[];
    revocable_properties: RevocableProperty[];
    responseRate: number | null;
    id: number;
}

export interface SetupProperty {
    // Assume properties
}

export interface SharableProperty {
    // Assume properties
}

export interface RevocableProperty {
    // Assume properties
}

export interface Verification {
    type: string;
    verified: boolean;
}

export type FeedbackCategory = [string, string];
