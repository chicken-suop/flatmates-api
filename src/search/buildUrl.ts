import type { SearchFilters, SearchPropertiesArgs } from '../types/search';
import { formatDateToDDMMYYYY } from '../utils/date';

const joinItems = (items: any[] = [], delimiter = '+') => items.join(delimiter);

const formatRange = (value?: number, type?: 'min' | 'max') => (value !== undefined ? `${type}-${value}` : '');

const formatKeywords = (keywords: string[] = []) => 
    keywords.length ? `keywords-${keywords.join('-').replace(/[\s,]+/g, '-')}` : '';

const formatDate = (date?: Date) => date ? `available-${formatDateToDDMMYYYY(date)}` : '';

const formatFlag = (label: string, flag?: boolean) => (flag ? label : '');

const buildQueryParams = (filters: SearchFilters) => {
    return joinItems([
        filters.stayLength,
        filters.rooms,
        formatDate(filters.availableFrom),
        filters.placesAccepting,
        filters.roomType,
        filters.womenOnlyHousehold,
        filters.furnishings,
        filters.bathroomType,
        filters.parkingType,
        formatKeywords(filters.keywords),
        formatRange(filters.minPrice, 'min'),
        formatRange(filters.maxPrice, 'max'),
        formatFlag('bills-included', filters.billsIncluded),
        joinItems(filters.acceptingOf),
        filters.sort
    ].filter(Boolean));
};

export const buildSearchUrl = (args: SearchPropertiesArgs): string => {
    const { location, propertyTypes, ...filters } = args;

    return joinItems([
        joinItems(propertyTypes),
        location,
        buildQueryParams(filters)
    ], '/');
};
