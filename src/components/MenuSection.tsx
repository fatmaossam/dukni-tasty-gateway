import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";

const menuItems = [
  {
    id: 1,
    name: "مشاوي مختلطة",
    description: "تشكيلة من أفضل اللحوم المشوية مع الخضار والرز",
    price: "85 ريال",
    image: dish1,
    category: "الأطباق الرئيسية"
  },
  {
    id: 2,
    name: "كنافة نابلسية",
    description: "كنافة طازجة محضرة بأجود أنواع الجبن والقطر",
    price: "35 ريال", 
    image: dish2,
    category: "الحلويات"
  },
  {
    id: 3,
    name: "مقبلات شرقية",
    description: "تشكيلة متنوعة من المقبلات الشرقية الأصيلة",
    price: "45 ريال",
    image: dish3,
    category: "المقبلات"
  }
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 hero-text">
            قائمة الطعام
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            اكتشف مجموعة متنوعة من الأطباق الشهية المحضرة بعناية فائقة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Card key={item.id} className="food-card border-0 overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  <span className="text-xl font-bold text-primary">
                    {item.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-right">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-right leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;