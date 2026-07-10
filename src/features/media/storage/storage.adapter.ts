export interface IStorageAdapter {
  /**
   * Uploads a file buffer to the underlying storage provider.
   * @param bucket The name of the storage bucket.
   * @param path The path where the file should be saved (e.g. `avatars/xyz.webp`).
   * @param file The file buffer to upload.
   * @param contentType The MIME type of the file.
   * @returns The public URL of the uploaded file.
   */
  upload(bucket: string, path: string, file: Buffer, contentType: string): Promise<string>;

  /**
   * Deletes a file from the underlying storage provider.
   * @param bucket The name of the storage bucket.
   * @param path The path of the file to delete.
   */
  delete(bucket: string, path: string): Promise<void>;

  /**
   * Gets the public URL for a given bucket and path.
   */
  getPublicUrl(bucket: string, path: string): string;

  /**
   * Generates a signed URL for secure, temporary access.
   */
  getSignedUrl(bucket: string, path: string, expiresInSeconds: number): Promise<string>;
}
