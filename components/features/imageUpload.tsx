'use client';

import { useState, useRef } from 'react';
import { uploadGroupPhoto } from '@/app/firebase/groupUtils';

interface ImageUploadProps {
  groupId: string;
  userId: string;
  onUploadComplete?: (urls: string[]) => void;
  className?: string;
}

export function ImageUpload({ groupId, userId, onUploadComplete, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const uploadedPhoto = await uploadGroupPhoto(groupId, userId, file);

        uploadedUrls.push(uploadedPhoto.storageUrl);
        setProgress(((i + 1) / files.length) * 100);
      }

      if (onUploadComplete) {
        onUploadComplete(uploadedUrls);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload images');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {uploading && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Uploading... {Math.round(progress)}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-violet-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}