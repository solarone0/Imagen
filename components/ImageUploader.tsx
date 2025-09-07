
import React, { useCallback, useRef, useEffect, useState } from 'react';
import type { ImageData } from '../types';

interface ImageUploaderProps {
  onImageReady: (imageData: ImageData) => void;
  originalImage: ImageData | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageReady, originalImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const [header, base64] = dataUrl.split(',');
      const mimeType = header.split(':')[1].split(';')[0];
      onImageReady({ base64, mimeType, dataUrl });
    };
    reader.readAsDataURL(file);
  }, [onImageReady]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      processFile(event.target.files[0]);
    }
  };

  const handlePaste = useCallback((event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          processFile(blob);
        }
        break; 
      }
    }
  }, [processFile]);
  
  const handleDrop = useCallback((event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
          processFile(event.dataTransfer.files[0]);
      }
  }, [processFile]);

  const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
  };

  const handleDragEnter = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
  };


  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    const dropZone = document.getElementById('dropzone');
    if(dropZone){
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDrop);
    }

    return () => {
      window.removeEventListener('paste', handlePaste);
      if(dropZone){
        dropZone.removeEventListener('dragenter', handleDragEnter);
        dropZone.removeEventListener('dragleave', handleDragLeave);
        dropZone.removeEventListener('dragover', handleDragOver);
        dropZone.removeEventListener('drop', handleDrop);
      }
    };
  }, [handlePaste, handleDrop]);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4 text-center">Upload Your Image</h2>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div
        id="dropzone"
        className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${
          isDragging ? 'border-indigo-400 bg-gray-700' : 'border-gray-600 hover:border-indigo-500'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        {originalImage ? (
          <img src={originalImage.dataUrl} alt="Uploaded preview" className="max-h-full max-w-full object-contain rounded-md" />
        ) : (
          <div className="text-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            <p className="mt-2 font-semibold">Click to upload or drag & drop</p>
            <p className="text-sm">You can also paste from clipboard (Ctrl+V)</p>
          </div>
        )}
      </div>
    </div>
  );
};
