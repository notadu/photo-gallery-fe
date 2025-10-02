import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<boolean>;
}

export function LoginModal({ open, onClose, onLogin }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        setError('');
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
  }, [open, onClose, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await onLogin(formData.email, formData.password);
      if (success) {
        setFormData({ email: '', password: '' });
        onClose();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setError('');
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={handleClose}>
      <div className="dialog-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="alert alert-destructive">
              <AlertCircle className="w-4 h-4" />
              <div>{error}</div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your password..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p className="mb-1">Demo credentials:</p>
            <p>Email: demo@example.com</p>
            <p>Password: demo123</p>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full" 
            disabled={isSubmitting || !formData.email || !formData.password}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}