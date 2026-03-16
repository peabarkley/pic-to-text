"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface AltTextResultProps {
  altText: string | null;
  isLoading: boolean;
  error: string | null;
  imagePreview: string | null;
}

export function AltTextResult({ altText, isLoading, error, imagePreview }: AltTextResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (altText) {
      await navigator.clipboard.writeText(altText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
        </div>
        <p className="text-gray-600 font-medium">AI 正在分析图片...</p>
        <p className="text-sm text-gray-400">这可能需要几秒钟</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-red-600 font-medium">生成失败</p>
        <p className="text-sm text-gray-500 text-center">{error}</p>
      </div>
    );
  }

  if (!imagePreview) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <Image className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium">等待图片上传...</p>
        <p className="text-sm text-gray-400 max-w-xs">
          上传图片后，AI将自动为你生成描述性文本
        </p>
      </div>
    );
  }

  if (!altText) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
        <p className="text-gray-600 font-medium">点击生成按钮开始</p>
        <p className="text-sm text-gray-400 max-w-xs">
          点击"生成 Alt 文本"按钮，AI将为你生成图片描述
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-sm font-medium text-blue-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            AI 生成的描述
          </h3>
          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${copied 
                ? "bg-green-100 text-green-600" 
                : "bg-white/80 hover:bg-white text-gray-600 hover:text-blue-600"
              }
            `}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                已复制
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                复制
              </>
            )}
          </button>
        </div>
        <p className="text-gray-800 leading-relaxed">{altText}</p>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
          <RefreshCw className="w-3 h-3" />
          使用提示
        </p>
        <p className="text-sm text-gray-600">
          这段AI生成的Alt文本可以作为基础，你可以根据具体页面上下文适当调整，使其更符合内容需求。
        </p>
      </div>
    </div>
  );
}

function Image(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} />;
}