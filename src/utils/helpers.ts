/**
 * Strip HTML tags from a string
 * @param html - HTML string
 * @returns Plain text string
 */
export const stripHtml = (html: string | null): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

/**
 * Get the year from a date string
 * @param dateString - Date string
 * @returns Year as string
 */
export const getYear = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).getFullYear().toString();
};

/**
 * Format rating to 1 decimal place
 * @param rating - Rating value
 * @returns Formatted rating string
 */
export const formatRating = (rating: number | null): string => {
  if (rating === null) return 'N/A';
  return rating.toFixed(1);
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Get fallback image URL
 * @returns Fallback image URL
 */
export const getFallbackImage = (): string => {
  return 'https://via.placeholder.com/210x295/1a1a1a/ffffff?text=No+Image';
};