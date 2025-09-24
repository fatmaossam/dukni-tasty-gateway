import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold hero-text">
            دوقني
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-foreground hover:text-primary transition-colors">
            الرئيسية
          </a>
          <a href="#menu" className="text-foreground hover:text-primary transition-colors">
            القائمة
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            من نحن
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            تواصل معنا
          </a>
        </nav>

        <Button variant="default" className="bg-warm-gradient hover:opacity-90 transition-opacity">
          احجز طاولة
        </Button>
      </div>
    </header>
  );
};

export default Header;