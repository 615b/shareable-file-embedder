
import React from 'react';
import FileUploader from '@/components/FileUploader';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center sm:text-left">FileEmbed</h1>
          <p className="text-gray-500 text-sm text-center sm:text-left">Upload files and share links that embed on Discord</p>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Upload Your File</h2>
          <p className="text-gray-600 text-center mb-8">
            Upload any image, video, or document. Get a shareable link that displays as an embed when shared on Discord.
          </p>
          
          <FileUploader />
          
          <div className="mt-12 bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Upload your file by dragging & dropping or clicking to browse</li>
              <li>Copy the generated link</li>
              <li>Share the link on Discord or other platforms</li>
              <li>When shared on Discord, the link will display as an embed with a preview (for supported file types)</li>
            </ol>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>FileEmbed - Simple file sharing with Discord embeds</p>
          <p className="mt-2">Deploy this app from your own GitHub repository</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
