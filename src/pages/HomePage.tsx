import { Hero } from "../components/Hero";
import { Gallery } from "../components/Gallery";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <section className="py-20" id="gallery-preview">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Featured Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into my creative portfolio. Explore the full collection
              to discover more.
            </p>
          </div>

          <Gallery preview />

          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="btn btn-primary btn-lg inline-flex items-center gap-2"
            >
              View Full Gallery
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
