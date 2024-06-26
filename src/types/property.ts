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
