import { useState, useEffect, type FormEvent } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";
import type {
  PortfolioItemEntry,
  PortfolioItemData,
} from "../models/PortfolioItemData";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: Partial<PortfolioItemData>) => void;
  item: PortfolioItemEntry | null;
}

export function EditModal({ open, onClose, onSubmit, item }: EditModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "city" as PortfolioItemData["category"],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
      });
    }
  }, [item]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !item) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const updatedItem: Partial<PortfolioItemData> = {
      ...item,
      ...formData,
    };

    onSubmit(updatedItem);
    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!open || !item) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-background rounded-xl shadow-xl border border-border max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="mb-1">Edit Item</h2>
            <p className="text-sm text-muted-foreground">
              Update the details of your portfolio item.
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="edit-title" className="block mb-2">
                Title <span className="text-destructive">*</span>
              </label>
              <input
                id="edit-title"
                type="text"
                className={`input w-full ${errors.title ? "border-destructive" : ""}`}
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Mountain Sunrise"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="edit-description" className="block mb-2">
                Description <span className="text-destructive">*</span>
              </label>
              <textarea
                id="edit-description"
                className={`input w-full min-h-24 resize-y ${errors.description ? "border-destructive" : ""}`}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe your item..."
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className="text-sm text-destructive mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            {/* Category */}
            <div>
              <label htmlFor="edit-category" className="block mb-2">
                Category <span className="text-destructive">*</span>
              </label>
              <select
                id="edit-category"
                className="select-trigger w-full"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                disabled={isSubmitting}
              >
                <option value="city">City</option>
                <option value="Nature">Nature</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t">
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
            onClick={handleSubmit}
            className="btn btn-primary flex-1 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("overlay")!,
  );
}
