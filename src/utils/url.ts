export function toUrlEncoded(payload: Record<string, any>): string {
    return Object.keys(payload)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]))
        .join('&');
}
