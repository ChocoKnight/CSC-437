const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const formatDate = (date: Date | string | undefined) => {
    const dt =
        (typeof date === "string" ? new Date(date) : date) ||
        new Date();
    const m = months[dt.getUTCMonth()];
    const d = dt.getUTCDate();
    const y = dt.getUTCFullYear();

    return `${d} ${m} ${y}`;
};

interface DateStringRange {
    startDate: string;
    endDate: string;
}

interface DateRange {
    startDate: Date;
    endDate?: Date;
}

export function parseUTCDate(s: string) {
    const date = new Date(Date.parse(s));
    const d = date.getUTCDate();
    const m = date.getUTCMonth();
    const y = date.getUTCFullYear();

    return new Date(Date.UTC(y, m, d));
}

export function convertStartEndDates<T extends DateRange>(
    obj: unknown
) {
    const datestrings = obj as DateStringRange;
    let result = obj as T;
    result.startDate = parseUTCDate(datestrings.startDate);
    result.endDate = datestrings.endDate
        ? parseUTCDate(datestrings.endDate)
        : undefined;
    return result;
}