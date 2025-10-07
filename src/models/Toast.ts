export type ToastSeverity = "success" | "error" | "info";

export type ToastItem = { id: string; message: string; type: ToastSeverity };
