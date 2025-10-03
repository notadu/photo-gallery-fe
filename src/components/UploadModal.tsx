import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { type PortfolioItemData } from "../models/PortfolioItemData";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: Omit<PortfolioItemData, "id">) => void;
}

export function UploadModal({ open, onClose, onSubmit }: UploadModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as PortfolioItemData["category"] | "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose, isSubmitting]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a file storage service
      // For demo purposes, we'll use a placeholder URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData((prev) => ({
            ...prev,
            image: e.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.imageUrl
    ) {
      return;
    }

    setIsSubmitting(true);

    await onSubmit({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      imageUrl: formData.imageUrl,
    });

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "" as PortfolioItemData["category"] | "",
      imageUrl: "",
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={handleClose}>
      <div
        className="dialog-content max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          <h2 className="dialog-title">Upload New Item</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label htmlFor="image" className="block">
              Image
            </label>
            {formData.imageUrl ? (
              <div className="relative">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="btn btn-destructive btn-sm absolute top-2 right-2"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, image: null }))
                  }
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors block">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Click to upload image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              id="title"
              className="input"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter title..."
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block">
              Description
            </label>
            <textarea
              id="description"
              className="textarea"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe your item..."
              rows={3}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block">Category</label>
            <select
              className="input"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value as "city" | "nature",
                }))
              }
              required
            >
              <option value="">Select category</option>
              <option value="nature">City</option>
              <option value="city">Nature</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={
              isSubmitting ||
              !formData.title ||
              !formData.description ||
              !formData.category ||
              !formData.imageUrl
            }
          >
            {isSubmitting ? "Uploading..." : "Upload Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
