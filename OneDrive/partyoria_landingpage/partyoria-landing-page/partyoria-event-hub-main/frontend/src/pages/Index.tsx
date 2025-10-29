import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FeaturedSection from '@/components/FeaturedSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <div>
        <Header />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <FeaturedSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;