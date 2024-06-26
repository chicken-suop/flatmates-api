import type { SearchPropertiesArgs } from '../types/search';
import { formatDateToDDMMYYYY } from '../utils/date';

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
    keywords,
    sort
}: SearchPropertiesArgs): string {
    const propertyTypesParam = propertyTypes?.join('+') ?? 'rooms';
    const acceptingOfParam = acceptingOf?.join('+') ?? '';
    const minPriceParam = typeof minPrice !== 'undefined' ? `min-${minPrice}` : '';
    const maxPriceParam = typeof maxPrice !== 'undefined' ? `max-${maxPrice}` : '';
    const formattedKeywords = keywords ? `keywords-${keywords.join('-').replace(/[\s,]+/g, '-')}` : '';
    const billsIncludedParam = billsIncluded ? 'bills-included' : '';
    const formattedAvailableFrom = availableFrom ? `available-${formatDateToDDMMYYYY(availableFrom)}` : '';

    const searchParams = [
        stayLength,
        rooms,
        formattedAvailableFrom,
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
        acceptingOfParam,
        sort
    ].filter(param => param).join('+');

    return [
        propertyTypesParam,
        location,
        searchParams
    ].filter(Boolean).join('/')
}
