
import React, { useState, useRef } from 'react';
import { fileStorage } from '@/lib/fileStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { Check, Copy, Upload, AlertCircle, User, Link } from 'lucide-react';

const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [author, setAuthor] = useState('');
  const [authorIcon, setAuthorIcon] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const getShareableLink = (fileId: string) => {
    return `${window.location.origin}/view/${fileId}`;
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      
      // Include author metadata if provided
      const metadata = {
        author: author.trim() || undefined,
        authorIcon: authorIcon.trim() || undefined
      };
      
      const fileId = await fileStorage.storeFile(file, metadata);
      setUploadedFileId(fileId);
      toast({
        title: "File uploaded successfully",
        description: "Your file is now available to share!"
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (!uploadedFileId) return;
    
    const link = getShareableLink(uploadedFileId);
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard."
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please try copying the link manually.",
          variant: "destructive"
        });
      });
  };

  const toggleMetadata = () => {
    setShowMetadata(!showMetadata);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!uploadedFileId && (
        <>
          <div className="mb-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={toggleMetadata} 
              className="w-full"
            >
              <User className="mr-2 h-4 w-4" />
              {showMetadata ? 'Hide Author Settings' : 'Customize Discord Embed Author'}
            </Button>
          </div>

          {showMetadata && (
            <div className="mb-6 space-y-4 p-4 border rounded-lg bg-gray-50">
              <div className="space-y-2">
                <Label htmlFor="author">Author Name (Optional)</Label>
                <Input
                  id="author"
                  placeholder="Your name or username"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="authorIcon">Author Icon URL (Optional)</Label>
                <Input
                  id="authorIcon"
                  placeholder="https://example.com/your-avatar.png"
                  value={authorIcon}
                  onChange={(e) => setAuthorIcon(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Provide a direct link to a square image for the author icon
                </p>
              </div>
            </div>
          )}

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300 hover:border-primary/50'
            } transition-colors cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">
              {isUploading ? 'Uploading...' : 'Drag & drop a file here'}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse your files
            </p>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {uploadedFileId && (
        <div className="mt-6">
          <Alert>
            <Check className="h-4 w-4" />
            <AlertTitle>Upload Complete!</AlertTitle>
            <AlertDescription>
              Your file is ready to share. The link below will create an embed when shared on Discord.
            </AlertDescription>
          </Alert>
          
          <div className="flex mt-4">
            <Input 
              value={getShareableLink(uploadedFileId)}
              readOnly
              className="rounded-r-none"
            />
            <Button
              variant="secondary"
              className="rounded-l-none flex items-center gap-2"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Discord Preview</h4>
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex items-start gap-3 text-sm">
                <div className="w-1 self-stretch bg-blue-500 rounded-full"></div>
                <div className="w-full">
                  {author && (
                    <div className="flex items-center gap-2 mb-2">
                      {authorIcon && (
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200">
                          <img 
                            src={authorIcon} 
                            alt={author} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Handle broken image
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <span className="font-medium text-xs text-gray-600">{author}</span>
                    </div>
                  )}
                  <div className="font-medium">File Embed</div>
                  <p className="text-gray-500 mt-1 text-xs">
                    This is how your link will appear when shared on Discord
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-6"
            onClick={() => {
              setUploadedFileId(null);
              setIsUploading(false);
            }}
          >
            Upload Another File
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
