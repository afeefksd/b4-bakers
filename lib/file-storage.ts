import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Save a file to the filesystem
 * @param file - The file to save
 * @returns The public URL path to the saved file
 */
export async function saveFile(file: File): Promise<string> {
  await ensureUploadDir();

  // Generate unique filename
  const ext = file.name.split('.').pop();
  const filename = `${uuidv4()}.${ext}`;
  const filepath = join(UPLOAD_DIR, filename);

  // Convert file to buffer and save
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  await writeFile(filepath, buffer);

  // Return public URL path
  return `/uploads/${filename}`;
}

/**
 * Save file from buffer
 * @param buffer - File buffer
 * @param originalName - Original filename for extension
 * @returns The public URL path to the saved file
 */
export async function saveFileFromBuffer(
  buffer: Buffer,
  originalName: string
): Promise<string> {
  await ensureUploadDir();

  // Generate unique filename
  const ext = originalName.split('.').pop();
  const filename = `${uuidv4()}.${ext}`;
  const filepath = join(UPLOAD_DIR, filename);

  await writeFile(filepath, buffer);

  // Return public URL path
  return `/uploads/${filename}`;
}

