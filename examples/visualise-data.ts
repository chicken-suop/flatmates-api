import { searchProperties } from "../src/search/fetchProperties";
import type { Property, SessionConfig, SearchPropertiesArgs } from "../src/types";

const sessionConfig: SessionConfig = {
    csrfToken: "testCsrfToken",
    sessionId: "testSessionId",
    flatmatesSessionId: "testFlatmatesSessionId",
    KP_UIDz: "testKpUidz",
};

const searchArgs: SearchPropertiesArgs = {
    location: "melbourne",
    billsIncluded: false,
    numberOfPropertiesToReturn: 50,
    sort: 'cheapest',
};

function calculateAverageRent(properties: Property[]): number {
    const totalRent = properties.reduce((sum, property) => sum + parseFloat(property.rent.replace(/[^0-9.-]+/g, "")), 0);
    return totalRent / properties.length;
}

function mostCommonPropertyTypes(properties: Property[]): string[] {
    const typeCount: { [key: string]: number } = {};
    properties.forEach(property => {
        typeCount[property.type] = (typeCount[property.type] || 0) + 1;
    });
    const sortedTypes = Object.entries(typeCount).sort((a, b) => b[1] - a[1]);
    return sortedTypes.map(([type]) => type);
}

function availabilityByDate(properties: Property[]): { [date: string]: number } {
    const availability: { [date: string]: number } = {};
    properties.forEach(property => {
        const date = property.earliest_date_available;
        availability[date] = (availability[date] || 0) + 1;
    });
    return availability;
}

function visualizeData(properties: Property[]) {
    const averageRent = calculateAverageRent(properties);
    const commonPropertyTypes = mostCommonPropertyTypes(properties);
    const availability = availabilityByDate(properties);

    console.log(`Average Rent: $${averageRent.toFixed(2)} per week`);
    console.log(`Most Common Property Types: ${commonPropertyTypes.join(", ")}`);
    console.log("Availability by Date:");
    Object.entries(availability).forEach(([date, count]) => {
        console.log(`${date}: ${count} properties available`);
    });
}

const properties = await searchProperties(sessionConfig, searchArgs);
visualizeData(properties);
