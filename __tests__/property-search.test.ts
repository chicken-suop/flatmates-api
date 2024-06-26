import { describe, expect, it } from "bun:test";
import cheerio from "cheerio";
import type { SearchPropertiesArgs } from "../src/types";
import { buildSearchUrl } from "../src/search/buildUrl";
import { extractPropertyDetails } from "../src/search/parse";

describe("Property Search Functions", () => {
    it("buildSearchUrl should construct a correct URL", () => {
        const args: SearchPropertiesArgs = {
            location: "melbourne",
            minPrice: 100,
            maxPrice: 1000,
            billsIncluded: true,
            availableFrom: new Date('2024-06-25'),
            stayLength: "1-year",
            propertyTypes: ["granny-flats", "studios"],
            womenOnlyHousehold: "all-female",
            roomType: "private-room",
            placesAccepting: "females",
            furnishings: "furnished",
            bathroomType: "ensuite",
            rooms: "2-rooms",
            parkingType: "off-street-parking",
            acceptingOf: ["pets", "students"],
            keywords: ["air-con"],
            sort: "cheapest",
        };

        const url = buildSearchUrl(args);
        expect(url).toContain('granny-flats+studios/melbourne/1-year+2-rooms+available-25-06-2024+females+private-room+all-female+furnished+ensuite+off-street-parking+keywords-air-con+min-100+max-1000+bills-included+pets+students+cheapest');
    });

    it("extractPropertyDetails should extract property details from HTML", () => {
        const html = `
            <div class="listingTileBox">
                <a class="contentBox" href="/share-house-melbourne-3053-P12345" aria-label="Test Property"></a>
                <div class="price">$300 / week</div>
                <div class="address">Melbourne</div>
                <div class="secondaryContent">Test Details</div>
                <div class="availability">Available Now</div>
                <div class="imageContainer"><img src="https://test.com/image.jpg" /></div>
                <div class="propertyFeature"><p>2</p></div>
                <div class="propertyFeature"><p>1</p></div>
                <div class="propertyFeature"><p>0</p></div>
            </div>
        `;
        const $ = cheerio.load(html);
        const element = $(".listingTileBox")[0];
        const property = extractPropertyDetails(element, $);
        expect(property).toEqual({
            id: 12345,
            title: "Test Property",
            link: "https://flatmates.com.au/share-house-melbourne-3053-P12345",
            address: "Melbourne",
            price: "$300 / week",
            image: "https://test.com/image.jpg",
            availableNow: true,
            rooms: 2,
            bathrooms: 1,
            carSpaces: 0,
            type: "",
            rent: "$300 / week",
            earliestDateAvailable: new Date(),
        });
    });
});
