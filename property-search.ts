import { API_BASE_URL } from "./client";
import type { Property, SearchPropertiesArgs } from "./types";

export function buildSearchUrl({
    location,
    minPrice,
    maxPrice,
    billsIncluded,
    availableFrom,
    stayLength,
    propertyTypes,
    womenOnlyHousehold,
    roomType,
    placesAccepting,
    furnishings,
    bathroomType,
    rooms,
    parkingType,
    acceptingOf,
    keywords
}: SearchPropertiesArgs): string {
    const propertyTypesParam = propertyTypes?.join('+') ?? 'rooms';
    const acceptingOfParam = acceptingOf?.join('+') ?? '';
    const minPriceParam = typeof minPrice !== 'undefined' ? `min-${minPrice}` : '';
    const maxPriceParam = typeof maxPrice !== 'undefined' ? `max-${maxPrice}` : '';
    const formattedKeywords = keywords ? `keywords-${keywords.join('-').replace(/[\s,]+/g, '-')}` : '';
    const billsIncludedParam = billsIncluded ? 'bills-included' : '';

    const searchParams = [
        stayLength,
        rooms,
        availableFrom ? `available-${availableFrom}` : '',
        placesAccepting,
        roomType,
        womenOnlyHousehold,
        furnishings,
        bathroomType,
        parkingType,
        formattedKeywords,
        minPriceParam,
        maxPriceParam,
        billsIncludedParam,
        acceptingOfParam
    ].filter(param => param).join('+');

    return `/${[
        propertyTypesParam,
        location,
        searchParams
    ].filter(Boolean).join('/')}/?search_source=search_function`;
}

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
