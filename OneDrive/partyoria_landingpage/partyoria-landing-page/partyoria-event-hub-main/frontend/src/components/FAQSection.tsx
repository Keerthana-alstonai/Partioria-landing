import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "How does Partyoria work for customers?",
    answer: "Customers can either browse and book vendors directly or hire a professional organizer. Simply create an account, browse our verified vendors, compare prices and reviews, and book securely online. If you prefer full-service planning, our expert organizers will handle everything for you."
  },
  {
    question: "Is it free to use Partyoria as a customer?",
    answer: "Yes! Partyoria is completely free for customers. You can browse vendors, read reviews, and book services without any fees. We only charge vendors and organizers a small commission on successful bookings."
  },
  {
    question: "How do I become a verified vendor?",
    answer: "To become a verified vendor, create a vendor account, complete your profile with business details, upload relevant certifications, and provide references. Our team reviews all applications to ensure quality standards. Once approved, you'll receive a verified badge."
  },
  {
    question: "What types of events can I plan through Partyoria?",
    answer: "We support all types of events including weddings, birthday parties, corporate events, baby showers, quinceañeras, graduations, anniversaries, and more. Our vendors and organizers specialize in various event types and sizes."
  },
  {
    question: "How do payments work?",
    answer: "We use secure payment processing for all transactions. Customers pay through our platform, and we hold the payment in escrow until the service is completed. Vendors and organizers receive payment after successful event completion, ensuring protection for all parties."
  },
  {
    question: "What if I'm not satisfied with a vendor or organizer?",
    answer: "Customer satisfaction is our priority. If you're not satisfied, contact our support team within 48 hours of your event. We have a resolution process that includes refunds, rebooking, or other remedies depending on the situation."
  },
  {
    question: "Can organizers work with their preferred vendors?",
    answer: "Absolutely! Organizers can work with their existing vendor network or choose from our platform's verified vendors. This flexibility allows organizers to provide the best service while potentially earning additional commissions from platform vendors."
  },
  {
    question: "How are vendors and organizers vetted?",
    answer: "All vendors and organizers go through a thorough vetting process including background checks, license verification, insurance confirmation, and reference checks. We also monitor ongoing performance through customer reviews and ratings."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-party-gradient">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about planning events with Partyoria
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="card-party border-none shadow-card hover:shadow-elegant transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:text-primary [&[data-state=open]]:text-primary">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@partyoria.com" 
              className="text-primary hover:text-primary-light font-medium underline"
            >
              support@partyoria.com
            </a>
            <span className="hidden sm:block text-muted-foreground">•</span>
            <a 
              href="tel:+1-555-PARTY-01" 
              className="text-primary hover:text-primary-light font-medium underline"
            >
              1-555-PARTY-01
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;