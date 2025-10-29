import os
import django
import sys

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'partyoria_backend.settings')
django.setup()

from locations.models import Location

# Indian states and major cities
LOCATIONS_DATA = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Kottayam', 'Alappuzha', 'Palakkad', 'Pathanamthitta', 'Idukki', 'Wayanad', 'Kasaragod', 'Malappuram', 'Ernakulam'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli', 'Vellore'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
    'Rajasthan': ['Jaipur'],
    'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Firozabad', 'Meerut'],
    'Telangana': ['Hyderabad', 'Warangal'],
    'Punjab': ['Amritsar', 'Ludhiana'],
    'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala'],
    'Delhi': ['Delhi'],
    'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala'],
    'Bihar': ['Patna', 'Gaya', 'Muzaffarpur'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad'],
    'Odisha': ['Bhubaneswar', 'Cuttack'],
    'Assam': ['Guwahati'],
    'Madhya Pradesh': ['Bhopal', 'Indore'],
    'Goa': ['Goa'],
    'Chandigarh': ['Chandigarh']
}

def populate_locations():
    print("Populating locations table...")
    
    # Clear existing data
    Location.objects.all().delete()
    
    total_added = 0
    for state, cities in LOCATIONS_DATA.items():
        for city in cities:
            location, created = Location.objects.get_or_create(
                state=state,
                city=city
            )
            if created:
                total_added += 1
                print(f"Added: {city}, {state}")
    
    print(f"\nTotal locations added: {total_added}")
    print(f"Total states: {len(LOCATIONS_DATA)}")
    print(f"Total cities: {sum(len(cities) for cities in LOCATIONS_DATA.values())}")

if __name__ == "__main__":
    populate_locations()