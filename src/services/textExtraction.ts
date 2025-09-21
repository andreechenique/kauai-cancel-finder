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
  // Simple keyword-based extraction for demo
  const details: ExtractedDetails = {};
  
  // Extract location
  const locationKeywords = ['kauai', 'hanalei', 'princeville', 'poipu', 'kapaa', 'lihue'];
  const foundLocation = locationKeywords.find(loc => 
    text.toLowerCase().includes(loc)
  );
  if (foundLocation) {
    details.location = foundLocation.charAt(0).toUpperCase() + foundLocation.slice(1) + ', Kauai';
  }
  
  // Extract guest count
  const guestMatch = text.match(/(\d+)\s*(people|guests|adults)/i);
  if (guestMatch) {
    details.guests = parseInt(guestMatch[1]);
  }
  
  // Extract budget
  const budgetMatch = text.match(/\$(\d+)/);
  if (budgetMatch) {
    details.budget = parseInt(budgetMatch[1]);
  }
  
  // Extract property type
  if (text.toLowerCase().includes('villa')) details.propertyType = 'villa';
  if (text.toLowerCase().includes('condo')) details.propertyType = 'condo';
  if (text.toLowerCase().includes('house')) details.propertyType = 'house';
  if (text.toLowerCase().includes('hotel')) details.propertyType = 'hotel';
  
  // Extract amenities
  const amenities = [];
  if (text.toLowerCase().includes('pool')) amenities.push('pool');
  if (text.toLowerCase().includes('beach')) amenities.push('beach_access');
  if (text.toLowerCase().includes('wifi')) amenities.push('wifi');
  if (text.toLowerCase().includes('kitchen')) amenities.push('kitchen');
  if (text.toLowerCase().includes('parking')) amenities.push('parking');
  
  if (amenities.length > 0) {
    details.amenities = amenities;
  }
  
  return details;
}