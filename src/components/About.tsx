import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Welcome! I'm passionate about capturing the beauty of the world through 
                  photography and creating unique handmade pieces that tell stories.
                </p>
                <p>
                  My journey began with a simple camera and a love for exploration. 
                  Over the years, I've traveled to incredible places, documenting landscapes, 
                  cultures, and moments that have shaped my perspective.
                </p>
                <p>
                  When I'm not traveling, you'll find me in my studio, crafting handmade 
                  items with attention to detail and a focus on sustainability. Each piece 
                  is created with care and designed to bring joy to everyday life.
                </p>
                <p>
                  This portfolio is a curated collection of my favorite works - 
                  both captured and created. I hope they inspire you as much as 
                  they've inspired me to create them.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="About me"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="absolute inset-4 bg-primary/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}