import { API_BASE_URL } from '../client/session';
import type { Property } from '../types';

const extractText = (element: cheerio.Element, $: cheerio.Root, selector: string): string =>
    $(element).find(selector).text().trim();

const extractAttribute = (element: cheerio.Element, $: cheerio.Root, selector: string, attribute: string): string =>
    $(element).find(selector).attr(attribute) || '';

const extractNumber = (element: cheerio.Element, $: cheerio.Root, selector: string): number =>
    parseInt(extractText(element, $, selector), 10) || 0;

const extractPropertyId = (linkElement: cheerio.Cheerio): number => {
    const idMatch = linkElement.attr('href')?.match(/P(\d+)/);
    return idMatch ? parseInt(idMatch[1], 10) : 0;
};

const isAvailableNow = (availabilityText: string): boolean => availabilityText.includes('Available Now');

export const extractPropertyDetails = (element: cheerio.Element, $: cheerio.Root): Property => {
    const linkElement = $(element).find('a[class*="contentBox"]');
    const features = $(element).find('[class*="propertyFeature"]');

    return {
        id: extractPropertyId(linkElement),
        title: linkElement.attr('aria-label')?.trim() || '',
        link: `${API_BASE_URL}${linkElement.attr('href')}`,
        address: extractText(element, $, '[class*="address"]'),
        price: extractText(element, $, '[class*="price"]'),
        image: extractAttribute(element, $, '[class*="imageContainer"] img', 'src'),
        availableNow: isAvailableNow(extractText(element, $, '[class*="availability"]')),
        rooms: extractNumber(features[0], $, 'p'),
        bathrooms: extractNumber(features[1], $, 'p'),
        carSpaces: extractNumber(features[2], $, 'p'),
        type: extractText(element, $, '[class*="roomInfo"]'),
        rent: extractText(element, $, '[class*="price"]'),
        earliest_date_available: extractText(element, $, '[class*="availability"]'),
    };
}