import { API_BASE_URL } from "../client/session";
import type { Property } from "../types";

const extractText = (element: cheerio.Element, $: cheerio.Root, selector: string): string =>
    $(element).find(selector).text().trim();

const extractAttribute = (element: cheerio.Element, $: cheerio.Root, selector: string, attribute: string): string =>
    $(element).find(selector).attr(attribute) || '';

const extractNumber = (element: cheerio.Element, $: cheerio.Root, selector: string): number =>
    parseInt(extractText(element, $, selector), 10) || 0;

const extractRoomsDetails = (features: cheerio.Cheerio, $: cheerio.Root): { rooms: number, bathrooms: number, carSpaces: number } => ({
    rooms: extractNumber(features[0], $, 'p'),
    bathrooms: extractNumber(features[1], $, 'p'),
    carSpaces: extractNumber(features[2], $, 'p'),
});

const extractPropertyId = (linkElement: cheerio.Cheerio): number => {
    const idMatch = linkElement.attr('href')?.match(/P(\d+)/);
    return idMatch ? parseInt(idMatch[1], 10) : 0;
};

const isAvailableNow = (availabilityText: string): boolean => availabilityText === 'Available Now';

const hasVideoLink = (element: cheerio.Element, $: cheerio.Root): boolean => 
    $(element).find('[class*="listingCarousel"]').length > 0;

export const extractPropertyDetails = (element: cheerio.Element, $: cheerio.Root): Property => {
    const linkElement = $(element).find('[class*="contentBox"]');
    const features = $(element).find('[class*="propertyFeature"]');
    const availabilityElement = $(element).find('[class*="availability"]');

    const { rooms, bathrooms, carSpaces } = extractRoomsDetails(features, $);

    return {
        id: extractPropertyId(linkElement),
        title: linkElement.attr('aria-label')?.trim() || '',
        link: `${API_BASE_URL}${linkElement.attr('href')}`,
        address: extractText(element, $, '[class*="address"]'),
        price: extractText(element, $, '[class*="price"]'),
        details: extractText(element, $, '[class*="secondaryContent"]'),
        image: extractAttribute(element, $, '[class*="imageContainer"] img', 'src'),
        availableNow: isAvailableNow(extractText(element, $, '[class*="availability"]')),
        rooms,
        bathrooms,
        carSpaces,
        type: extractText(element, $, '[class*="roomInfo"]'),
        rent: extractText(element, $, '[class*="price"]'),
        earliest_date_available: extractText(element, $, '[class*="availability"]'),
        has_video_link: hasVideoLink(element, $),
        accepting_in_person_inspections: isAvailableNow(extractText(element, $, '[class*="availability"]')),
    };
}