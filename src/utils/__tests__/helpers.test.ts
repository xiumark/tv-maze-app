import { describe, it, expect } from 'vitest';
import { stripHtml, getYear, formatRating, getFallbackImage } from '../helpers';

describe('Helper Functions', () => {
  describe('stripHtml', () => {
    it('removes HTML tags from string', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      expect(stripHtml(html)).toBe('Hello World');
    });

    it('returns empty string for null input', () => {
      expect(stripHtml(null)).toBe('');
    });
  });

  describe('getYear', () => {
    it('extracts year from date string', () => {
      expect(getYear('2020-01-01')).toBe('2020');
    });

    it('returns "N/A" for null input', () => {
      expect(getYear(null)).toBe('N/A');
    });
  });

  describe('formatRating', () => {
    it('formats rating to 1 decimal place', () => {
      expect(formatRating(8.567)).toBe('8.6');
    });

    it('returns "N/A" for null rating', () => {
      expect(formatRating(null)).toBe('N/A');
    });
  });

  describe('getFallbackImage', () => {
    it('returns a valid fallback image URL', () => {
      const url = getFallbackImage();
      expect(url).toContain('placeholder');
    });
  });
});