import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type {
  PortfolioItemData,
  PortfolioItemEntry,
} from "../models/PortfolioItemData";
import { AuthService } from "./AuthService";

const apiUrl = import.meta.env.VITE_AWS_API_URL + "items";

export class DataService {
  private static instance: DataService;
  private authService: AuthService;
  private s3Client: S3Client | undefined;

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
    const response = await fetch(apiUrl, {
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
    const credentials = await this.authService?.getTemporaryCredentials();
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        credentials,
        region: import.meta.env.VITE_AWS_REGION,
        // TODO: Remove workaround when https://github.com/aws/aws-sdk-js-v3/issues/6834 is fixed.
        requestChecksumCalculation: "WHEN_REQUIRED",
      });
    }

    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_AWS_ITEMS_BUCKET_NAME,
      Key: file.name.replaceAll(" ", "_"),
      ACL: "public-read",
      Body: file,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable",
    });
    const response = await this.s3Client.send(command);
    console.log("Uploaded:", response);
    return `https://${command.input.Bucket}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${command.input.Key}`;
  }

  public async fetchItems(preview?: boolean): Promise<PortfolioItemEntry[]> {
    const url = new URL(apiUrl);

    if (preview) {
      url.searchParams.set("limit", "3");
    }

    const response = await fetch(url, { method: "GET" });
    const result = await response.json();
    return result?.items;
  }
}
