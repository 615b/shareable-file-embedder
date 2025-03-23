
// A simple in-memory file storage system
// In a real application, you would use a database or cloud storage like S3

type StoredFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string; // base64 encoded file data
  createdAt: Date;
  author?: string; // Optional author name
  authorIcon?: string; // Optional author icon URL
};

class FileStorage {
  private files: Map<string, StoredFile> = new Map();
  
  // Generate a random ID for the file
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Store a file and return its ID
  async storeFile(file: File, metadata: { author?: string; authorIcon?: string } = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (!event.target || typeof event.target.result !== 'string') {
          reject(new Error('Failed to read file'));
          return;
        }
        
        const id = this.generateId();
        this.files.set(id, {
          id,
          name: file.name,
          type: file.type,
          size: file.size,
          data: event.target.result,
          createdAt: new Date(),
          author: metadata.author,
          authorIcon: metadata.authorIcon,
        });
        
        resolve(id);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  // Get a file by ID
  getFile(id: string): StoredFile | undefined {
    return this.files.get(id);
  }

  // Check if a file exists
  fileExists(id: string): boolean {
    return this.files.has(id);
  }

  // Get all files
  getAllFiles(): StoredFile[] {
    return Array.from(this.files.values());
  }
}

// Export a singleton instance
export const fileStorage = new FileStorage();
