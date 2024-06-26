import { describe, expect, it, jest } from "bun:test";
import type { SessionConfig } from "../src/types";
import { createSessionHeaders } from "../src/client/session";
import { fetchGet, fetchGetHtml, fetchPost } from "../src/client/api";

const sessionConfig: SessionConfig = {
    csrfToken: "testCsrfToken",
    sessionId: "testSessionId",
    flatmatesSessionId: "testFlatmatesSessionId",
    KP_UIDz: "testKpUidz",
};

describe("Client Functions", () => {
    it("createSessionHeaders should create headers with session cookies", () => {
        const headers = createSessionHeaders(sessionConfig);
        expect(headers.get("X-CSRF-Token")).toBe(sessionConfig.csrfToken);
        expect(headers.get("Cookie")).toContain(`_flatmates_session=${sessionConfig.flatmatesSessionId}`);
        expect(headers.get("Cookie")).toContain(`KP_UIDz=${sessionConfig.KP_UIDz}`);
    });

    it("fetchGet should make a GET request and return JSON data", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
            })
        ) as jest.Mock;

        const headers = createSessionHeaders(sessionConfig);
        const data = await fetchGet("/test-url", headers);
        expect(data).toEqual({ success: true });
    });

    it("fetchPost should make a POST request and return JSON data", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
            })
        ) as jest.Mock;

        const headers = createSessionHeaders(sessionConfig);
        const data = await fetchPost("/test-url", { key: "value" }, headers);
        expect(data).toEqual({ success: true });
    });

    it("fetchGetHtml should make a GET request and return HTML data", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve("<html><body>Test</body></html>"),
            })
        ) as jest.Mock;

        const headers = createSessionHeaders(sessionConfig);
        const $ = await fetchGetHtml("/test-url", headers);
        expect($.html()).toContain("Test");
    });
});
