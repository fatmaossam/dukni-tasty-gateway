import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 hero-text">
            تواصل معنا
          </h2>
          <p className="text-xl text-muted-foreground">
            نحن في انتظاركم لتجربة طعام مميزة
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center border-0 bg-card/50">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-right">الموقع</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-right">
                شارع الأمير محمد بن عبد العزيز<br />
                الرياض، المملكة العربية السعودية
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 bg-card/50">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-right">الهاتف</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-right">
                +966 11 123 4567<br />
                +966 50 123 4567
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 bg-card/50">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-right">ساعات العمل</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-right">
                السبت - الخميس: 12:00 - 23:30<br />
                الجمعة: 14:00 - 23:30
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-warm-gradient hover:opacity-90 transition-opacity text-lg px-8 py-6">
            احجز طاولتك الآن
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;