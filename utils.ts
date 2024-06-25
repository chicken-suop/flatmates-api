export function toUrlEncoded(payload: Record<string, any>): string {
    return Object.keys(payload)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]))
        .join('&');
}

export function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
