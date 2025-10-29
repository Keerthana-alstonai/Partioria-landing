from django.core.management.base import BaseCommand
from events.models import Venue
from users.models import User

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **options):
        # Create sample venues
        venues_data = [
            {
                'name': 'Grand Ballroom Palace',
                'type': 'Banquet Hall',
                'location': 'Downtown Mumbai',
                'city': 'Mumbai',
                'price': '₹50,000 - ₹80,000',
                'rating': 4.8,
                'reviews': 245,
                'image': 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
                'suitability': ['Weddings', 'Corporate Events', 'Anniversaries'],
                'badges': ['Premium', 'AC', 'Parking']
            },
            {
                'name': 'Sunset Garden Resort',
                'type': 'Garden Venue',
                'location': 'Bandra West',
                'city': 'Mumbai',
                'price': '₹30,000 - ₹60,000',
                'rating': 4.6,
                'reviews': 189,
                'image': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
                'suitability': ['Weddings', 'Birthday Parties', 'Festivals'],
                'badges': ['Garden', 'Catering', 'Decoration']
            },
            {
                'name': 'Royal Heritage Hotel',
                'type': 'Hotel',
                'location': 'Colaba',
                'city': 'Mumbai',
                'price': '₹70,000 - ₹1,20,000',
                'rating': 4.9,
                'reviews': 312,
                'image': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                'suitability': ['Weddings', 'Corporate Events'],
                'badges': ['Luxury', '5-Star', 'Valet']
            },
            {
                'name': 'Beachside Paradise',
                'type': 'Beach Resort',
                'location': 'Juhu Beach',
                'city': 'Mumbai',
                'price': '₹40,000 - ₹75,000',
                'rating': 4.7,
                'reviews': 156,
                'image': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
                'suitability': ['Weddings', 'Birthday Parties'],
                'badges': ['Beach View', 'Outdoor', 'Sunset']
            },
            {
                'name': 'Modern Conference Center',
                'type': 'Conference Hall',
                'location': 'BKC',
                'city': 'Mumbai',
                'price': '₹25,000 - ₹45,000',
                'rating': 4.4,
                'reviews': 98,
                'image': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
                'suitability': ['Corporate Events', 'Conferences'],
                'badges': ['Modern', 'Tech-Ready', 'AC']
            },
            {
                'name': 'Elegant Banquet Hall',
                'type': 'Banquet Hall',
                'location': 'Andheri East',
                'city': 'Mumbai',
                'price': '₹35,000 - ₹55,000',
                'rating': 4.5,
                'reviews': 203,
                'image': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
                'suitability': ['Weddings', 'Anniversaries', 'Birthday Parties'],
                'badges': ['Elegant', 'Catering', 'Parking']
            }
        ]

        # Clear existing venues
        Venue.objects.all().delete()
        
        # Create venues
        for venue_data in venues_data:
            venue = Venue.objects.create(**venue_data)
            self.stdout.write(f'Created venue: {venue.name}')

        # Create sample user if none exists
        if not User.objects.exists():
            user = User.objects.create_user(
                username='admin',
                email='admin@partyoria.com',
                password='admin123',
                first_name='Admin',
                last_name='User'
            )
            self.stdout.write(f'Created user: {user.username}')

        self.stdout.write(self.style.SUCCESS('Successfully populated database with sample data!'))