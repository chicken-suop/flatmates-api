import { API_BASE_URL } from "../client/session";
import type { Property } from "../types";

export function extractPropertyDetails(element: cheerio.Element, $: cheerio.Root): Property {
    const linkElement = $(element).find('[class*="contentBox"]');
    const priceElement = $(element).find('[class*="price"]');
    const addressElement = $(element).find('[class*="address"]');
    const detailsElement = $(element).find('[class*="secondaryContent"]');
    const availabilityElement = $(element).find('[class*="availability"]');
    const imageElement = $(element).find('[class*="imageContainer"] img');

    const features = $(element).find('[class*="propertyFeature"]');
    const rooms = parseInt($(features[0]).find('p').text().trim(), 10) || 0;
    const bathrooms = parseInt($(features[1]).find('p').text().trim(), 10) || 0;
    const carSpaces = parseInt($(features[2]).find('p').text().trim(), 10) || 0;

    const idMatch = linkElement.attr('href')?.match(/P(\d+)/);
    const id = idMatch ? parseInt(idMatch[1], 10) : 0;

    const hasVideoLink = $(element).find('[class*="listingCarousel"]').length > 0;
    const acceptingInPersonInspections = $(element).text().includes('Available Now');

    return {
        id: id,
        title: linkElement.attr('aria-label')?.trim() || '',
        link: `${API_BASE_URL}${linkElement.attr('href')}`,
        address: addressElement.text().trim(),
        price: priceElement.text().trim(),
        details: detailsElement.text().trim(),
        image: imageElement.attr('src') || '',
        availableNow: availabilityElement.text().trim() === 'Available Now',
        rooms: rooms,
        bathrooms: bathrooms,
        carSpaces: carSpaces,
        type: detailsElement.find('[class*="roomInfo"]').text().trim(),
        rent: priceElement.text().trim(),
        earliest_date_available: availabilityElement.text().trim(),
        has_video_link: hasVideoLink,
        accepting_in_person_inspections: acceptingInPersonInspections,
    };
}
