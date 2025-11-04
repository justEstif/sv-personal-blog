import { Client } from "minio";

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT || "9000"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ROOT_USER || "minioadmin",
  secretKey: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
});

// Initialize buckets on startup
const buckets = [
  process.env.MINIO_POSTS_BUCKET || "blog-posts",
  process.env.MINIO_ASSETS_BUCKET || "blog-assets",
];

/**
 * Initialize MinIO buckets if they don't exist
 */
export async function initializeBuckets() {
  try {
    for (const bucket of buckets) {
      const exists = await minioClient.bucketExists(bucket);
      if (!exists) {
        await minioClient.makeBucket(bucket, "us-east-1");
        console.log(`Created bucket: ${bucket}`);
      }
    }
  } catch (error) {
    console.error("Error initializing MinIO buckets:", error);
    throw error;
  }
}

/**
 * Upload a file to MinIO
 */
export async function uploadAsset(
  bucket: string,
  objectName: string,
  filePath: string | Buffer | NodeJS.ReadableStream,
  metaData?: Record<string, string>
): Promise<string> {
  try {
    await minioClient.fPutObject(
      bucket,
      objectName,
      typeof filePath === "string" ? filePath : filePath,
      metaData
    );
    return objectName;
  } catch (error) {
    console.error(`Error uploading file to MinIO:`, error);
    throw error;
  }
}

/**
 * Delete a file from MinIO
 */
export async function deleteAsset(bucket: string, objectName: string): Promise<void> {
  try {
    await minioClient.removeObject(bucket, objectName);
  } catch (error) {
    console.error(`Error deleting file from MinIO:`, error);
    throw error;
  }
}

/**
 * Get presigned URL for accessing a file
 */
export async function getPresignedUrl(
  bucket: string,
  objectName: string,
  expirySeconds: number = 24 * 60 * 60 // 24 hours default
): Promise<string> {
  try {
    const url = await minioClient.presignedGetObject(
      bucket,
      objectName,
      expirySeconds
    );
    return url;
  } catch (error) {
    console.error(`Error generating presigned URL:`, error);
    throw error;
  }
}

/**
 * Get public URL for a file (for objects with public read policy)
 */
export function getPublicUrl(bucket: string, objectName: string): string {
  const protocol = process.env.MINIO_USE_SSL === "true" ? "https" : "http";
  const endpoint = process.env.MINIO_ENDPOINT || "localhost";
  const port = process.env.MINIO_PORT || "9000";
  const portSuffix = port === "80" || port === "443" ? "" : `:${port}`;

  return `${protocol}://${endpoint}${portSuffix}/${bucket}/${objectName}`;
}

/**
 * List files in a bucket
 */
export async function listAssets(
  bucket: string,
  prefix?: string
): Promise<Array<{ name: string; size: number; etag: string }>> {
  const files: Array<{ name: string; size: number; etag: string }> = [];

  return new Promise((resolve, reject) => {
    const objectsList = minioClient.listObjects(bucket, prefix, true);

    objectsList.on("data", (obj) => {
      files.push({
        name: obj.name,
        size: obj.size,
        etag: obj.etag,
      });
    });

    objectsList.on("error", (error) => {
      console.error(`Error listing assets:`, error);
      reject(error);
    });

    objectsList.on("end", () => {
      resolve(files);
    });
  });
}

/**
 * Get MinIO client instance (advanced usage)
 */
export function getMinioClient(): Client {
  return minioClient;
}

export default minioClient;
