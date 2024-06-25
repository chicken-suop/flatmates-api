export interface SessionConfig {
    csrfToken: string;
    sessionId: string;
    flatmatesSessionId: string;
    KP_UIDz: string;
}

export interface CurrentMember {
    setup_properties: SetupProperty[]; // Assuming details will be added later
    sharable_properties: SharableProperty[]; // Assuming details will be added later
    revocable_properties: RevocableProperty[]; // Assuming details will be added later
    responseRate: number | null;
    id: number;
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
    verifications: Verification[]; // More specific type for verification details
    properties: Property[];
    current_member: CurrentMember;
    feedback_categories: FeedbackCategory[];
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

export interface Regarding {
    listing_type: string;
    listing_id: number;
    subject: string;
    own_listing: boolean;
    link: string;
    canonical_link: string;
    status: string;
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

export interface ConversationDetailResponse {
    selected_id: number;
    participant: Participant;
    messages: Message[];
    current_member: CurrentMember;
}

export interface RecentMessage {
    message: string;
    read_receipts: ReadReceipts;
    own_message: boolean;
    kind: string | null;
}

export interface Conversation {
    id: number;
    created_at: string;
    updated_at: string;
    participant: Participant;
    has_new_message: boolean;
    recent: RecentMessage;
}

export interface MessagesResponse {
    page_number: number;
    conversation_count: number;
    conversations: Conversation[];
}

// Example definitions for assumed details
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

export type FeedbackCategory = [string, string]; // Tuple for feedback category label and identifier

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

type StayLength = 
    | '1-week'
    | '2-weeks'
    | '4-weeks'
    | '6-weeks'
    | '2-months'
    | '3-months'
    | '4-months'
    | '6-months'
    | '9-months'
    | '1-year';
type RoomCount = '1-rooms' | '2-rooms' | '3-rooms' | '4-rooms';
type PlacesAccepting = 
    | 'females'
    | 'males'
    | 'couples';
type AcceptingOf =
    | 'backpackers'
    | 'children'
    | 'lgbt-friendly'
    | 'over-40'
    | 'pets'
    | 'retirees'
    | 'smokers'
    | 'students';
type RoomType = 'private-room' | 'shared-room';
type WomenOnlyHousehold = 'all-female';
type Furnishings = 'furnished' | 'unfurnished';
type BathroomType = 'ensuite' | 'ensuite-or-own';
type ParkingType = 'off-street-parking' | 'no-parking' | 'on-street-parking';
type PropertyType = 
    | 'share-houses'
    | 'granny-flats'
    | 'studios'
    | '1-beds'
    | 'whole-properties'
    | 'student-accommodation'
    | 'homestays';
type PropertySearchSort = 'newest' | 'cheapest' | 'most-expensive' | 'earliest-available' | 'recently-active';

export interface SearchPropertiesArgs {
    location: string;
    minPrice?: number;
    maxPrice?: number;
    billsIncluded?: boolean;
    availableFrom?: Date;
    stayLength?: StayLength;
    propertyTypes?: PropertyType[];
    womenOnlyHousehold?: WomenOnlyHousehold;
    roomType?: RoomType;
    placesAccepting?: PlacesAccepting;
    furnishings?: Furnishings;
    bathroomType?: BathroomType;
    rooms?: RoomCount;
    parkingType?: ParkingType;
    acceptingOf?: AcceptingOf[];
    keywords?: string[];
    numberOfPropertiesToReturn?: number;
    sort?: PropertySearchSort,
}

export interface Property {
    id: number;
    title: string;
    link: string;
    address: string;
    price: string;
    details: string;
    image: string;
    availableNow: boolean;
    rooms: number;
    bathrooms: number;
    carSpaces: number;
    type: string;
    rent: string;
    earliest_date_available: string;
    has_video_link: boolean;
    accepting_in_person_inspections: boolean;
}
