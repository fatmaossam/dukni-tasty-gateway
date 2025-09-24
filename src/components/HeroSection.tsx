import { Button } from "@/components/ui/button";
import heroImage from "@/assets/restaurant-hero.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"
      />
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 hero-text">
          دوقني
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
          تجربة طعام استثنائية في قلب المدينة<br />
          نقدم لك أشهى الأطباق العربية الأصيلة
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-warm-gradient hover:opacity-90 transition-opacity text-lg px-8 py-6"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            استكشف القائمة
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            احجز طاولة
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;