import { useState, type FormEvent } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { useAppState } from "../hooks/useAppState";
import { createPortal } from "react-dom";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { addToast } = useAppState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log the contact form data (in a real app, this would send to a backend)
      console.log("Contact form submitted:", formData);

      addToast(
        "Message sent successfully! I'll get back to you soon.",
        "success",
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-background rounded-xl shadow-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="mb-1">Get In Touch</h2>
            <p className="text-sm text-muted-foreground">
              Send me a message and I'll get back to you as soon as possible.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="contact-name" className="block mb-2">
              Name <span className="text-destructive">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              className={`input w-full ${errors.name ? "border-destructive" : ""}`}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="contact-email" className="block mb-2">
              Email <span className="text-destructive">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              className={`input w-full ${errors.email ? "border-destructive" : ""}`}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="contact-subject" className="block mb-2">
              Subject <span className="text-destructive">*</span>
            </label>
            <input
              id="contact-subject"
              type="text"
              className={`input w-full ${errors.subject ? "border-destructive" : ""}`}
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="What is this regarding?"
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="text-sm text-destructive mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="contact-message" className="block mb-2">
              Message <span className="text-destructive">*</span>
            </label>
            <textarea
              id="contact-message"
              className={`input w-full min-h-32 resize-y ${errors.message ? "border-destructive" : ""}`}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Tell me about your project or inquiry..."
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("overlay")!,
  );
}
