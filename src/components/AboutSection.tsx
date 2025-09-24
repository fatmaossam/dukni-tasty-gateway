const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 hero-text">
            من نحن
          </h2>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-6 text-right">
            <p>
              مطعم دوقني هو وجهتك المثالية لتذوق النكهات العربية الأصيلة في أجواء راقية ومريحة. 
              نحن نفتخر بتقديم أشهى الأطباق المحضرة بأجود المكونات الطازجة.
            </p>
            <p>
              فريق الطهاة لدينا يجمع بين الخبرة العريقة والإبداع المعاصر لنقدم لكم تجربة طعام لا تُنسى. 
              كل طبق يحكي قصة من التراث العربي الغني.
            </p>
            <p>
              نسعى دائماً لتقديم خدمة متميزة وضمان راحة ضيوفنا في أجواء دافئة ومضيافة تعكس قيم الكرم العربي الأصيل.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;