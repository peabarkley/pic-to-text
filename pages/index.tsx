import React, { useState, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ImageUploader } from "../components/ImageUploader";
import { AltTextResult } from "../components/AltTextResult";
import { Header } from "../components/Header";
import { Toaster, toast } from "react-hot-toast";

const Home: NextPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [altText, setAltText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File, preview: string) => {
    setSelectedImage(file);
    setImagePreview(preview);
    setAltText(null);
    setError(null);
  }, []);

  const handleImageRemove = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
    setAltText(null);
    setError(null);
  }, []);

  const generateAltText = async () => {
    if (!selectedImage) {
      toast.error("请先选择一张图片");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const loadingToast = toast.loading("AI 正在分析图片...");

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("生成失败，请重试");
      }

      const data = await response.json();
      setAltText(data.altText);
      toast.success("Alt 文本生成成功！", { id: loadingToast });
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
      toast.error("生成失败，请重试", { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Alt Text Generator</title>
        <meta name="description" content="Upload images and generate descriptive alt text using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#363636",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            },
          }}
        />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Header />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* 左侧：上传区域 */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  上传图片
                </h2>
                
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  onImageRemove={handleImageRemove}
                  imagePreview={imagePreview}
                />
                
                {imagePreview && (
                  <button
                    onClick={generateAltText}
                    disabled={isLoading}
                    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        生成中...
                      </span>
                    ) : (
                      "✨ 生成 Alt 文本"
                    )}
                  </button>
                )}
              </div>
            </div>
            
            {/* 右侧：结果区域 */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 min-h-[400px] flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                  生成结果
                </h2>
                
                <AltTextResult
                  altText={altText}
                  isLoading={isLoading}
                  error={error}
                  imagePreview={imagePreview}
                />
              </div>
            </div>
          </div>
          
          {/* 特性展示 */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🚀"
              title="快速生成"
              description="基于先进的AI模型，秒级生成准确的图片描述"
            />
            <FeatureCard
              icon="🎯"
              title="精准描述"
              description="智能识别图片主体、动作和场景，生成高质量的Alt文本"
            />
            <FeatureCard
              icon="♿"
              title="无障碍友好"
              description="帮助视障用户理解图片内容，提升网站可访问性"
            />
          </div>
        </div>
      </main>
    </>
  );
};

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default Home;