import { useEffect } from 'react';
import { type PortfolioItemData } from './PortfolioItem';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Calendar, X } from 'lucide-react';

interface PortfolioModalProps {
  item: PortfolioItemData | null;
  open: boolean;
  onClose: () => void;
}

export function PortfolioModal({ item, open, onClose }: PortfolioModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [open, onClose]);

  if (!item || !open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content max-w-4xl max-h-[90vh] overflow-hidden p-0" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2 gap-0 h-full">
          {/* Image Section */}
          <div className="relative">
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="w-full h-full min-h-[300px] md:min-h-[500px] object-cover"
            />
            <div className="absolute top-4 left-4">
              <span 
                className={`badge ${item.category === 'travel' ? 'badge-default' : 'badge-secondary'} capitalize`}
              >
                {item.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col justify-center">
            <div className="dialog-header mb-6">
              <h2 className="dialog-title text-left">{item.title}</h2>
            </div>

            <div className="space-y-6">
              <p className="leading-relaxed">
                {item.description}
              </p>

              <div className="space-y-3">
                {item.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}