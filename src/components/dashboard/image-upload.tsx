"use client";

import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, Edit3, ImageIcon, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  value?: string | File;
  onChange: (file: File | null) => void;
  error?: string;
  className?: string;
  placeholder?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  error,
  className = '',
  placeholder = 'Upload a square image for the insight'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const validateFile = useCallback((file: File): string | null => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPG, PNG, or WebP)';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  }, []);

  const processFile = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate upload delay
    setTimeout(() => {
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        onChange(file);
      }, 300);
    }, 1000);
  }, [validateFile, onChange]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (dragCounter.current === 1) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleRemove = useCallback(() => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onChange]);

  const handleEditClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const hasImage = preview || (typeof value === 'string' && value);
  const imageUrl = preview || (typeof value === 'string' ? value : '');

  return (
    <div className={`relative ${className}`}>
      {/* Upload Area */}
      {!hasImage && !isUploading && (
        <div
          className={`
            relative aspect-square w-full max-w-sm mx-auto
            border-2 border-dashed rounded-lg
            transition-all duration-200 ease-in-out
            cursor-pointer hover:bg-accent/50
            ${isDragging 
              ? 'border-primary bg-accent/30 scale-[1.02]' 
              : error 
                ? 'border-destructive/50' 
                : 'border-border hover:border-primary/50'
            }
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload image area"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className={`
              mb-4 p-3 rounded-full transition-all duration-200
              ${isDragging 
                ? 'bg-primary text-primary-foreground scale-110' 
                : 'bg-muted text-muted-foreground'
              }
            `}>
              <Upload className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                {isDragging ? 'Drop your image here' : 'Upload Image'}
              </p>
              <p className="text-xs text-muted-foreground max-w-xs">
                {placeholder}
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, or WebP • Max 5MB • 1:1 aspect ratio
              </p>
            </div>

            <div className="mt-4 px-4 py-2 bg-secondary rounded-md text-xs text-secondary-foreground">
              Click to browse or drag and drop
            </div>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="relative aspect-square w-full max-w-sm mx-auto border-2 border-border rounded-lg bg-muted/20 overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="mb-4 p-3 rounded-full bg-muted animate-pulse">
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            </div>
            
            <div className="w-full space-y-2">
              <p className="text-sm font-medium text-center">Uploading...</p>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {uploadProgress}% complete
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {hasImage && !isUploading && (
        <div className="group relative aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden border border-border">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay with controls */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex space-x-2">
              <button
                onClick={handleEditClick}
                className="p-2 bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                aria-label="Edit image"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={handleRemove}
                className="p-2 bg-destructive hover:bg-destructive/80 rounded-full transition-colors"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="File input"
      />

      {/* Error message */}
      {error && (
        <div className="mt-3 flex items-center space-x-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Success message */}
      {hasImage && !isUploading && !error && (
        <div className="mt-3 text-center">
          <p className="text-sm text-muted-foreground">
            Image uploaded successfully
          </p>
        </div>
      )}
    </div>
  );
};