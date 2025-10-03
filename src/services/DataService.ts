import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { PortfolioItemData } from "../models/PortfolioItemData";
import type { AuthService } from "./AuthService";

const apiUrl = import.meta.env.VITE_API_URL + "items";

export class DataService {
  private authService: AuthService;
  private s3Client: S3Client | undefined;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async createPortfolioItem({
    category,
    description,
    title,
    location,
    file,
  }: Pick<
    PortfolioItemData,
    "category" | "description" | "title" | "location"
  > & { file: File }) {
    try {
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
      console.log("Created: " + result);
      return {
        success: Boolean(result.id),
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        errorMessage: JSON.stringify(error),
      };
    }
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
      Bucket: import.meta.env.VITE_ITEMS_BUCKET_NAME,
      Key: file.name.replaceAll(" ", "_"),
      ACL: "public-read",
      Body: file,
      ContentType: file.type,
    });
    try {
      const response = await this.s3Client.send(command);
      console.log("Uploaded:", response);
      return `https://${command.input.Bucket}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${command.input.Key}`;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }

  public async fetchItems(): Promise<PortfolioItemData[]> {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: this.authService.jwtToken!,
        },
      });

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
