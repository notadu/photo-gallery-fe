import { ImageWithFallback } from "./ImageWithFallback";

export function Hero() {
  const scrollToGallery = () => {
    const element = document.getElementById("gallery");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
              alt="Portfolio hero image"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
            />
          </div>

          <h1 className="mb-6 max-w-2xl mx-auto">
            Welcome to My Creative Journey
          </h1>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            A collection of travel moments, each with its own story.
          </p>

          <button
            onClick={scrollToGallery}
            className="btn btn-primary btn-lg rounded-full px-8"
          >
            Explore Gallery
          </button>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted/20" />
    </section>
  );
}
