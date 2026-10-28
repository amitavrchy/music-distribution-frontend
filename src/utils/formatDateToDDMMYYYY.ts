/**
 * Convert ISO date string to DD/MM/YYYY format
 * @param isoDate - ISO date string or Date object
 * @returns formatted date string (DD/MM/YYYY)
 */
export function formatDateToDDMMYYYY(isoDate: string | Date): string {
  const date = isoDate instanceof Date ? isoDate : new Date(isoDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
