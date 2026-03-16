"use client";

import React from "react";
import { Sparkles, Github } from "lucide-react";

export function Header() {
  return (
    <header className="relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      {/* 导航栏 */}
      <nav className="relative flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-60" />
            <div className="relative bg-white rounded-lg p-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AltText AI
          </span>
        </div>
        
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-200 shadow-sm"
        >
          <Github className="w-5 h-5" />
          <span className="text-sm font-medium">GitHub</span>
        </a>
      </nav>

      {/* 标题区域 */}
      <div className="relative text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI 图片 Alt 文本生成器
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          上传图片，让AI帮你生成准确、友好的图片描述文本
          <br />
          提升网站可访问性，优化SEO
        </p>
      </div>
    </header>
  );
}