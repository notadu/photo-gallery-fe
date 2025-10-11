import { Gallery } from "../components/Gallery";

export const GalleryPage = () => {
  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of moments captured through my lens and creations born
            from my hands.
          </p>
        </div>
        <Gallery preview={false} />
      </div>
    </section>
  );
};
