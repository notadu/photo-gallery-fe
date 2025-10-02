import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { UploadModal } from './components/UploadModal';
import { LoginModal } from './components/LoginModal';
import { ToastManager } from './components/Toast';
import type { PortfolioItemData } from './components/PortfolioItem';

// Sample portfolio data
const sampleItems: PortfolioItemData[] = [
  {
    id: '1',
    title: 'Mountain Sunrise',
    description: 'Captured this breathtaking sunrise during a hiking trip in the Swiss Alps. The golden light breaking through the morning mist created a magical atmosphere that I\'ll never forget.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    category: 'travel',
    location: 'Swiss Alps, Switzerland',
    date: '2024-08-15'
  },
  {
    id: '2',
    title: 'Handwoven Ceramic Bowl',
    description: 'This ceramic bowl was crafted using traditional pottery techniques. The organic shape and earthy glaze reflect my connection to natural materials and sustainable craftsmanship.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    category: 'handmade',
    date: '2024-09-02'
  },
  {
    id: '3',
    title: 'Venice Canal at Dusk',
    description: 'The romantic canals of Venice during golden hour. The interplay of light reflecting on the water and the historic architecture creates a timeless scene.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
    category: 'travel',
    location: 'Venice, Italy',
    date: '2024-07-20'
  },
  {
    id: '4',
    title: 'Macrame Wall Hanging',
    description: 'A intricate macrame piece created using natural cotton cord. The geometric patterns and flowing tassels add a bohemian touch to any space.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    category: 'handmade',
    date: '2024-09-10'
  },
  {
    id: '5',
    title: 'Lavender Fields',
    description: 'Endless rows of lavender stretching to the horizon in Provence. The purple hues and sweet fragrance made this one of my most memorable photography sessions.',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80',
    category: 'travel',
    location: 'Provence, France',
    date: '2024-06-28'
  },
  {
    id: '6',
    title: 'Wooden Cutting Board Set',
    description: 'Hand-carved cutting boards made from sustainably sourced walnut wood. Each board features a unique grain pattern and is finished with food-safe oil.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    category: 'handmade',
    date: '2024-08-25'
  }
];

export default function App() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemData[]>(sampleItems);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials
    if (email === 'demo@example.com' && password === 'demo123') {
      setIsLoggedIn(true);
      addToast('Successfully logged in!', 'success');
      return true;
    }
    
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    addToast('Successfully logged out!', 'success');
  };

  const handleUpload = (newItem: Omit<PortfolioItemData, 'id'>) => {
    const item: PortfolioItemData = {
      ...newItem,
      id: Date.now().toString()
    };
    
    setPortfolioItems(prev => [item, ...prev]);
    addToast('Item uploaded successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-background overflow-auto">
      <Header
        onUploadClick={() => setIsUploadModalOpen(true)}
        onLoginClick={() => setIsLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <main>
        <Hero />
        <Gallery items={portfolioItems} />
        <About />
      </main>

      <UploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUpload}
      />

      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <ToastManager toasts={toasts} removeToast={removeToast} />
    </div>
  );
}