import type {
  PortfolioItemData,
  PortfolioItemEntry,
} from "../models/PortfolioItemData";
import { AuthService } from "./AuthService";

const apiUrl = import.meta.env.VITE_AWS_API_URL;
const photosApiUrl = `${apiUrl}/photos`;
const presignApiUrl = `${apiUrl}/presign`;

export class DataService {
  private static instance: DataService;
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService(AuthService.getInstance());
    }
    return DataService.instance;
  }

  public async createPortfolioItem({
    category,
    description,
    title,
    location,
    file,
  }: PortfolioItemData) {
    const imageUrl = await this.uploadFile(file);
    const response = await fetch(photosApiUrl, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        location,
        category,
      }),
      headers: {
        Authorization: this.authService.jwtToken!,
      },
    });
    const result = await response.json();
    return result;
  }

  public async uploadFile(file: File) {
    const filename = file.name.replaceAll(" ", "_");
    const url = new URL(presignApiUrl);
    url.searchParams.set("filename", filename);
    const res = await fetch(url, {
      headers: {
        Authorization: this.authService.jwtToken!,
      },
    });
    const { url: uploadUrl } = await res.json();

    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    return `${import.meta.env.VITE_AWS_CLOUD_FRONT_PHOTOS_URL}/uploads/${filename}`;
  }

  public async fetchItems(preview?: boolean): Promise<PortfolioItemEntry[]> {
    const url = new URL(photosApiUrl);

    if (preview) {
      url.searchParams.set("limit", "3");
    }

    const response = await fetch(url, { method: "GET" });
    const result = await response.json();
    return result?.items;
  }
}
