import { ImageWithFallback } from "../components/ImageWithFallback";

export const About = () => (
  <section id="about" className="py-20 bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">About</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the story behind the portfolio and the passion that drives
            each creation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3>My Creative Journey</h3>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to my world of creativity and exploration. I'm passionate
              about capturing the beauty of our world through photography and
              creating meaningful objects through traditional craftsmanship.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              My travels have taken me to breathtaking landscapes and vibrant
              cultures, each experience enriching my perspective and inspiring
              my work. Whether I'm scaling mountain peaks to capture the perfect
              sunrise or working with clay in my studio, I believe in the power
              of mindful creation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Every handmade piece reflects my commitment to sustainable
              practices and traditional techniques passed down through
              generations. From pottery to textiles, each creation tells a story
              of patience, skill, and respect for natural materials.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">
                  Countries Visited
                </div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">
                  Items Created
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <ImageWithFallback
                src="/images/avatar.webp"
                alt="About me"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
