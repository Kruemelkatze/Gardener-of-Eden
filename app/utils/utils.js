
// Format year with BC/AD suffix, remove 0s from the beginning of the year and minus sign from BC years
export function formatYear(year) {
    if (year < 0) {
        return `${-year} BC`;
    } else if (year === 0) {
        return "0";
    } else {
        return `${year} AD`;
    }
}