import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-2xl font-bold">Partyoria</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              The ultimate event planning platform connecting customers, vendors, and organizers 
              for unforgettable celebrations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Customers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">For Customers</h3>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-secondary transition-colors">Browse Vendors</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Hire Organizers</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Event Planning Guide</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Budget Calculator</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Reviews & Ratings</a></li>
            </ul>
          </div>

          {/* For Partners */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">For Partners</h3>
            <ul className="space-y-2 text-background/80">
              <li><a href="/login" className="hover:text-secondary transition-colors">Vendor Registration</a></li>
              <li><a href="/login" className="hover:text-secondary transition-colors">Organizer Sign-up</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Partner Resources</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Marketing Tools</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Contact & Support</h3>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-secondary" />
                <a href="mailto:support@partyoria.com" className="hover:text-secondary transition-colors">
                  support@partyoria.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-secondary" />
                <a href="tel:+1-555-PARTY-01" className="hover:text-secondary transition-colors">
                  1-555-PARTY-01
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-secondary mt-1 flex-shrink-0" />
                <span>15 Connaught Place<br />New Delhi, Delhi 110001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-background/60 text-sm">
              © 2024 Partyoria. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm text-background/80">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">About Us</a>
              <a href="#" className="hover:text-secondary transition-colors">Careers</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;