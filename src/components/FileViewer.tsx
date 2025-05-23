
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fileStorage } from '@/lib/fileStorage';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const FileViewer = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [file, setFile] = useState<{ 
    id: string;
    name: string;
    type: string;
    data: string;
    author?: string;
    authorIcon?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileId) {
      setError("No file ID provided");
      return;
    }

    const storedFile = fileStorage.getFile(fileId);
    if (!storedFile) {
      setError("File not found");
      return;
    }

    setFile({
      id: storedFile.id,
      name: storedFile.name,
      type: storedFile.type,
      data: storedFile.data,
      author: storedFile.author,
      authorIcon: storedFile.authorIcon,
    });

    // Update page metadata for Discord embed
    if (storedFile.author) {
      document.title = `${storedFile.name} by ${storedFile.author} - FileEmbed`;
      
      // Update meta tags for embeds
      const metaTags = [
        { property: 'og:title', content: `${storedFile.name} by ${storedFile.author}` },
        { name: 'twitter:title', content: `${storedFile.name} by ${storedFile.author}` },
      ];
      
      metaTags.forEach(({ property, name, content }) => {
        const selector = property 
          ? `meta[property="${property}"]` 
          : `meta[name="${name}"]`;
        const element = document.querySelector(selector);
        
        if (element) {
          element.setAttribute('content', content);
        }
      });
    }
  }, [fileId]);

  const handleDownload = () => {
    if (!file) return;
    
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => window.location.href = '/'}>
          Upload a file instead
        </Button>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="animate-pulse">Loading file...</div>
      </div>
    );
  }

  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';
  const isVideo = file.type.startsWith('video/');
  const isAudio = file.type.startsWith('audio/');

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-8" 
        onClick={() => window.location.href = '/'}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to upload
      </Button>
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold truncate">{file.name}</h1>
          {file.author && (
            <div className="flex items-center mt-1 text-gray-600">
              {file.authorIcon && (
                <img 
                  src={file.authorIcon} 
                  alt={file.author} 
                  className="w-5 h-5 rounded-full mr-2"
                  onError={(e) => {
                    // Handle broken image
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <span>Uploaded by {file.author}</span>
            </div>
          )}
        </div>
        <Button onClick={handleDownload}>Download</Button>
      </div>

      <div className="border rounded-lg p-4 bg-white shadow-sm">
        {isImage && (
          <img 
            src={file.data} 
            alt={file.name} 
            className="max-w-full mx-auto rounded" 
          />
        )}
        
        {isPdf && (
          <iframe 
            src={file.data} 
            title={file.name}
            className="w-full h-[70vh] rounded border"
          />
        )}
        
        {isVideo && (
          <video 
            src={file.data} 
            controls 
            className="w-full rounded"
          >
            Your browser does not support the video tag.
          </video>
        )}
        
        {isAudio && (
          <audio 
            src={file.data} 
            controls 
            className="w-full"
          >
            Your browser does not support the audio tag.
          </audio>
        )}
        
        {!isImage && !isPdf && !isVideo && !isAudio && (
          <div className="text-center py-12">
            <p>This file type cannot be previewed.</p>
            <Button 
              onClick={handleDownload}
              className="mt-4"
            >
              Download to view
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>This file is shared via a direct link. Anyone with this link can view this file.</p>
      </div>
    </div>
  );
};

export default FileViewer;
