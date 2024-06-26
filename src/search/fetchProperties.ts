import { fetchGetHtml } from "../client/api";
import { createSessionHeaders } from "../client/session";
import type { Property, SearchPropertiesArgs, SessionConfig } from "../types";
import { buildSearchUrl } from "./buildUrl";
import { extractPropertyDetails } from "./parse";

const PROPERTIES_PER_PAGE = 12;

export async function fetchPropertiesPage(url: string, headers: Headers): Promise<cheerio.Root> {
    const $ = await fetchGetHtml(url, headers);
    return $;
}

export function getNumberOfPagesToFetch(numberOfPropertiesToReturn: number, propertiesPerPage: number): number {
    return Math.ceil(numberOfPropertiesToReturn / propertiesPerPage);
}

export function parsePropertiesFromPage($: cheerio.Root): Property[] {
    const properties: Property[] = [];

    $('[class*="listingTileBox"]').each((index, element) => {
        const property = extractPropertyDetails(element, $);
        properties.push(property);
    });

    return properties;
}

export async function searchProperties(
    sessionConfig: SessionConfig,
    searchArgs: SearchPropertiesArgs
): Promise<Property[]> {
    const headers = createSessionHeaders(sessionConfig);
    headers.set('Accept', 'text/html');

    const { numberOfPropertiesToReturn = PROPERTIES_PER_PAGE, sort = '' } = searchArgs;
    const numberOfPagesToFetch = getNumberOfPagesToFetch(numberOfPropertiesToReturn, PROPERTIES_PER_PAGE);

    const properties: Property[] = [];
    const urlBase = buildSearchUrl(searchArgs);

    for (let page = 1; page <= numberOfPagesToFetch; page++) {
        const url = `/${urlBase}?page=${page}&search_source=search_function`;
        console.log('Fetching page:', page, url)
        const $ = await fetchPropertiesPage(url, headers);
        const pageProperties = parsePropertiesFromPage($);
        properties.push(...pageProperties);

        if (properties.length >= numberOfPropertiesToReturn) break;
    }

    return properties.slice(0, numberOfPropertiesToReturn);
}
