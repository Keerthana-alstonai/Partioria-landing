export interface Venue {
  id: string;
  name: string;
  type: string;
  suitability: string[];
  price: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  badges: string[];
}

// Static venue data (fallback)
export const venueData: Record<string, Venue[]> = {};

// All Indian cities with venues (76 cities)
export const INDIAN_CITIES = [
  'Agra', 'Ahmedabad', 'Alappuzha', 'Aligarh', 'Allahabad', 'Ambala', 'Amritsar',
  'Bareilly', 'Bengaluru', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai',
  'Coimbatore', 'Cuttack', 'Delhi', 'Dhanbad', 'Dharamshala', 'Durgapur',
  'Ernakulam', 'Faridabad', 'Firozabad', 'Gaya', 'Goa', 'Gorakhpur',
  'Guntur', 'Gurugram', 'Guwahati', 'Hubli', 'Hyderabad', 'Idukki',
  'Indore', 'Jaipur', 'Jamshedpur', 'Kannur', 'Kanpur', 'Kasaragod',
  'Kochi', 'Kolkata', 'Kollam', 'Kottayam', 'Kozhikode', 'Lucknow',
  'Ludhiana', 'Madurai', 'Malappuram', 'Manali', 'Mangaluru', 'Meerut',
  'Moradabad', 'Mumbai', 'Muzaffarpur', 'Mysuru', 'Nagpur', 'Palakkad',
  'Panipat', 'Pathanamthitta', 'Patna', 'Pune', 'Ranchi', 'Saharanpur',
  'Salem', 'Shimla', 'Siliguri', 'Surat', 'Thiruvananthapuram', 'Thrissur',
  'Tiruchirappalli', 'Tirunelveli', 'Vadodara', 'Varanasi', 'Vellore',
  'Vijayawada', 'Visakhapatnam', 'Warangal', 'Wayanad'
];

// API functions to fetch venues
export const fetchVenuesByCity = async (city: string): Promise<Venue[]> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/venues/city/${city}/`);
    if (!response.ok) throw new Error('Failed to fetch venues');
    const data = await response.json();
    return data.map((venue: any) => ({
      id: venue.id.toString(),
      name: venue.name,
      type: venue.type,
      suitability: venue.suitability || [],
      price: venue.price,
      rating: parseFloat(venue.rating),
      reviews: venue.reviews,
      location: venue.location,
      image: venue.image,
      badges: venue.badges || []
    }));
  } catch (error) {
    console.error('Error fetching venues:', error);
    return [];
  }
};

export const fetchAllVenues = async (): Promise<Record<string, Venue[]>> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/venues/all/');
    if (!response.ok) throw new Error('Failed to fetch all venues');
    const data = await response.json();
    
    const formattedData: Record<string, Venue[]> = {};
    Object.keys(data).forEach(city => {
      formattedData[city] = data[city].map((venue: any) => ({
        id: venue.id.toString(),
        name: venue.name,
        type: venue.type,
        suitability: venue.suitability || [],
        price: venue.price,
        rating: parseFloat(venue.rating),
        reviews: venue.reviews,
        location: venue.location,
        image: venue.image,
        badges: venue.badges || []
      }));
    });
    
    return formattedData;
  } catch (error) {
    console.error('Error fetching all venues:', error);
    return {};
  }
};

// Helper function to get venue by ID
export const getVenueById = async (id: string): Promise<Venue | null> => {
  try {
    const allVenues = await fetchAllVenues();
    for (const city in allVenues) {
      const venue = allVenues[city].find(v => v.id === id);
      if (venue) return venue;
    }
    return null;
  } catch (error) {
    console.error('Error getting venue by ID:', error);
    return null;
  }
};