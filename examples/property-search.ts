import { searchProperties } from "../flatmates";
import type { SearchPropertiesArgs, SessionConfig } from "../types";

const sessionConfig: SessionConfig = {
    csrfToken: 'testCsrfToken',
    sessionId: 'testSessionId',
    flatmatesSessionId: 'testFlatmatesSessionId',
    KP_UIDz: 'testKpUidz',
};

const searchArgs: SearchPropertiesArgs = {
    location: 'melbourne-3000',
    minPrice: 100,
    maxPrice: 1000,
    billsIncluded: true,
    availableFrom: new Date('2024-04-01'),
    stayLength: '1-year',
    sort: 'cheapest',
    numberOfPropertiesToReturn: 24,
};

const properties = await searchProperties(sessionConfig, searchArgs);
console.log('Properties:', properties);
