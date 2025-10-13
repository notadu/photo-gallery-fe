import { useState, useEffect } from "react";
import { AlertCircle, Upload, X } from "lucide-react";
import {
  type PortfolioItemData,
  type PortfolioItemEntry,
} from "../models/PortfolioItemData";
import { useAppState } from "../hooks/useAppState";
import { createPortal } from "react-dom";
import { DataService } from "../services/DataService";
import { useMutation, useQueryClient } from "react-query";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

const dataService = DataService.getInstance();

export function UploadModal({ open, onClose }: UploadModalProps) {
  const queryClient = useQueryClient();
  const createItemMutation = useMutation((data: PortfolioItemData) =>
    dataService.createPortfolioItem(data),
  );

  const { addToast } = useAppState();
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    file: File | undefined;
    fileUrl: string;
  }>({
    title: "",
    description: "",
    category: "" as PortfolioItemEntry["category"] | "",
    file: undefined,
    fileUrl: "",
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !createItemMutation.isLoading) {
        onClose();
        resetForm();
        createItemMutation.reset();
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
  }, [open, onClose, createItemMutation.isLoading]);

  const resetForm = () => {
    URL.revokeObjectURL(formData.fileUrl);
    setFormData({
      title: "",
      description: "",
      category: "",
      file: undefined,
      fileUrl: "",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
        fileUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.file) {
      return;
    }

    createItemMutation.mutate(
      {
        title: formData.title,
        description: formData.description,
        category: formData.category as PortfolioItemEntry["category"],
        file: formData.file,
      },
      {
        onSuccess: () => {
          resetForm();
          queryClient.refetchQueries("gallery");
          addToast("Item uploaded successfully!", "success");
          onClose();
        },
      },
    );
  };

  const handleClose = () => {
    if (!createItemMutation.isLoading) {
      resetForm();
      onClose();
      createItemMutation.reset();
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="dialog-overlay" onClick={handleClose}>
      <div
        className="dialog-content max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          <h2 className="dialog-title">Upload New Item</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {createItemMutation.isError && (
            <div className="alert alert-destructive">
              <AlertCircle className="w-4 h-4" />
              <div>
                {(createItemMutation.error as { message: string }).message}
              </div>
            </div>
          )}
          {/* Image Upload */}
          <div className="space-y-2">
            <label htmlFor="image" className="block">
              Image
            </label>
            {formData.file ? (
              <div className="relative">
                <img
                  src={formData.fileUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="btn btn-destructive btn-sm absolute top-2 right-2"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, file: undefined }))
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
              <option value="nature">Nature</option>
              <option value="city">City</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={
              createItemMutation.isLoading ||
              !formData.title ||
              !formData.category ||
              !formData.file
            }
          >
            {createItemMutation.isLoading ? "Uploading..." : "Upload Item"}
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("overlay")!,
  );
}
