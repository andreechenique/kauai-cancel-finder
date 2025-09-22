export interface ExtractedDetails {
  location?: string;
  checkin?: string;
  checkout?: string;
  guests?: number;
  budget?: number;
  propertyType?: string;
  amenities?: string[];
}

export async function extractTripDetailsFromText(text: string): Promise<ExtractedDetails> {
  const details: ExtractedDetails = {};
  const lowerText = text.toLowerCase();
  
  // Extract location - expanded to handle more formats
  const locationKeywords = ['kauai', 'hanalei', 'princeville', 'poipu', 'kapaa', 'lihue', 'waimea', 'kilauea'];
  const foundLocation = locationKeywords.find(loc => lowerText.includes(loc));
  if (foundLocation) {
    details.location = foundLocation.charAt(0).toUpperCase() + foundLocation.slice(1) + ', Kauai';
  }
  
  // Extract guest count - improved patterns
  const guestPatterns = [
    /guests?:\s*(\d+)/i,           // "Guests: 4"
    /(\d+)\s*(people|guests|adults)/i,  // "4 guests"
    /for\s+(\d+)/i,               // "for 4"
    /(\d+)\s*pax/i                // "4 pax"
  ];
  
  for (const pattern of guestPatterns) {
    const match = text.match(pattern);
    if (match) {
      details.guests = parseInt(match[1]);
      break;
    }
  }
  
  // Extract dates - comprehensive date parsing
  const datePatterns = [
    // "Dec 27th, 2025 through Jan 3rd, 2026"
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(\d{1,2})(?:st|nd|rd|th)?,?\s*(\d{4})\s*(?:through|to|until|-)\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(\d{1,2})(?:st|nd|rd|th)?,?\s*(\d{4})/i,
    // "March 15-22" or "March 15 to 22"
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(\d{1,2})(?:st|nd|rd|th)?\s*(?:to|-)\s*(\d{1,2})(?:st|nd|rd|th)?/i,
    // "12/27/2025 - 1/3/2026"
    /(\d{1,2})\/(\d{1,2})\/(\d{4})\s*(?:to|-)\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/,
    // "dates: Dec 27 through Jan 3"
    /dates?:\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(\d{1,2})(?:st|nd|rd|th)?\s*(?:through|to|-)\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*(\d{1,2})(?:st|nd|rd|th)?/i
  ];
  
  const monthMap: { [key: string]: number } = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      try {
        if (pattern === datePatterns[0] || pattern === datePatterns[3]) {
          // Full month names with years
          const startMonth = monthMap[match[1].toLowerCase().slice(0, 3)];
          const startDay = parseInt(match[2]);
          const startYear = parseInt(match[3]) || new Date().getFullYear();
          const endMonth = monthMap[match[4].toLowerCase().slice(0, 3)];
          const endDay = parseInt(match[5]);
          const endYear = parseInt(match[6]) || startYear;
          
          details.checkin = new Date(startYear, startMonth, startDay).toISOString().split('T')[0];
          details.checkout = new Date(endYear, endMonth, endDay).toISOString().split('T')[0];
        } else if (pattern === datePatterns[1]) {
          // Same month range
          const month = monthMap[match[1].toLowerCase().slice(0, 3)];
          const startDay = parseInt(match[2]);
          const endDay = parseInt(match[3]);
          const year = new Date().getFullYear();
          
          details.checkin = new Date(year, month, startDay).toISOString().split('T')[0];
          details.checkout = new Date(year, month, endDay).toISOString().split('T')[0];
        } else if (pattern === datePatterns[2]) {
          // Numeric dates
          const startMonth = parseInt(match[1]) - 1;
          const startDay = parseInt(match[2]);
          const startYear = parseInt(match[3]);
          const endMonth = parseInt(match[4]) - 1;
          const endDay = parseInt(match[5]);
          const endYear = parseInt(match[6]);
          
          details.checkin = new Date(startYear, startMonth, startDay).toISOString().split('T')[0];
          details.checkout = new Date(endYear, endMonth, endDay).toISOString().split('T')[0];
        }
        break;
      } catch (error) {
        console.warn('Date parsing error:', error);
      }
    }
  }
  
  // Extract budget - improved patterns
  const budgetPatterns = [
    /budget:?\s*\$?(\d+)/i,        // "budget $400" or "budget: 400"
    /\$(\d+)(?:\/night|\/day)?/,   // "$400/night"
    /around\s+\$(\d+)/i,           // "around $400"
    /up\s+to\s+\$(\d+)/i          // "up to $400"
  ];
  
  for (const pattern of budgetPatterns) {
    const match = text.match(pattern);
    if (match) {
      details.budget = parseInt(match[1]);
      break;
    }
  }
  
  // Extract property type
  const propertyTypes = ['villa', 'condo', 'house', 'hotel', 'resort', 'apartment', 'bungalow'];
  const foundType = propertyTypes.find(type => lowerText.includes(type));
  if (foundType) {
    details.propertyType = foundType;
  }
  
  // Extract amenities
  const amenities = [];
  const amenityMap = [
    { keywords: ['pool', 'swimming'], value: 'pool' },
    { keywords: ['beach', 'oceanfront', 'beachfront'], value: 'beach_access' },
    { keywords: ['wifi', 'internet'], value: 'wifi' },
    { keywords: ['kitchen', 'kitchenette'], value: 'kitchen' },
    { keywords: ['parking', 'garage'], value: 'parking' },
    { keywords: ['hot tub', 'jacuzzi', 'spa'], value: 'hot_tub' },
    { keywords: ['gym', 'fitness'], value: 'gym' },
    { keywords: ['balcony', 'terrace', 'patio'], value: 'balcony' }
  ];
  
  amenityMap.forEach(({ keywords, value }) => {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      amenities.push(value);
    }
  });
  
  if (amenities.length > 0) {
    details.amenities = amenities;
  }
  
  return details;
}