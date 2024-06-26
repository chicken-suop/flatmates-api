export type StayLength = 
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

export type RoomCount = '1-rooms' | '2-rooms' | '3-rooms' | '4-rooms';

export type PlacesAccepting = 
    | 'females'
    | 'males'
    | 'couples';

export type AcceptingOf =
    | 'backpackers'
    | 'children'
    | 'lgbt-friendly'
    | 'over-40'
    | 'pets'
    | 'retirees'
    | 'smokers'
    | 'students';

export type RoomType = 'private-room' | 'shared-room';

export type WomenOnlyHousehold = 'all-female';

export type Furnishings = 'furnished' | 'unfurnished';

export type BathroomType = 'ensuite' | 'ensuite-or-own';

export type ParkingType = 'off-street-parking' | 'no-parking' | 'on-street-parking';

export type PropertyType =
    | 'rooms'
    | 'share-houses'
    | 'granny-flats'
    | 'studios'
    | '1-beds'
    | 'whole-properties'
    | 'student-accommodation'
    | 'homestays';

export type PropertySearchSort = 'newest' | 'cheapest' | 'most-expensive' | 'earliest-available' | 'recently-active';

export type SearchFilters = {
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
    sort?: PropertySearchSort;
};

export interface SearchPropertiesArgs extends SearchFilters {
    location: string;
    numberOfPropertiesToReturn?: number;
}
