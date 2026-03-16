"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image, X, Upload, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  onImageRemove: () => void;
  imagePreview: string | null;
}

export function ImageUploader({ onImageSelect, onImageRemove, imagePreview }: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === "file-too-large") {
        setError("文件太大，请选择小于5MB的图片");
      } else if (error.code === "file-invalid-type") {
        setError("文件格式不支持，请上传JPG、PNG或GIF格式");
      } else {
        setError("文件上传失败");
      }
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      setError(null);
      const preview = URL.createObjectURL(file);
      onImageSelect(file, preview);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  const handleRemove = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    onImageRemove();
    setError(null);
  };

  return (
    <div className="space-y-4">
      {!imagePreview ? (
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-xl p-8
            transition-all duration-200 cursor-pointer
            ${isDragActive 
              ? "border-blue-500 bg-blue-50/50 scale-[1.02]" 
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50/50"
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center text-center space-y-4">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${isDragActive ? "bg-blue-100" : "bg-gray-100"}
              transition-colors duration-200
            `}>
              {isDragActive ? (
                <Upload className="w-8 h-8 text-blue-500" />
              ) : (
                <Image className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                {isDragActive ? "松开鼠标上传" : "点击或拖拽图片到这里"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                支持 JPG、PNG、GIF、WEBP (最大5MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden group">
          <img
            src={imagePreview}
            alt="预览"
            className="w-full h-auto max-h-[400px] object-contain bg-gray-100 rounded-xl"
          />
          <button
            onClick={handleRemove}
            className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}