import { useState } from "react";
import { ContactModal } from "../components/ContactModal";
import { About } from "../components/About";

export const AboutPage = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div>
      <About />
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="mb-4">Get In Touch</h3>
              <p className="text-muted-foreground mb-6">
                Interested in collaborating or learning more about my work? I'd
                love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Contact Me
                </button>
                {/* <button className="btn btn-outline">
                  View Resume
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactModal
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};
